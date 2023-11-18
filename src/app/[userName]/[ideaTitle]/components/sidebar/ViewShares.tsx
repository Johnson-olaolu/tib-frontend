import SimpleAvatarWithName from "@/components/extras/SimpleAvatarWIthName";
import { IShare } from "@/services/types";
import React from "react";

const ViewShares: React.FC<{ shares: IShare[] }> = (props) => {
  const { shares } = props;
  return (
    <div className=" px-6">
      <div className=" space-y-8">
        {shares.map((share) => (
          <SimpleAvatarWithName userId={share.userId} key={share.id} />
        ))}
      </div>
    </div>
  );
};

export default ViewShares;
