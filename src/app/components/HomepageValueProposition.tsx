import Image from "next/image";
import React from "react";

const HomepageValueProposition = () => {
  return (
    <div className=" px-8 transform -translate-y-32 relative z-10">
      <div className=" px-28 bg-tib-light-purple rounded-[50px] py-32 grid grid-cols-2 gap-36 items-center">
        <Image src="/images/ValueProposition.png" height={468} width={498} alt="value proposition" />
        <div className="">
          <h4 className=" text-4xl text-tib-purple mb-12">
            Value <strong>Propositions</strong>
          </h4>
          <div className=" text-tib-black space-y-4 text-justify">
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit non leo cursus consectetur nisl, fames. Mauris at amet faucibus
              faucibus. Proin enim, tortor, tortor sodales. Amet nibh fermentum lacinia libero lectus habitant vel. Aenean vulputate est netus
              facilisis.
            </p>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suscipit non leo cursus consectetur nisl, fames. Mauris at amet faucibus
              faucibus. Proin enim, tortor, tortor sodales. Amet nibh fermentum lacinia libero lectus habitant vel. Aenean vulputate est netus
              facilisis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageValueProposition;
