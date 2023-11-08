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
            We Exist so that <strong>Others can Exists</strong>
          </h4>
          <p className=" text-tib-black">
            Our transparent and streamlined processes, our eco-system of entrepreneurs, ideators and investors, our passion and 100% commitment to
            changing the world fuse beautifully to achieve any dream.
          </p>
          <Link href="auth/login" className="py-3 px-4 rounded bg-tib-blue text-tib-white font-abrilFatface tracking-wide inline-block">
            Get Started
          </Link>
        </div>
        <div style={{ background: `url("/images/ProccessImage.png")`, backgroundSize: "100% 100%" }} className="h-[562px] w-full relative">
          <div className=" absolute w-[244px] left-[112px] top-[536px]">
            <h4 className="text-tib-purple text-2xl font-black mb-4">Share Ideas</h4>
            <p className=" text-tib-primary">
              Your mind is limitless, so are you. Share your idea with the world. Give us your two cents on any and everything.
            </p>
          </div>
          <div className=" absolute w-[264px] left-[380px] top-[386px]">
            <h4 className="text-tib-purple text-2xl font-black mb-4">Sell Ideas</h4>
            <p className=" text-tib-primary">
              Your finish line could be another person’s starting point. Earn money by selling your novel or established ideas and businesses.
            </p>
          </div>
          <div className=" absolute w-[244px] left-[746px] top-[304px]">
            <h4 className="text-tib-purple text-2xl font-black mb-4">Buy Ideas</h4>
            <p className=" text-tib-primary">
              Up for the challenge? Take that idea to the next level, bring it to life! 
              <br />
              Explore, partner-with or own the most viable ideas.
            </p>
          </div>
          <div className=" absolute w-[264px] left-[1026px] top-[276px]">
            <h4 className="text-tib-purple text-2xl font-black mb-4">Go Enterprise</h4>
            <p className=" text-tib-primary">Bring ideas in and entertain them royally, for one of them may be the king!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageProcess;
