"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BiSolidXCircle } from "react-icons/bi";

const VaultDashboardSearchBar = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const clickOutsideSelectSearch = (e: MouseEvent) => {
      if (e.target !== containerRef.current && containerRef.current?.contains(e.target as Node) === false) {
        setShowModal(false);
      }
    };
    document?.querySelector("body")?.addEventListener("click", clickOutsideSelectSearch);
    return () => {
      document?.querySelector("body")?.removeEventListener("click", clickOutsideSelectSearch);
    };
  }, []);

  const handleOnFocus = () => {
    if (search === "") {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (search === "") {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [search]);
  return (
    <div className=" flex-grow flex justify-center px-5">
      <div ref={containerRef} className={` relative ${!showModal ? "w-[450px]" : "w-full"} `}>
        <div
          className={`p-[18px] text-sm border ${
            showModal ? " ring-blue-600 ring-2" : "border-[#C2C2C2] "
          }  relative w-full rounded flex items-center gap-2`}
        >
          <FiSearch size={20} className=" text-[#C2C2C2]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={handleOnFocus}
            type="text"
            className="w-full focus-visible:outline-none flex-grow placeholder:text-[#C2C2C2]"
            placeholder="Search all categories, users, ideas, interest and more"
          />
          {showModal && <BiSolidXCircle size={20} className="text-black" role="button" onClick={() => setShowModal(false)} />}
        </div>
        {showModal && (
          <div className="absolute w-full -bottom-1 transform translate-y-full h-80 bg-white border border-[#C2C2C2] rounded-lg p-6 z-30">
            <h6 className=" font-bold text-tib-purple">No Result</h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultDashboardSearchBar;
