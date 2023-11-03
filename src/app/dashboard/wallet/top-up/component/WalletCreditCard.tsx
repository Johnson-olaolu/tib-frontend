import CreditCardChipIcon from "@/app/assets/icons/CreditCardChipIcon";
import MasterCardIcon from "@/app/assets/icons/MasterCardIcon";
import React from "react";
import { Mulish } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const mulish = Mulish({ subsets: ["latin"] });

const WalletCreditCard = () => {
  return (
    <div
      className={` h-[174px] w-[278px] rounded relative px-5 py-3 text-tib-white ${mulish.className}`}
      style={{
        background: `url("/images/WalletCreditCardBg.png")`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <span className=" absolute left-5 top-3 text-[10px] ">Debit</span>
      <div className="absolute right-5 top-3 text-right">
        <span className="text-sm font-bold block">Bank Name</span>
        <span className=" text-[10px] block">Logo</span>
      </div>
      <CreditCardChipIcon className="absolute left-5 top-14" />
      <p className="absolute left-5 top-20 text-lg font-semibold">xxxx xxxx xxxx xxxx</p>
      <div className=" absolute left-5 bottom-10 flex items-center gap-1">
        <span className="block w-[16px] text-[6px] font-semibold uppercase">Valid thru</span>
        <span className=" text-[12px] font-semibold">12/24</span>
      </div>
      <p className="left-5 bottom-3 absolute text-[10px] font-semibold">CIROMA CHINEYE ADEKUNLE</p>
      <MasterCardIcon className=" absolute right-5 bottom-3" />
    </div>
  );
};

export default WalletCreditCard;
