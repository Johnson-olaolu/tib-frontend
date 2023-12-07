import SimpleAvatarWithName from "@/components/extras/SimpleAvatarWithName";
import { ILike } from "@/services/types";
import React from "react";

const ViewLikes: React.FC<{ likes: ILike[] }> = (props) => {
  const { likes } = props;
  return (
    <div className=" px-6">
      <div className=" space-y-8">
        {likes.map((like) => (
          <SimpleAvatarWithName userId={like.userId} key={like.id} />
        ))}
      </div>
    </div>
  );
};

export default ViewLikes;
