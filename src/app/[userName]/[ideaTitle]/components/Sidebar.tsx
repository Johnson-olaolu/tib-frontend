import React from "react";
import { FiX } from "react-icons/fi";

const IdeaSidebar = () => {
  return (
    <div className=" w-[412px] shrink-0 px-4 border-l border-[#E8E3E3]">
      <div className="py-10 px-6 flex items-center justify-between">
        <h4 className=" text-tib-purple text-2xl ">Comments</h4>
        <FiX />
      </div>
    </div>
  );
};

export default IdeaSidebar;
