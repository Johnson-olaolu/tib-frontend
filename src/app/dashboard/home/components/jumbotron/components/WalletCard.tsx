import Link from "next/link";
import React from "react";

const WalletCard = () => {
  return (
    <div
      className=" h-60 w-[262px] rounded p-6 flex flex-col justify-between items-stretch bg-tib-white"
      style={{
        boxShadow: "6.58125px 6.58125px 11.51719px 0px rgba(194, 191, 191, 0.20)",
      }}
    >
      <p className=" text-xl font-bold text-tib-purple text-center">My Ideas</p>
      <div className="text-center text-tib-purple space-y-3">
        <p className="text-sm font-abrilFatface">Your Account Balance </p>
        <p className=" font-bold text-3xl">N52,000</p>
      </div>
      <div className="flex justify-between gap-2">
        <Link href={""} className="px-[10px] py-3 w-full text-center rounded border border-tib-blue text-tib-blue bg-white text-sm ">
          Withdraw
        </Link>
        <Link href={""} className="px-[10px] py-3 w-full rounded text-center border border-tib-blue  text-tib-white bg-tib-blue text-sm ">
          Fund
        </Link>
      </div>
    </div>
  );
};

export default WalletCard;
