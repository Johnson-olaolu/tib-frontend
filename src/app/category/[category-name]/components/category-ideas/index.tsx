"use client";
import ViewIdeas from "@/app/dashboard/components/idea";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface ICategoryDetails {
  categoryName: string;
}

const CategoryIdeas: React.FC<ICategoryDetails> = (props) => {
  const { categoryName } = props;

  return (
    <div className="max-w-7xl mx-auto mt-32">
      <ViewIdeas title={`More stories in the ${categoryName} category`} query={{ category: categoryName }} />
    </div>
  );
};

export default CategoryIdeas;
