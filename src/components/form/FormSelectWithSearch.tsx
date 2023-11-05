/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCaretDown } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import interestService from "@/services/interest.service";
import { IInterest, IUser } from "@/services/types";
import userService from "@/services/user.service";
import Avatar from "../extras/Avatar";

export interface IFormSelectWithSearch {
  values: string[];
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  required?: boolean;
  disabled?: boolean;
  handleClick: (value: string) => void;
  handleRemove: (value: string) => void;
  placeholder?: string;
  type?: "user" | "interest";
}

const FormSelectWithSearch: React.FC<IFormSelectWithSearch> = (props) => {
  const { error, name, label, required, optional, disabled, type = "user", values, placeholder, handleClick, handleRemove } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);

  let queriedData: IInterest[] | IUser[] | undefined = [];
  if (type === "interest") {
    const { data } = useQuery({
      queryKey: ["interest", searchTerm],
      queryFn: async () => {
        const res = await interestService.queryInterests({ name: searchTerm });
        return res.data;
      },
    });
    queriedData = data;
  } else if (type === "user") {
    const { data } = useQuery({
      queryKey: ["user", searchTerm],
      queryFn: async () => {
        const res = await userService.queryUsers({ name: searchTerm, userName: searchTerm });
        return res.data;
      },
    });
    queriedData = data;
  }

  const addItemInterest = (item: IInterest) => {
    if (!values.includes(item.id)) {
      setData([...data, item]);
      handleClick(item.name);
    }
    setShowOptions(false);
    setSearchTerm("");
  };

  const addItemUser = (user: IUser) => {
    if (!values.includes(user.id)) {
      setData([...data, user]);
      handleClick(user.id);
    }
    setShowOptions(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const clickOutsideSelectSearch = (e: MouseEvent) => {
      if (e.target !== containerRef.current && containerRef.current?.contains(e.target as Node) === false) {
        setShowOptions(false);
        setSearchTerm("");
      }
    };
    document?.querySelector("body")?.addEventListener("click", clickOutsideSelectSearch);
    return () => {
      document?.querySelector("body")?.removeEventListener("click", clickOutsideSelectSearch);
    };
  }, []);

  return (
    <div ref={containerRef} className={`${disabled && "opacity-50"}`}>
      <label htmlFor={name} className="text-xs mb-2 block">
        {label} {required && "(Required)"} {optional && "(Optional)"}
      </label>
      <div className=" relative">
        <div
          className=" focus-within:ring-1 focus-within:ring-tib-blue p-[10px]  pr-6 relative rounded w-full text-sm border border-[#C2C2C2] focus:ring-2 focus:ring-tib-blue flex items-center gap-2 flex-wrap"
          tabIndex={1}
        >
          {type == "interest" &&
            values?.map((value) => (
              <div key={value} className="rounded p-2 flex items-center gap-2 bg-tib-blue text-tib-white flex-shrink-0">
                <span className=" text-xs">{data.find((i) => i.name === value)?.name}</span>
                <FiX role="button" onClick={() => handleRemove(value)} />
              </div>
            ))}
          {type == "user" &&
            values?.map((value) => (
              <div key={value} className="rounded p-2 flex items-center gap-2 bg-tib-blue text-tib-white flex-shrink-0">
                <span className=" text-xs">
                  {(data as IUser[]).find((i) => i.id === value)?.profile?.firstName +
                    " " +
                    (data as IUser[]).find((i) => i.id === value)?.profile?.lastName}{" "}
                </span>
                <FiX role="button" onClick={() => handleRemove(value)} />
              </div>
            ))}

          <input
            onFocus={() => setShowOptions(true)}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" text-sm focus-visible:outline-none min-w-[220px] flex-grow ml-2"
            placeholder={placeholder + ` ${optional ? "(Optional)" : ""}`}
            type="text"
          />
          {showOptions && (
            <FaCaretDown
              className="shrink-0 absolute right-[10px] "
              role="button"
              onClick={() => {
                setShowOptions(false);
                setSearchTerm("");
              }}
            />
          )}
        </div>
        {showOptions && (
          <div className="w-full h-40 rounded absolute py-3 bg-tib-white shadow-xl  border border-[#C2C2C2]  z-10 -bottom-2 transform translate-y-full overflow-y-auto">
            {type === "interest" ? (
              queriedData && queriedData?.length > 0 ? (
                <div className=" space-y-1">
                  {(queriedData as unknown as IInterest[]).map((res) => (
                    <div
                      className={`px-4 flex hover:bg-gray-100 border-l-2 hover:border-gray-600 border-transparent ${
                        values.includes(res.name) && "bg-gray-100 border-l-2 border-gray-600"
                      }`}
                      onClick={() => {
                        addItemInterest(res);
                      }}
                      key={res.id}
                      role="button"
                    >
                      <p className=" text-sm py-1">{res.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className=" text-xs text-center">No result found</p>
              )
            ) : type == "user" ? (
              queriedData && queriedData?.length > 0 ? (
                <div className=" space-y-1">
                  {(queriedData as unknown as IUser[]).map((res) => (
                    <div
                      className={`px-4 py-1 flex items-center gap-2 hover:bg-gray-100 border-l-2 hover:border-gray-600 border-transparent ${
                        values.includes(res.id) && "bg-gray-100 border-l-2 border-gray-600"
                      }`}
                      onClick={() => {
                        addItemUser(res);
                      }}
                      key={res.id}
                      role="button"
                    >
                      <Avatar user={res} size="xs" />
                      <p className="">
                        {res.profile?.firstName} {res.profile?.lastName}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className=" text-xs text-center">No result found</p>
              )
            ) : null}
            {/* {interestData && interestData?.length > 0 ? (
              <div className="">
                {interestData.map((res) => (
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
            ) : interestData && interestData?.length > 0 ? (
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
            )} */}
          </div>
        )}
      </div>

      {error && <span className=" text-xs mt-1 text-red-500">{error}</span>}
    </div>
  );
};

export default FormSelectWithSearch;
