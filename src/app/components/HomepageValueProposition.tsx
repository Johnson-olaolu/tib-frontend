import Image from "next/image";
import React from "react";

const HomepageValueProposition = () => {
  return (
    <div id="value-propositions" className=" px-8 transform -translate-y-32 relative z-10">
      <div className=" px-28 bg-tib-light-purple rounded-[50px] py-32 grid grid-cols-2 gap-36 items-center">
        <Image src="/images/ValueProposition.png" height={468} width={498} alt="value proposition" />
        <div className="">
          <h4 className=" text-4xl text-tib-purple mb-12">
            Value <strong>Propositions</strong>
          </h4>
          <div className=" text-tib-primary space-y-5 text-justify ">
            <p className="">Idea, they say - rule the world, but what good is an idea If it remains just that, an idea? </p>
            <p className="font-bold">The Problem;</p>
            <ol className=" list-disc pl-4">
              <li className="">Most human ideas remain abstract and stored away in the mind, never seeing the light of day</li>
              <li className="">Potential/keen investors don’t have easy, unfettered access to the most viable ideas</li>
              <li className="">
                Most potential entrepreneurs do not have a reliable channel, partnership, mentorship and/or sponsorship to grow and nurture their
                business idea 
              </li>
              <li className="">Individuals tasked with innovation across industries are too busy just trying to get through the day</li>
            </ol>
            <p className="">
              The Idea Bank (TIB) provides users with an empowering atmosphere where ideas can be securely nurtured, while being transformed from
              abstraction to reality. It gives users the ability to securely buy, sell, or share ideas. This ultimately gives every idea a chance to
              not only exist but to thrive and make our world a better place.
            </p>
            <p className="">Simply put, the Idea Bank (TIB) is an enabling platform where ideas come to life.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageValueProposition;
