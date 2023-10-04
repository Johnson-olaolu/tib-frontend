import Image from "next/image";
import React from "react";

const HomepageFooter = () => {
  return (
    <div className=" flex items-center py-7 px-14 justify-between bg-tib-purple">
      <Image src="/images/logo2.png" height={54} width={200} alt="TIB Logo" />
      <p className=" text-tib-white font-bold">Contact Us @ emailneeded@gmail.com</p>
      <p className="inline-flex text-tib-white font-bold">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.5 22C17.921 22 22.5 17.421 22.5 12C22.5 6.579 17.921 2 12.5 2C7.079 2 2.5 6.579 2.5 12C2.5 17.421 7.079 22 12.5 22ZM12.5 4C16.837 4 20.5 7.663 20.5 12C20.5 16.337 16.837 20 12.5 20C8.163 20 4.5 16.337 4.5 12C4.5 7.663 8.163 4 12.5 4Z"
            fill="white"
          />
          <path
            d="M12.5 17C13.401 17 15.081 16.832 16.207 15.708L14.793 14.292C14.35 14.735 13.492 15 12.5 15C10.874 15 9.5 13.626 9.5 12C9.5 10.374 10.874 9 12.5 9C13.493 9 14.351 9.265 14.793 9.707L16.207 8.293C15.082 7.168 13.401 7 12.5 7C9.743 7 7.5 9.243 7.5 12C7.5 14.757 9.743 17 12.5 17Z"
            fill="white"
          />
        </svg>
        All rights reserved {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default HomepageFooter;
