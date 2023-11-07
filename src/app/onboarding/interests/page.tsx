"use client";
import categoryService from "@/services/category.service";
import { ICategory, IUser } from "@/services/types";
import React, { useEffect, useState } from "react";
import InterestBadge from "./components/InterestBadge";
import FormSubmit from "@/components/form/FormSubmit";
import useOnboarding from "../context";
import useToast from "@/context/toast";
import { useRouter } from "next13-progressbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Interest = () => {
  const queryClient = useQueryClient();
  const { openToast } = useToast();
  const router = useRouter();
  const { setInterests: setOnboardingInterests, completeOnboarding, onboardingData } = useOnboarding();
  const interests = queryClient.getQueryData<ICategory[]>(["category"]);
  const user = queryClient.getQueryData<IUser>(["user"]);

  const updateProfileMutation = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: (data) => {
      openToast({
        text: data.message,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/onboarding/wallet");
    },
    onError: (error: any) => {
      openToast({
        text: error?.response?.data?.message,
        type: "failure",
      });
    },
  });

  useEffect(() => {
    !onboardingData.firstName && router.push("/onboarding/profile");
  }, [onboardingData.firstName]);

  const handleInterestBadgeClick = (name: string) => {
    if (onboardingData.interests.includes(name)) {
      const newInterests = onboardingData.interests.filter((i) => i !== name);
      setOnboardingInterests(newInterests);
    } else {
      const newInterests = [...onboardingData.interests, name];
      setOnboardingInterests(newInterests);
    }
  };

  return (
    <div className=" pb-10 mx-20">
      <h2 className=" text-tib-purple font-bold text-4xl text-center">We would like to know what you like better</h2>
      <div className="mt-28 mb-14">
        <p className=" text-sm">Area of Interest</p>
        <div className="mt-5 flex flex-wrap gap-x-3 gap-y-4 justify-center">
          {interests?.map((i) => (
            <InterestBadge
              handleInterestBadgeClick={handleInterestBadgeClick}
              name={i.name}
              selected={onboardingData.interests.includes(i.name)}
              key={i.id}
            />
          ))}
        </div>
      </div>
      <FormSubmit
        disabled={onboardingData.interests.length < 1}
        loading={updateProfileMutation.isPending}
        onClick={() => updateProfileMutation.mutate(user!.id)}
        text="Continue"
      />
    </div>
  );
};

export default Interest;
