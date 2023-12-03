import React from "react";

const VaultThisWeek = () => {
  return (
    <div className=" bg-white rounded shadow border border-[#F5F5F5]  py-12 px-11">
      <div className="">
        <h3 className=" capitalize text-tib-primary">This week on xela</h3>
      </div>
      <div className="mt-20">
        <div className=" flex justify-center gap-20">
          <div className="flex flex-col items-center gap-1 text-center">
            <p className=" text-tib-purple font-bold text-2xl">330</p>
            <p className=" text-tib-primary2 uppercase text-sm">content needed</p>
          </div>
          <div className="h-[72px] w-px bg-[#F1F1F1]"></div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className=" text-tib-purple font-bold text-2xl">330</p>
            <p className=" text-tib-primary2 uppercase text-sm">content needed</p>
          </div>
        </div>
        <div className="h-px w-full bg-[#F1F1F1] my-7"></div>
        <div className=" flex justify-center gap-20">
          <div className="flex flex-col items-center gap-1 text-center">
            <p className=" text-tib-purple font-bold text-2xl">330</p>
            <p className=" text-tib-primary2 uppercase text-sm">content needed</p>
          </div>
          <div className="h-[72px] w-px bg-[#F1F1F1]"></div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className=" text-tib-purple font-bold text-2xl">330</p>
            <p className=" text-tib-primary2 uppercase text-sm">content needed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultThisWeek;
