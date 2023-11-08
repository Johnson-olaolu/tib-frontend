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
            Explore the true power of the Idea Bank. The TIB Vault gives you access to premium and enterprise-grade ideas, features, and services.
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
