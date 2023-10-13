import Link from "next/link";
import React from "react";

const HomepageProcess = () => {
  return (
    <div
      id="how-it-works"
      style={{ background: `url("/images/ProccessBg.png")`, backgroundSize: "100% 100%" }}
      className="px-20 h-[1312px] pt-80 transform -translate-y-[320px]"
    >
      <div className="">
        <div className=" max-w-[412px] space-y-8">
          <h4 className="text-tib-purple text-4xl pr-20">
            We Have <strong>The Easiest Process</strong>
          </h4>
          <p className=" text-tib-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing egestas cras sed imperdiet cras in nisl volutpat. Diam venenatis
            malesuada semper etiam pellentesque in etiam ultrices a. Vitae mattis.
          </p>
          <Link href="#" className="py-3 px-4 rounded bg-tib-blue text-tib-white font-abrilFatface tracking-wide inline-block">
            Get Started
          </Link>
        </div>
        <div style={{ background: `url("/images/ProccessImage.png")`, backgroundSize: "100% 100%" }} className="h-[562px] w-full relative">
          <div className=" absolute w-[244px] left-[112px] top-[536px]">
            <h4 className="text-tib-purple text-2xl font-black mb-4">Title</h4>
            <p className=" text-tib-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor quam vitae pellentesque vitae tempor sit curabitur in cras. A orci,
              bibendum et dolor. Mauris.
            </p>
          </div>
          <div className=" absolute w-[264px] left-[386px] top-[386px]">
            <h4 className="text-tib-purple text-2xl font-black mb-4">Title</h4>
            <p className=" text-tib-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor quam vitae pellentesque vitae tempor sit curabitur in cras. A orci,
              bibendum et dolor. Mauris.
            </p>
          </div>
          <div className=" absolute w-[244px] left-[746px] top-[276px]">
            <h4 className="text-tib-purple text-2xl font-black mb-4">Title</h4>
            <p className=" text-tib-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor quam vitae pellentesque vitae tempor sit curabitur in cras. A orci,
              bibendum et dolor. Mauris.
            </p>
          </div>
          <div className=" absolute w-[264px] left-[1026px] top-[246px]">
            <h4 className="text-tib-purple text-2xl font-black mb-4">Title</h4>
            <p className=" text-tib-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porttitor quam vitae pellentesque vitae tempor sit curabitur in cras. A orci,
              bibendum et dolor. Mauris.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageProcess;
