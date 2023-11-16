import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";
import { VscSend } from "react-icons/vsc";
const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
) as typeof ReactQuill;

const CommentForm = () => {
  return (
    <div className="relative">
      <QuillWrapper
        className="comment-form h-48"
        placeholder="Reply with your thoughts?"
        theme="snow"
        modules={{ toolbar: { container: ["bold", "italic", { list: "ordered" }, { list: "bullet" }] } }}
      />
      <VscSend className=" absolute bottom-2 right-2 text-tib-primary2" size={24} role="button" />
    </div>
  );
};

export default CommentForm;
