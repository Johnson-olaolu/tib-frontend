"use client";
import React from "react";

interface IPageTracker {
  steps: readonly string[];
  activeStep: string;
}

const PageTracker: React.FC<IPageTracker> = (props) => {
  const { steps, activeStep } = props;
  return (
    <div className=" flex gap-40 pb-6">
      {steps.map((step, idx) => (
        <div className={`flex flex-col gap-3 items-center relative`} key={step}>
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center relative z-10 ${
              steps.findIndex((s) => s === activeStep) >= idx ? " bg-tib-blue text-white font-bold " : "bg-[#C2C2C2] text-[#928E8E]"
            }`}
          >
            <span className="">{idx + 1}</span>
          </div>
          <span className=" text-tib-primary2 text-sm opacity-75 absolute -bottom-3 left-1/2 transform translate-y-full -translate-x-1/2 min-w-max ">
            {step}
          </span>
          {idx !== steps.length - 1 && (
            <div
              className={` border-t-2 border-dashed h-0 w-40  top-5 left-10 absolute ${
                steps.findIndex((s) => s === activeStep) > idx ? " border-tib-blue" : "border-[#EAE6E6] "
              } `}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PageTracker;
