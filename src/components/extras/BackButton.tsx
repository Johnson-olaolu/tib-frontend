"use client";
import { useRouter } from "next13-progressbar";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { usePathname } from "next/navigation";

interface IBackButton {
  route?: string;
  goBack?: boolean;
}

const BackButton: React.FC<IBackButton> = (props) => {
  const { route, goBack = false } = props;
  const router = useRouter();
  const pathname = usePathname();
  const defaultRoute = pathname.includes("vault") ? "/dashboard/vault/home" : "/dashboard/home";

  return (
    <button onClick={() => (goBack ? router.back() : router.push(route ? route : defaultRoute))} className="flex items-center gap-2">
      <BiArrowBack />
      <span className="">Back</span>
    </button>
  );
};

export default BackButton;
