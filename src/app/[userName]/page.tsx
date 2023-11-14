import React, { useEffect } from "react";
import ProfilePageJumbotron from "./components/Jumbotron";
import { NextPage } from "next";
import UserDetails from "./components/user-details";
import ViewIdeas from "../dashboard/components/idea";
import UserIdeas from "./components/user-ideas";

const UserPage: NextPage<{ params: { userName: string } }> = (props) => {
  const userName = props.params.userName;

  return (
    <div className=" bg-white pb-32">
      <ProfilePageJumbotron userName={userName} />
      <UserIdeas userName={userName} />
      <UserDetails userName={userName} />
    </div>
  );
};

export default UserPage;
