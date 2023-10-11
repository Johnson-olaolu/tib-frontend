"use client";
import interestService from "@/services/interest.service";
import { IInterest } from "@/services/types";
import React, { useEffect, useState } from "react";
import InterestBadge from "./components/InterestBadge";
import FormSubmit from "@/components/form/FormSubmit";
import useOnboarding from "../context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/appSlice";
import userService from "@/services/user.service";
import { saveUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import useToast from "@/context/toast";

const Interest = () => {
  const { openToast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const { setInterests: setOnboardingInterests, completeOnboarding, onboardingData } = useOnboarding();
  const [interests, setInterests] = useState<IInterest[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    interestService.getInterests().then((data) => {
      setInterests(data.data!);
    });
  }, []);

  useEffect(() => {
    !onboardingData.firstName && router.push("/onboarding/profile");
  }, []);

  const handleInterestBadgeClick = (name: string) => {
    if (onboardingData.interests.includes(name)) {
      const newInterests = onboardingData.interests.filter((i) => i !== name);
      setOnboardingInterests(newInterests);
    } else {
      const newInterests = [...onboardingData.interests, name];
      setOnboardingInterests(newInterests);
    }
  };

  const onClickContinue = async () => {
    setIsSubmitting(true);
    completeOnboarding(user!.id)
      .then((data) => {
        openToast({
          text: data.message,
          type: "success",
        });
        userService.getUserDetails().then((data2) => {
          if (data2.data) {
            dispatch(
              saveUser({
                user: data2.data,
              })
            );

            router.push("/onboarding/wallet");
          }
        });
      })
      .catch((error) => {
        openToast({
          text: error?.response?.data?.message,
          type: "failure",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <div className=" pb-10 mx-20">
      <h2 className=" text-tib-purple font-bold text-4xl text-center">We would like to know what you like better</h2>
      <div className="mt-28 mb-14">
        <p className=" text-sm">Area of Interest</p>
        <div className="mt-5 flex flex-wrap gap-x-3 gap-y-4 justify-center">
          {interests.map((i) => (
            <InterestBadge
              handleInterestBadgeClick={handleInterestBadgeClick}
              name={i.name}
              selected={onboardingData.interests.includes(i.name)}
              key={i.id}
            />
          ))}
        </div>
      </div>
      <FormSubmit loading={isSubmitting || undefined} onClick={() => onClickContinue()} text="Continue" />
    </div>
  );
};

export default Interest;
