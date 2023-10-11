import { error } from "console";
import React, { ComponentProps } from "react";

export interface IFormTextArea extends ComponentProps<"textarea"> {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  rows?: number;
  min?: number;
}

const FormTextArea: React.FC<IFormTextArea> = (props) => {
  const { error, name, label, required, optional, rows = 8, min, value } = props;
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

      <textarea
        {...props}
        className="p-4 rounded w-full text-sm border border-[#C2C2C2] focus-visible:outline-none resize-none"
        rows={rows}
      ></textarea>
      {error && <span className=" text-xs mt-1 text-red-500">{error}</span>}
    </div>
  );
};

export default FormTextArea;
