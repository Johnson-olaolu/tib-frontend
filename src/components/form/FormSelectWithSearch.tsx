"use client";
import { testUsers } from "@/utils/constants";
import React, { useMemo, useState } from "react";
import { FaCaretDown } from "react-icons/fa6";
import { FiX } from "react-icons/fi";

export interface IFormSelectWithSearch {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  required?: boolean;
  disabled?: boolean;
  type?: "user";
}

const FormSelectWithSearch: React.FC<IFormSelectWithSearch> = (props) => {
  const { error, name, label, required, optional, disabled, type = "user" } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const searchResponse = useMemo(() => {
    //user search funtion
    return testUsers;
  }, []);
  return (
    <div className={`${disabled && "opacity-50"}`}>
      <label htmlFor={name} className="text-xs mb-2 block">
        {label} {required && "(Required)"} {optional && "(Optional)"}
      </label>
      <div className=" relative">
        <div
          className=" focus-within:ring-1 focus-within:ring-tib-blue p-[10px]  pr-6 relative rounded w-full text-sm border border-[#C2C2C2] focus:ring-2 focus:ring-tib-blue flex items-center gap-2 flex-wrap"
          tabIndex={1}
        >
          <div className="rounded p-2 flex items-center gap-2 bg-tib-blue text-tib-white flex-shrink-0">
            <span className=" text-xs">Henry Edwards</span>
            <FiX />
          </div>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" text-sm focus-visible:outline-none min-w-[220px] flex-grow ml-2"
            placeholder="Add more collaborators (Optional)"
            type="text"
          />
          {searchTerm !== "" && <FaCaretDown className="shrink-0 absolute right-[10px] " />}
        </div>
        {searchTerm !== "" && (
          <div className="w-full h-40 rounded absolute py-3 px-2 bg-tib-white shadow-xl  border border-[#C2C2C2]  z-10 -bottom-2 transform translate-y-full">
            {searchResponse.length > 0 ? (
              <div className="">
                {searchResponse.map((res) => (
                  <div className="flex items-center gap-2" key={res.id}>
                    <div className=" h-6 w-6 rounded-full bg-gray-600" />
                    <div className=" flex  gap-1 items-center">
                      <p className=" text-sm ">
                        {res.profile?.firstName} {res.profile?.lastName}
                      </p>
                      <span className=" text-xs">({res.userName})</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className=" text-xs text-center">No result found</p>
            )}
          </div>
        )}
      </div>

      {error && <span className=" text-xs mt-1 text-red-500">{error}</span>}
    </div>
  );
};

export default FormSelectWithSearch;
