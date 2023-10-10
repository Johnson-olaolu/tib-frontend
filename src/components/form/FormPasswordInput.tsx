"use client";
import React, { useState } from "react";
import { IFormText } from "./FormTextInput";
import { FiEye, FiEyeOff } from "react-icons/fi";
const FormPasswordInput: React.FC<IFormText> = (props) => {
  const { error, name, label, required, optional } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="">
      <label htmlFor={name} className="text-xs mb-2 block">
        {label} {required && "(Required)"} {optional && "(Optional)"}
      </label>
      <div className="relative">
        <input
          {...props}
          className="p-4 rounded w-full text-sm border border-[#C2C2C2] focus-visible:outline-none"
          type={showPassword ? "text" : "password"}
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {showPassword ? <FiEye onClick={() => setShowPassword(false)} /> : <FiEyeOff onClick={() => setShowPassword(true)} />}
        </span>
      </div>
      {error && <span className=" text-xs mt-1 text-red-500">{error}</span>}
    </div>
  );
};

export default FormPasswordInput;
