import React, { useState } from "react";
import SelectSocialMediaModal from "./components/SelectSocialMediaModal";
import ViewSocialMedia from "../../extras/ViewSocialMedia";

export interface IFormSelectSocialMedia {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  required?: boolean;
  disabled?: boolean;
  setValue: (data: { name: string; url: string }[]) => void;
  value: { name: string; url: string }[];
}

const FormSelectSocialMedia: React.FC<IFormSelectSocialMedia> = (props) => {
  const { name, label, optional, disabled, required, error, setValue, value } = props;
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={`${disabled && "opacity-50"}`}>
      <label htmlFor={name} className="text-xs mb-2 block">
        {label} {required && "(Required)"} {optional && "(Optional)"}
      </label>
      <div
        role="button"
        onClick={() => setShowModal(true)}
        className="p-4 rounded w-full  flex items-center h-14 border  border-[#C2C2C2] focus-visible:outline-none relative gap-2  "
      >
        {value.length > 0 ? (
          value.map((socialMedia) => <ViewSocialMedia data={socialMedia} key={socialMedia.name} />)
        ) : (
          <span className=" text-tib-primary2 opacity-50 text-sm">Select and Add</span>
        )}

        <svg
          className=" absolute right-4 top-1/2 transform -translate-y-1/2 scale-150"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.6665 6.66663L7.99984 9.99996L11.3332 6.66663H4.6665Z" fill="black" />
        </svg>
      </div>
      {error && <span className=" text-xs mt-1 text-red-500">{error}</span>}
      {showModal && <SelectSocialMediaModal value={value} setValue={setValue} closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default FormSelectSocialMedia;
