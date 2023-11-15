"use client";
import { NextPage } from "next";
import React from "react";

const IdeaPage: NextPage<any> = (props) => {
  const ideaTitle = decodeURIComponent(props.params.ideaTitle);

  return <div className="max-w-7xl mx-auto mt-32"></div>;
};

export default IdeaPage;
