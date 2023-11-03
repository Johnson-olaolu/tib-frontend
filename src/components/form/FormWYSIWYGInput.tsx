"use client";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
// const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import ReactQuill from "react-quill";

interface IFormWYSIWYGInput {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  rows?: number;
  required?: boolean;
  min?: number;
  value: string;
  setValue: (value: string) => void;
}

const FormWYSIWYGInput: React.FC<IFormWYSIWYGInput> = (props) => {
  const { error, name, label, required, optional, min, value, setValue } = props;
  const [isFocused, setisFocused] = useState(false);
  return (
    <div className="">
      <div className="justify-between flex mb-2">
        <label htmlFor={name} className="text-xs  block ">
          {label} {required && "(Required)"} {optional && "(Optional)"}
        </label>
        {min && (
          <span className={`text-xs ${min > (value as string).length ? "text-red-500" : ""}`}>
            {(value as string).length}/{min}
          </span>
        )}
      </div>
      {/* <div className={!isFocused ? "h-32" : "h-[268px]"}> */}
      <div className={!isFocused ? "h-32" : "h-[268px]"}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={(value) => setValue(value)}
          className={!isFocused ? "hide-toolbar" : " h-56"}
          onFocus={() => setisFocused(true)}
          onBlur={() => setisFocused(false)}
        />
      </div>

      {error && <span className=" text-xs mt-1 text-red-500">{error}</span>}
    </div>
  );
};

export default FormWYSIWYGInput;
