import { error } from "console";
import React, { ComponentProps } from "react";

export interface IFormText extends ComponentProps<"input"> {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
}

const FormTextInput: React.FC<IFormText> = (props) => {
  const { error, name, label, required, optional, disabled } = props;
  return (
    <div className={`${disabled && "opacity-50"}`}>
      <label htmlFor={name} className="text-xs mb-2 block">
        {label} {required && "(Required)"} {optional && "(Optional)"}
      </label>
      <input {...props} className="p-4 rounded w-full text-sm border border-[#C2C2C2] focus-visible:outline-none" type="text" />
      {error && <span className=" text-xs mt-1 text-red-500">{error}</span>}
    </div>
  );
};

export default FormTextInput;
