"use client";
import React, { useEffect, useRef } from "react";
import InterestBadge2 from "./InterestBadge2";
import { ICategory } from "@/services/types";
import { FiX } from "react-icons/fi";

interface IInterestSelectorModal {
  interests: ICategory[];
  values: string[];
  handleInterestBadgeClick: (name: string) => void;
  closeModal: () => void;
}
const InterestSelectorModal: React.FC<IInterestSelectorModal> = (props) => {
  const { interests, values, handleInterestBadgeClick, closeModal } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clickOutsideInterestSelector = (e: MouseEvent) => {
      if (e.target !== containerRef.current && containerRef.current?.contains(e.target as Node) === false) {
        closeModal();
      }
    };
    document?.querySelector("body")?.addEventListener("click", clickOutsideInterestSelector);
    return () => {
      document?.querySelector("body")?.removeEventListener("click", clickOutsideInterestSelector);
    };
  }, []);

  return (
    <div className=" h-screen w-screen fixed left-0 top-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div ref={containerRef} className=" max-w-2xl bg-white px-10 py-20 w-full relative">
        <FiX className=" absolute right-8 top-8 " role="button" onClick={() => closeModal()} />
        <div className="">
          <div className="">
            <p className=" text-tib-purple font-bold text-4xl text-center">Select Area of Interest</p>
            <div className="mt-10 flex flex-wrap gap-x-3 gap-y-4 justify-center">
              {interests?.map((i) => (
                <InterestBadge2 handleInterestBadgeClick={handleInterestBadgeClick} name={i.name} selected={values.includes(i.name)} key={i.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestSelectorModal;
