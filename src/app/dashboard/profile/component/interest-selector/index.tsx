"use client";
import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import InterestSelectorModal from "./components/InterestSelectorModal";
import { ICategory } from "@/services/types";

interface IInterestSelector {
  interests: ICategory[];
  values: string[];
  onChange: (values: string[]) => void;
  label: string;
}
const InterestSelector: React.FC<IInterestSelector> = (props) => {
  const { label, onChange, values, interests } = props;
  const [showSelectorModal, setShowSelectorModal] = useState(false);

  const onClickAddInterest = (e: any) => {
    e.preventDefault();
    setShowSelectorModal(true);
  };

  const removeInterest = (name: string) => {
    let newInterests = values.filter((value) => value !== name);
    onChange(newInterests);
  };

  const addInterest = (name: string) => {
    if (!values.includes(name)) {
      let newInterests = [...values, name];
      onChange(newInterests);
    }
  };

  return (
    <>
      <div className="">
        <div className="justify-between flex mb-2">
          <label className="text-xs  block ">{label}</label>
        </div>
        <div className=" flex flex-wrap gap-x-3 gap-y-4">
          {values?.map((i) => (
            <div
              key={i}
              // onClick={() => handleInterestBadgeClick(name)}
              className={`text-sm text-tib-blue border-2 border-tib-blue py-2 px-3 flex gap-2 items-center rounded-lg`}
            >
              <span>{i}</span>
              <FiX size={20} role="button" onClick={() => removeInterest(i)} />
            </div>
          ))}
          <button
            onClick={onClickAddInterest}
            className=" bg-white rounded-lg border-tib-[#A4A2A2] text-[#A4A2A2] border-2 border-dashed flex items-center gap-2 py-2 px-3 "
          >
            <FiPlus size={20} />
            <span>Add Interest</span>
          </button>
        </div>
      </div>
      {showSelectorModal && (
        <InterestSelectorModal
          interests={interests}
          handleInterestBadgeClick={(name) => {
            if (values.includes(name)) {
              removeInterest(name);
            } else {
              addInterest(name);
            }
          }}
          values={values}
          closeModal={() => setShowSelectorModal(false)}
        />
      )}
    </>
  );
};

export default InterestSelector;
