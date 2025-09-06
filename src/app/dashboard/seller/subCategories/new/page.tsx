import SubCategoryDetails from "@/components/dashboard/forms/subCategory-details";
import { getAllCategories } from "@/queries/category";

// Force dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic';

export default async function SellerNewSubCategoryPage() {
  const categories = await getAllCategories();
  return <SubCategoryDetails categories={categories} />;
}
