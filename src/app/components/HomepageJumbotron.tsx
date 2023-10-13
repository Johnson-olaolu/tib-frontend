import Link from "next/link";
import React from "react";

const HomepageJumbotron = () => {
  return (
    <div style={{ background: `url("/images/JumbotronBg.png")`, backgroundSize: "100% 100%" }} className=" pt-[220px] px-14 h-[1152px]">
      <div style={{ background: `url("/images/JumbotronImage.png") ` }} className="w-[1258px] h-[572px]">
        <div className="text-center max-w-max mx-auto transform -translate-y-28">
          <div className=" mb-14">
            <h2 className="text-[56px] text-tib-purple">
              We Share <strong className="font-bold">Creative Ideas</strong>
            </h2>
            <p className=" text-3xl text-tib-black">Come let’s rub mind together</p>
          </div>

          <Link href="/auth/login" className="px-14 py-5 bg-tib-blue rounded font-abrilFatface inline-block tracking-wide text-white">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomepageJumbotron;
