// Data Table
import CategoryDetails from "@/components/dashboard/forms/category-details";
import DataTable from "@/components/ui/data-table";
// Queries
import { getAllCategories } from "@/queries/category";
import { Plus } from "lucide-react";
// React import
import React from "react";
import { columns } from "./columns";

export default async function AdminCategoriesPage() {
  // Fetching stores data from the database
  const categories = await getAllCategories();

  // Checking if no categories are found
  if (!categories) return null; // If no categories are found return null;
  
  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Creer une categorie
        </>
      }
      modalChildren={<CategoryDetails />}
      newTabLink="/dashboard/admin/categories/new"
      filterValue="name"
      data={categories}
      searchPlaceholder="Rechercher par nom..."
      columns={columns}
    />
  );
}
