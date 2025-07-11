import React from "react";
import SubCategoryDetails from "@/components/dashboard/forms/subCategory-details";
import { getAllCategories } from "@/queries/category";

export default async function AdminNewSubCategory() {
  const categories = await getAllCategories()
  return (
    <div><SubCategoryDetails categories={categories}/></div>
  );
}

