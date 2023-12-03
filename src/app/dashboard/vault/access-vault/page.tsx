"use client";
import Image from "next/image";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import planService from "@/services/plan.service";
import { useRouter } from "next13-progressbar";
import BackButton from "@/components/extras/BackButton";

const DashboardVaultAccessVault = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["plan"],
    queryFn: planService.getPlans,
  });
  const router = useRouter();
  return (
    <main className="">
      <BackButton goBack />
      <div className="mt-36 flex justify-between">
        <div className=" max-w-[472px]">
          <Image src={"/images/rafiki.svg"} height={200} width={268} alt="access vault" />
          <div className="space-y-7 mt-9">
            <div className="space-y-6">
              <h4 className="text-4xl text-tib-purple font-bold">Oh My! You currently have no access to the VAULT</h4>
              <p className=" text-tib-primary">
                Enjoy all the features Vault has to offer by simply upgrading from Basic to Premium or Advanced Premium. Simply select a package and
                get started.
              </p>
            </div>
            <div className=" space-y-5">
              <p className="text-xl  text-tib-purple font-bold">Things you can do in the Vault</p>
              <ul className=" flex items-center gap-6 text-xl mt-4">
                <li className="">Deposit Idea</li>
                <li className="">Buy Idea</li>
                <li className="">Sell Idea</li>
                <li className="">Chat</li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" flex gap-7">
          {data?.data &&
            data.data
              .filter((p) => p.type !== "FREE")
              .map((plan) => (
                <div key={plan.id} className="w-[324px] rounded bg-tib-white border border-tib-light-border px-7 py-9 flex flex-col gap-16">
                  <div className=" text-center space-y-5 flex-shrink-0">
                    <h6 className="text-2xl text-tib-purple font-bold">{plan.name}</h6>
                    <p className="">{plan.description}</p>
                  </div>
                  <div className=" flex-grow flex flex-col justify-between">
                    <ul className="space-y-4">
                      {plan.planPermissions?.map((planPermission) => (
                        <li key={planPermission.id} className="flex items-center gap-3">
                          <BsFillCheckCircleFill className="text-green-600" />
                          <span className="">{planPermission.name}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.active ? (
                      <button className=" h-16 w-full text-tib-white bg-tib-blue rounded">Select</button>
                    ) : (
                      <button disabled className=" h-16 w-full text-tib-white bg-tib-blue rounded disabled:opacity-50">
                        Not Available
                      </button>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardVaultAccessVault;
