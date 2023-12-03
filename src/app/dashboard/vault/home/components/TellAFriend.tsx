import Image from "next/image";
import React from "react";

const TellAFriend = () => {
  return (
    <div className=" h-[306px] bg-[#BFD3FF] flex items-center justify-center w-full mt-24">
      <div className="flex gap-20">
        <Image src={"/images/amico.png"} height={174} width={184} alt="tell a friend" />
        <div className=" flex flex-col justify-between max-w-md items-start">
          <h6 className=" text-3xl font-medium text-tib-primary">Tell a Friend and be Rewarded</h6>
          <p className=" text-xl text-tib-primary2">Tell a friend about us and instantly get a 10% deduction on your next paymemt with us.</p>
          <button className=" text-sm text-tib-blue  py-2 px-3 rounded bg-tib-white font-medium">Refer Someone</button>
        </div>
      </div>
    </div>
  );
};

export default TellAFriend;
