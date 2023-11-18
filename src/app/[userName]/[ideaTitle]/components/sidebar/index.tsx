import React from "react";
import { FiX } from "react-icons/fi";
import useIdeaPage from "../../context";
import ViewComments from "./ViewComments";
import ViewShares from "./ViewShares";
import ViewLikes from "./ViewLikes";

const IdeaSidebar = () => {
  const { showSidebar, setShowSidebar, idea } = useIdeaPage();
  return (
    showSidebar !== null && (
      <div className=" w-[412px] shrink-0 border-l border-[#E8E3E3]">
        <div className="py-10 px-6 flex items-center justify-between">
          <h4 className=" text-tib-purple text-2xl ">
            {showSidebar === "comments"
              ? `Comments (${idea?.comments.length || 0})`
              : showSidebar === "likes"
              ? `Likes (${idea?.likes.length || 0})`
              : showSidebar === "shares"
              ? `Shares (${idea?.shares.length || 0})`
              : null}
          </h4>
          <FiX size={24} role="button" onClick={() => setShowSidebar(null)} />
        </div>
        <div className="">
          {showSidebar === "comments" ? (
            <ViewComments idea={idea} />
          ) : showSidebar === "shares" ? (
            <ViewShares shares={idea?.shares || []} />
          ) : showSidebar === "likes" ? (
            <ViewLikes likes={idea?.likes || []} />
          ) : null}
        </div>
      </div>
    )
  );
};

export default IdeaSidebar;
