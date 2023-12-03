import React from "react";
import CategoryPageJumbotron from "./components/Jumbotron";
import { NextPage } from "next";
import CategoryIdeas from "./components/category-ideas";
import CategoryDetails from "./components/category-details";

const CategoryPage: NextPage<any> = (props) => {
  const categoryName = props.params["category-name"];
  return (
    <div className=" bg-white pb-32">
      <CategoryPageJumbotron categoryName={categoryName} />
      <CategoryIdeas categoryName={categoryName} />
      <CategoryDetails categoryName={categoryName} />
    </div>
  );
};

export default CategoryPage;
