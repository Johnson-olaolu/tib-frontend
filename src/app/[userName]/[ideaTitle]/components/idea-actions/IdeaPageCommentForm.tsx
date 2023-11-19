"use client";
import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";
import { VscSend } from "react-icons/vsc";
import { IIdea, LIkeTypeEnum } from "@/services/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ideaService from "@/services/idea.service";
import useToast from "@/context/toast";
import userService from "@/services/user.service";
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

interface ICommentForm {
  idea?: IIdea;
}

const IdeaPageCommentForm: React.FC<ICommentForm> = (props) => {
  const { idea } = props;
  const { openToast } = useToast();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");

  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const submitCommentMutation = useMutation({
    mutationFn: async () => {
      const res = await ideaService.comment(idea?.id || "", currentUser?.id || "", LIkeTypeEnum.IDEA, commentText);
      return res.data;
    },
    onSuccess: (data) => {
      setCommentText("");
      queryClient.invalidateQueries({
        queryKey: ["idea", idea?.user.userName, idea?.title],
      });
      openToast({
        type: "success",
        text: "Comment added successfully",
      });
    },
    onError: (error: any) => {
      openToast({
        type: "failure",
        title: "Comment failed",
        text: error?.response?.data?.message,
      });
    },
  });
  return (
    <div className="relative">
      <QuillWrapper
        className="comment-form h-48"
        placeholder="Reply with your thoughts?"
        theme="snow"
        value={commentText}
        onChange={(t) => setCommentText(t)}
        modules={{ toolbar: { container: ["bold", "italic", { list: "ordered" }, { list: "bullet" }] } }}
      />
      <button
        onClick={() => submitCommentMutation.mutate()}
        disabled={commentText == ""}
        className=" absolute bottom-3 right-4 text-tib-primary2 disabled:opacity-30"
      >
        <VscSend size={24} />
      </button>
    </div>
  );
};

export default IdeaPageCommentForm;
