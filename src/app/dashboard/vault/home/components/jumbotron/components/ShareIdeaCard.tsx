"use client";
import useModal from "@/context/modal";
import Link from "next/link";
import React from "react";

const ShareIdeaCard = () => {
  const { openModal } = useModal();
  return (
    <div
      className=" h-60 w-[262px] rounded p-6 flex flex-col justify-between items-center"
      style={{
        background: "linear-gradient(137deg, #BB0C0C 2.34%, rgba(201, 13, 13, 0.50) 60.72%, #C90D0D 97.54%)",
        boxShadow: "6.58125px 6.58125px 11.51719px 0px rgba(194, 191, 191, 0.20)",
      }}
    >
      <div className=" text-center space-y-4 text-white">
        <p className=" font-bold text-xl capitalize">Deposit an Idea</p>
        <p className="text-sm">Bring your Idea to Life!</p>
      </div>
      <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.3486 4.36084L9.79656 6.90921L13.5938 10.7046L16.1421 8.15621L12.3467 4.36084H12.3486ZM45.6532 4.36084L41.8561 8.15621L44.4062 10.7046L48.2016 6.91103L45.6514 4.36084H45.6532ZM29 5.49184C28.4019 5.49909 27.7965 5.53353 27.1875 5.60784C27.1694 5.60784 27.1513 5.60422 27.1331 5.60784C19.7816 6.45065 13.9309 12.3902 12.9141 19.7091C12.1021 25.5997 14.5308 30.9412 18.5781 34.3813C20.2337 35.7942 21.3535 37.7331 21.75 39.8732V50.7482H25.8825C26.5133 51.8302 27.6642 52.5607 29 52.5607C30.3358 52.5607 31.4867 51.8302 32.1175 50.7482H36.25V43.4982H36.4204V41.3449C36.4204 38.6878 37.8015 36.0089 40.0454 33.9263C43.0469 30.9212 45.3125 26.6528 45.3125 21.75C45.3125 12.7962 37.9429 5.40847 29 5.49184ZM29 9.11684C36.0053 9.01897 41.6875 14.7537 41.6875 21.75C41.6875 25.5453 39.9294 28.8876 37.4952 31.32L37.5532 31.378C35.1342 33.6086 33.57 36.6139 33.1307 39.875H25.2028C24.8041 36.7683 23.4719 33.7614 20.9543 31.6045C17.7516 28.8858 15.8431 24.7895 16.4811 20.164C17.2731 14.4547 21.9059 9.86359 27.5826 9.23465C28.0513 9.16931 28.5233 9.13058 28.9964 9.11865L29 9.11684ZM3.625 21.75V25.375H9.0625V21.75H3.625ZM48.9375 21.75V25.375H54.375V21.75H48.9375ZM13.5938 36.4203L9.79838 40.2139L12.3486 42.7641L16.1403 38.9687L13.5938 36.4203ZM44.4062 36.4203L41.8579 38.9687L45.6514 42.7641L48.2016 40.2139L44.4062 36.4203ZM25.375 43.5H32.625V47.125H25.375V43.5Z"
          fill="#F8F8F8"
        />
      </svg>

      <button onClick={() => openModal("vault-create-idea")} className=" py-[10px] px-4 bg-tib-blue text-tib-white rounded text-sm">
        Deposit Idea
      </button>
    </div>
  );
};

export default ShareIdeaCard;
