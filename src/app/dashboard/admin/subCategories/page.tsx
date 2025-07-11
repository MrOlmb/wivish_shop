// Database Queries
import { getAllCategories } from "@/queries/category";
import { getAllSubCategories } from "@/queries/subCategory";

// Form import for the subcategories
import SubCategoryDetails from "@/components/dashboard/forms/subCategory-details";

// Data table component from shadcn
import DataTable from "@/components/ui/data-table";

// Plus icon for the create more button
import { Plus } from "lucide-react";
import { columns } from "./columns";

// Initializing am asynchronous function (Because of database queries)
export default async function AdminSubCategoriesPage() {
  
  // Fetching subcategories from the database
  const subCategories = await getAllSubCategories();
  if(!subCategories) return null; // if no subcategories are found return null

  // Fetching category data from the database
  const categories = await getAllCategories();
  if(!categories) return null; // if no categoies are found return null
  
  return (
    <DataTable
          actionButtonText={
            <>
              <Plus size={15} />
              Creer une sous-categorie
            </>
          }
          modalChildren={<SubCategoryDetails categories={categories}/>}
          newTabLink="/dashboard/admin/subCategories/new"
          filterValue="name"
          data={subCategories}
          searchPlaceholder="Rechercher par nom..."
          columns={columns}
        />
  );
}