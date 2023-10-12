import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomepageHeader = () => {
  return (
    <div className=" flex items-center py-7 px-14 justify-between">
      <Image src="/images/logo.png" height={54} width={200} alt="TIB Logo" />
      <nav className="">
        <ul className="flex items-center gap-12">
          <li className="">
            <Link href="/" className="font-bold text-tib-black ">
              Home
            </Link>
          </li>
          <li className="">
            <Link href="/" className="font-bold text-tib-black">
              Value Proposition
            </Link>
          </li>
          <li className="">
            <Link href="/" className="font-bold text-tib-black">
              How it Works
            </Link>
          </li>
          <li className="">
            <Link href="/" className="font-bold text-tib-black">
              Client Testimonial
            </Link>
          </li>
        </ul>
      </nav>
      <Link href="/auth/login" className="py-3 px-4 rounded bg-tib-blue text-tib-white font-abrilFatface tracking-wide">
        Get Started
      </Link>
    </div>
  );
};

export default HomepageHeader;
