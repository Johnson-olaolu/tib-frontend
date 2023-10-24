import React, { ComponentProps } from "react";
import { BsFile, BsFileImage, BsFilePdf, BsFilePlay, BsFileWord } from "react-icons/bs";

interface IFileIconDispatcher extends ComponentProps<"svg"> {
  file: File;
  size?: number;
}

const FileIconDispatcher: React.FC<IFileIconDispatcher> = (props) => {
  const { file, size = 16 } = props;
  if (file.type.includes("image")) {
    return <BsFileImage {...props} size={size} />;
  }
  if (file.type.includes("video")) {
    return <BsFilePlay {...props} size={size} />;
  }
  if (file.name.includes("pdf")) {
    return <BsFilePdf {...props} size={size} />;
  }
  if (file.type.includes("word")) {
    return <BsFileWord {...props} size={size} />;
  }
  return <BsFile {...props} size={size} />;
};

export default FileIconDispatcher;
