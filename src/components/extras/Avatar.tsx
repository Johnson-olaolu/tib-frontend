import { IProfile, IUser } from "@/services/types";
import { getInitials } from "@/utils/misc";
import React from "react";

const Avatar: React.FC<{ user?: IUser; size?: "xs" | "sm" | "md" | "lg" | "xl" }> = (props) => {
  const { user, size = "md" } = props;
  const height = size == "xs" ? "32px" : "sm" ? "48px" : size == "lg" ? "62px" : "52px";
  const width = size == "xs" ? "32px" : "sm" ? "48px" : size == "lg" ? "62px" : "52px";
  const fontSize = size == "xs" ? "14px" : "sm" ? "16px" : size == "lg" ? "20px" : "18px";
  return (
    <>
      {user?.profile?.profilePicture ? (
        <div
          className={`rounded-full`}
          style={{ backgroundImage: `url(${user.profile.profilePicture})`, backgroundSize: "100% 100%", backgroundPosition: "center", height, width }}
        ></div>
      ) : (
        <div style={{ height, width }} className={` rounded-full bg-tib-purple overflow-hidden flex items-center justify-center`}>
          <span style={{ fontSize }} className={`font-bold text-white uppercase`}>
            {getInitials(user)}
          </span>
        </div>
      )}
    </>
  );
};

export default Avatar;
