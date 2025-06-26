import React from "react";
import CategoryDetails from "@/components/dashboard/forms/category-details";

export default function AdminNewCategory() {
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if(!CLOUDINARY_CLOUD_NAME) return null;
  return (
    <div className="w-full">
      <CategoryDetails cloudinary_key={CLOUDINARY_CLOUD_NAME}/>
    </div>
  );
}