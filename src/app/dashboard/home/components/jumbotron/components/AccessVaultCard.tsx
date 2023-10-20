import Link from "next/link";
import React from "react";

const AccessVaultCard = () => {
  return (
    <div
      className=" h-60 w-[262px] rounded p-6 flex flex-col justify-between items-center"
      style={{
        background: "linear-gradient(141deg, #F9DD4B 28.65%, #F0B267 57.56%, #FBC02D 94.07%)",
        boxShadow: "6.58125px 6.58125px 11.51719px 0px rgba(194, 191, 191, 0.20)",
      }}
    >
      <div className=" text-center space-y-4 text-tib-purple">
        <p className=" font-bold text-xl">Access Vault</p>
        <p className="text-sm">Subscribe to Access Valut</p>
      </div>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <rect width="56" height="55.5462" fill="url(#pattern0)" />
        <defs>
          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_456_6881" transform="matrix(0.00637405 0 0 0.00642612 -0.782313 -0.443299)" />
          </pattern>
          <image
            id="image0_456_6881"
            width="394"
            height="300"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>

      <Link href={"#"} className=" py-[10px] px-4 w-32 bg-tib-blue text-tib-white rounded text-sm text-center inline-block">
        Access
      </Link>
    </div>
  );
};

export default AccessVaultCard;
