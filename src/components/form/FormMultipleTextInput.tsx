import React, { ComponentProps, useState } from "react";
import { FiX } from "react-icons/fi";

export interface IFormText {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value: string[];
  setValue: (data: string[]) => void;
}

const FormMultipleTextInput: React.FC<IFormText> = (props) => {
  const { error, name, label, required, optional, disabled, placeholder, value, setValue } = props;
  const [text, setText] = useState("");

  const handleRemove = (s: string) => {
    setValue(value.filter((v) => v !== s));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      setValue([...value, text]);
      setText("");
    }
  };
  return (
    <div className={`${disabled && "opacity-50"}`}>
      <label htmlFor={name} className="text-xs mb-2 block">
        {label} {required && "(Required)"} {optional && "(Optional)"}
      </label>
      <div
        className=" h-14 focus-within:ring-1 focus-within:ring-tib-blue p-[10px]  pr-6 relative rounded w-full text-sm border border-[#C2C2C2] focus:ring-2 focus:ring-tib-blue flex items-center gap-2 flex-wrap"
        tabIndex={1}
      >
        {value?.map((v) => (
          <div key={v} className="rounded p-2 flex items-center gap-2 bg-tib-blue text-tib-white flex-shrink-0">
            <span className=" text-xs">{v}</span>
            <FiX role="button" onClick={() => handleRemove(v)} />
          </div>
        ))}
        <input
          value={text}
          onKeyDown={handleKeyPress}
          onChange={(e) => setText(e.target.value)}
          className=" text-sm focus-visible:outline-none min-w-[220px] flex-grow ml-2"
          placeholder={placeholder + ` ${optional ? "(Optional)" : ""}`}
          type="text"
        />
      </div>
      {error && <span className=" text-xs mt-1 text-red-500">{error}</span>}
    </div>
  );
};

export default FormMultipleTextInput;
