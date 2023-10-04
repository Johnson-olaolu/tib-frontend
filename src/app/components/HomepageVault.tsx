import Link from "next/link";
import React from "react";

const HomepageVault = () => {
  return (
    <div className=" px-8 transform -translate-y-32 relative z-10">
      <div className=" px-28 bg-tib-light-purple rounded-[50px] py-32 ">
        <div className=" w-[872px] space-y-8 text-center mx-auto">
          <h4 className="text-tib-purple text-4xl ">
            Access <strong>The Vault</strong>
          </h4>
          <p className=" text-tib-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing egestas cras sed imperdiet cras in nisl volutpat. Diam venenatis
            malesuada semper etiam pellentesque in etiam ultrices a. Vitae mattis.
          </p>
          <Link href="#" className="py-3 px-4 rounded bg-tib-blue text-tib-white font-abrilFatface tracking-wide inline-block">
            Subscribe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomepageVault;
