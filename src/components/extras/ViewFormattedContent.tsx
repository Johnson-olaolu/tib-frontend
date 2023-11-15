import React, { useLayoutEffect } from "react";

interface IViewFormattedContent {
  content: string;
}
const ViewFormattedContent: React.FC<IViewFormattedContent> = (props) => {
  const { content } = props;

  useLayoutEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        body {   margin: 0;  font-family : "Figtree" }
    `;
    window.frames[0]?.document.querySelector("head")?.append(style);
    window.frames[0]!.document.querySelector("body")!.innerHTML = content || "";
  }, [content]);
  return (
    <div className="">
      <iframe src="" className=""></iframe>
    </div>
  );
};

export default ViewFormattedContent;
