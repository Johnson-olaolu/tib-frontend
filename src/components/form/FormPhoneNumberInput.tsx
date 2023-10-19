import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { IFormText } from "./FormTextInput";

interface IFormPhoneNumberInput extends IFormText {
  handleChange: (e: string) => void;
}

const FormPhoneNumberInput: React.FC<IFormPhoneNumberInput> = (props) => {
  const { error, name, label, required, optional, disabled, value, handleChange } = props;
  return (
    <div className={`${disabled ? "opacity-50" : ""} px-3`}>
      <label htmlFor={name} className="text-xs mb-2 block">
        {label} {required && "(Required)"} {optional && "(Optional)"}
      </label>
      <PhoneInput
        international
        defaultCountry="NG"
        value={value as any}
        onChange={(e) => handleChange(e || "")}
        numberInputProps={{
          className: "focus-visible:outline-none",
          ...props,
        }}
        className="p-4 rounded w-full text-sm border border-[#C2C2C2] focus-visible:outline-none"
      />
      {/* <input className="p-4 rounded w-full text-sm border border-[#C2C2C2] focus-visible:outline-none" type="text" /> */}
      {error && <span className=" text-xs mt-1 text-red-500">{error}</span>}
    </div>
  );
};

export default FormPhoneNumberInput;
