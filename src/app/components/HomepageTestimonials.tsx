import Image from "next/image";
import React from "react";

const HomepageTestimonials = () => {
  return (
    <div id="client-testimonial" className=" px-8 transform -translate-y-16 relative z-10">
      <div className=" px-28 bg-tib-light-yellow rounded-[50px] py-32 ">
        <div className=" w-[872px] space-y-8 text-center mx-auto">
          <h4 className="text-tib-purple text-4xl ">
            Client <strong>Testimonials</strong>
          </h4>
          <p className=" text-tib-black">Our Clients make what we do worthwhile. Here are a select few…</p>
        </div>
        <div className="mt-20">
          <div className=" flex  justify-center gap-7 ">
            <div className=" w-[412px] h-[226px] px-9 py-8 rounded-lg border border-[#DDD8D8] bg-tib-white flex flex-col justify-between">
              <p className=" text-tib-black">
                “It’s truly unbelievable that an App can have this much value. TIB has given me hope that all my dreams can come true”.
              </p>
              <div className="flex items-center gap-3">
                <Image src={`images/Testimonial1Image.svg`} alt="" height={50} width={50} />
                <div className="">
                  <p className=" text-tib-purple font-bold">Mohammed Bihani</p>
                  {/* <p className=" text-xs">Job Description</p> */}
                </div>
              </div>
            </div>
            <div className=" w-[412px] h-[226px] px-9 py-8 rounded-lg border border-[#DDD8D8] bg-tib-white flex flex-col justify-between">
              <p className=" text-tib-black">
                “The Idea Bank is an era-defining platform. They’re really trying to change the world and Its great to witness”.
              </p>
              <div className="flex items-center gap-3">
                <Image src={`images/Testimonial2Image.svg`} alt="" height={50} width={50} />
                <div className="">
                  <p className=" text-tib-purple font-bold">Brian Ashikodi</p>
                  {/* <p className=" text-xs">Job Description</p> */}
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-16 ">
            <div className="flex items-center gap-2 max-w-max mx-auto">
              <button className="h-1 w-10 bg-tib-purple inline-block rounded-full"></button>
              <button className="h-1 w-3 bg-tib-light-purple inline-block  rounded-full"></button>
              <button className="h-1 w-3 bg-tib-light-purple inline-block  rounded-full"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageTestimonials;
