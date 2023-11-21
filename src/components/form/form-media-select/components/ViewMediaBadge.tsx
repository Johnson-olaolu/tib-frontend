import FileIconDispatcher from "@/components/extras/FileIconDispatcher";
import { byteValueNumberFormatter } from "@/utils/misc";
import React from "react";
import { BsCardImage } from "react-icons/bs";
import { FiX } from "react-icons/fi";

interface IViewMediaBadge {
  file: File;
  removeFile: (file: File) => void;
}
const ViewMediaBadge: React.FC<IViewMediaBadge> = (props) => {
  const { file, removeFile } = props;
  return (
    <div className=" p-3  rounded flex items-start shadow border border-[#FCF9F9] w-40">
      <FileIconDispatcher file={file} size={20} className=" text-tib-blue shrink-0" />
      <div className="ml-2 mr-2 flex flex-col  grow">
        <p className=" text-xs line-clamp-2 break-words" title={file.name}>
          {file.name}
        </p>
        <span className=" text-[10px] text-tib-primary opacity-70">{byteValueNumberFormatter.format(file.size)}</span>
      </div>
      <FiX role="button" onClick={() => removeFile(file)} className="shrink-0" />
    </div>
  );
};

export default ViewMediaBadge;
