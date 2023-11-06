"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BiSolidXCircle } from "react-icons/bi";

const DashboardSearchBar = () => {
  const [search, setSearch] = useState("");
  return (
    <div className=" relative w-[450px]">
      <div
        className={`p-[18px] text-sm border ${
          search !== "" ? " ring-blue-600 ring-2" : "border-[#C2C2C2] "
        }  relative w-full rounded flex items-center gap-2`}
      >
        <FiSearch size={20} className=" text-[#C2C2C2]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="w-full focus-visible:outline-none flex-grow placeholder:text-[#C2C2C2]"
          placeholder="Search all categories, users, ideas, interest and more"
        />
        {search !== "" && <BiSolidXCircle size={20} className="text-black" role="button" onClick={() => setSearch("")} />}
      </div>
      {search !== "" && (
        <div className="absolute w-full -bottom-1 transform translate-y-full h-80 bg-white border border-[#C2C2C2] rounded-lg p-6">
          <h6 className=" font-bold text-tib-purple">No Result</h6>
        </div>
      )}
    </div>
  );
};

export default DashboardSearchBar;
