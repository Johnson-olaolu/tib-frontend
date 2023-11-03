"use client";
import React from "react";
import { FiCheck } from "react-icons/fi";

interface IInterestBadge {
  handleInterestBadgeClick: (name: string) => void;
  selected: boolean;
  name: string;
}
const InterestBadge2: React.FC<IInterestBadge> = (props) => {
  const { handleInterestBadgeClick, selected, name } = props;
  return (
    <button
      onClick={(e) => {
        e.preventDefault(), handleInterestBadgeClick(name);
      }}
      className={`text-sm text-white ${selected ? "bg-tib-blue" : "bg-[#D3DEFF]"}  py-2 px-3 flex gap-2 items-center rounded-lg`}
    >
      <span>{name}</span>
      {selected && <FiCheck size={20} />}
    </button>
  );
};

export default InterestBadge2;
