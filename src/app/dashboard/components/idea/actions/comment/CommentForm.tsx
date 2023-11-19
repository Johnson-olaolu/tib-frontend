"use client";
import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";
import { IComment, IIdea, LIkeTypeEnum } from "@/services/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ideaService from "@/services/idea.service";
import useToast from "@/context/toast";
import userService from "@/services/user.service";
import Avatar from "@/components/extras/Avatar";
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
  comment?: IComment;
  idea?: IIdea;
  type: LIkeTypeEnum;
  closeCommentForm: () => void;
}

const CommentForm: React.FC<ICommentForm> = (props) => {
  const { idea, closeCommentForm, type, comment } = props;
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

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (e.target !== containerRef.current && containerRef.current?.contains(e.target as Node) === false) {
        closeCommentForm();
      }
    };
    document?.querySelector("body")?.addEventListener("click", clickOutside);
    return () => {
      document?.querySelector("body")?.removeEventListener("click", clickOutside);
    };
  }, [closeCommentForm]);

  const submitCommentMutation = useMutation({
    mutationFn: async () => {
      const res = await ideaService.comment(idea?.id || "", currentUser?.id || "", type, commentText, comment?.id);
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
      closeCommentForm();
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
    <div ref={containerRef} className="absolute w-full  left-0 top-0 px-4 py-3 bg-white border-[#E1DDDD] border shadow-md rounded">
      <QuillWrapper
        className="comment-form2 h-32"
        placeholder="Reply with your thoughts?"
        theme="snow"
        value={commentText}
        onChange={(t) => setCommentText(t)}
        modules={{ toolbar: { container: ["bold", "italic", { list: "ordered" }, { list: "bullet" }] } }}
      />
      <div className=" absolute left-4 top-3">
        <Avatar size="xs" user={currentUser} />
      </div>

      <button
        onClick={() => submitCommentMutation.mutate()}
        disabled={commentText == ""}
        className=" absolute bottom-3 right-4 py-2 px-3 text-xs text-white bg-tib-blue rounded disabled:opacity-30"
      >
        Reply
      </button>
    </div>
  );
};

export default CommentForm;
