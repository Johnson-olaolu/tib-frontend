import { IProfile, IUser } from "@/services/types";
import { getInitials } from "@/utils/misc";
import React from "react";

const Avatar: React.FC<{ user?: IUser; size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" }> = (props) => {
  const { user, size = "md" } = props;
  const height = size == "xs" ? "32px" : size == "sm" ? "48px" : size == "lg" ? "62px" : size == "xl" ? "100px" : size == "xxl" ? "152px" : "52px";
  const width = size == "xs" ? "32px" : size == "sm" ? "48px" : size == "lg" ? "62px" : size == "xl" ? "100px" : size == "xxl" ? "152px" : "52px";
  const fontSize = size == "xs" ? "14px" : size == "sm" ? "16px" : size == "lg" ? "20px" : size == "xl" ? "24px" : size == "xxl" ? "48px" : "18px";
  return (
    <>
      {user?.profile?.profilePicture ? (
        <div
          className={`rounded-full`}
          style={{ backgroundImage: `url(${user.profile.profilePicture})`, backgroundSize: "cover", backgroundPosition: "center", height, width }}
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
