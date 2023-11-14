import Avatar from "@/components/extras/Avatar";
import React from "react";

const ViewSimilarFollowers = () => {
  return (
    <div className=" mt-20">
      <div className="flex gap-12">
        <div className=" flex flex-col items-center gap-3">
          <Avatar size="xl" />
          <div className=" text-center">
            <p className=" text-sm text-tib-purple">Alex Unusual</p>
            <p className=" text-xs text-tib-primary2">Art</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSimilarFollowers;
