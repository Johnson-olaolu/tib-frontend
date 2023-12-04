"use client";
import React, { ChangeEvent, ComponentProps, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import ViewMediaBadge from "./components/ViewMediaBadge";
import { IoFolderOpenSharp } from "react-icons/io5";
import { validExtensions } from "@/utils/constants";

export interface IFormText extends ComponentProps<"input"> {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  allowMultiple?: boolean;
  values?: File[];
  onChangeFiles: (files: File[]) => void;
  dropLabel?: string;
}

const FormMediaSelect: React.FC<IFormText> = (props) => {
  const { error, name, label, required, optional, disabled, allowMultiple = false, onChangeFiles, values, dropLabel } = props;
  const dragDropLayer = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const selectFile = () => {
    const fileInput = document?.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = allowMultiple;
    fileInput.accept = ".".concat(validExtensions.join(", ."));

    // fileInput.accept = "image/*";
    fileInput.addEventListener("change", (e: Event) => {
      let input = e?.target as HTMLInputElement;
      let newFiles = values;
      for (const file of Array.from(input?.files || [])) {
        if (!values?.includes(file)) {
          newFiles?.push(file);
        }
      }
      onChangeFiles([...newFiles!]);
    });
    fileInput.click();
  };

  const removeFile = (file: File) => {
    const newFiles = values?.filter((f) => f.name !== file.name);
    onChangeFiles([...(newFiles || [])]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = values;
    for (const file of Array.from(e.dataTransfer?.files || [])) {
      if (values?.every((f) => f.name !== file.name)) {
        newFiles?.push(file);
      }
    }
    onChangeFiles([...(newFiles || [])]);
    setDragOver(false);
  };

  return (
    <div className={`${disabled && "opacity-50"}`}>
      <label htmlFor={name} className="text-xs mb-2 block">
        {label} {required && "(Required)"} {optional && "(Optional)"}
      </label>
      <div className="">
        <div className="flex gap-[10px] pb-4 flex-wrap">
          {values?.map((file) => (
            <ViewMediaBadge removeFile={removeFile} key={file.name} file={file} />
          ))}
        </div>
        <div
          className=" p-6  border border-[#C2C2C2]  rounded"
          ref={dragDropLayer}
          onDragOverCapture={handleDragOver}
          onDragLeaveCapture={handleDragLeave}
          onDropCapture={handleDragDrop}
        >
          <div className="h-48 flex items-center justify-center border bg-tib-light-blue border-dashed rounded">
            {!dragOver ? (
              <div className="flex flex-col gap-4 items-center w-56">
                <IoFolderOpenSharp size={32} className=" text-tib-purple" />
                <p className="text-center text-xs text-tib-primary opacity-70">
                  {" "}
                  {dropLabel || "Drag your videos, pictures and documents here to start uploading or"}
                </p>
                <button
                  className="rounded py-2 px-3 border bg-white border-tib-blue text-tib-blue text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    selectFile();
                  }}
                >
                  Browse Files
                </button>
              </div>
            ) : (
              <div className="">
                <p className="text-center text-xs text-tib-primary opacity-70">Drop Here</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {error && <span className=" text-xs mt-1 text-red-500">{error}</span>}
    </div>
  );
};

export default FormMediaSelect;
