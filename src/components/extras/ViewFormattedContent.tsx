import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";

interface IViewFormattedContent {
  content: string;
}
const ViewFormattedContent: React.FC<IViewFormattedContent> = (props) => {
  const { content } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useLayoutEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        body {   margin: 0;  font-family : "Figtree" ; color : #403E3E}
    `;
    window.frames[0]?.document.querySelector("head")?.append(style);
    window.frames[0]!.document.querySelector("body")!.innerHTML = content || "";
    const resizeIframe = () => {};
    const height = window.frames[0]!.document.querySelector("body")?.scrollHeight || 0;
    iframeRef.current!.height = height + 50 + "px";

    iframeRef.current?.addEventListener("", () => {
      console.log("Hello ");
      const height = window.frames[0]!.document.querySelector("body")?.scrollHeight || 0;
      iframeRef.current!.height = height + 50 + "px";
    });
  }, [content]);
  return (
    <div className="">
      <iframe ref={iframeRef} src="" className=" w-full"></iframe>
    </div>
  );
};

export default ViewFormattedContent;
