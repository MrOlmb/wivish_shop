// Queries
import { getAllStoreProducts } from "@/queries/product";
import DataTable from "@/components/ui/data-table";
import { columns } from "./columns";
import { Plus } from "lucide-react";
import ProductDetails from "@/components/dashboard/forms/product-details";
import { getAllCategories } from "@/queries/category";
import { getAllOfferTags } from "@/queries/offer-tag";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function SellerProductsPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
    return;
  }

  // Get the user's store
  const store = await db.store.findUnique({
    where: { userId: user.id },
  });

  if (!store) {
    redirect("/dashboard/seller");
    return;
  }

  const products = await getAllStoreProducts(store.id);

  const categories = await getAllCategories();
  const offerTags = await getAllOfferTags();
  const countries = await db.country.findMany();

  return (
    <div>
      <DataTable
        actionButtonText={
          <>
            <Plus size={15} />
            Create product
          </>
        }
        modalChildren={
          <ProductDetails
            categories={categories}
            offerTags={offerTags}
            storeId={store.id}
            countries={countries}
          />
        }
        newTabLink={`/dashboard/seller/products/new`}
        filterValue="name"
        data={products}
        columns={columns}
        searchPlaceholder="Search product ..."
      />
    </div>
  );
}
