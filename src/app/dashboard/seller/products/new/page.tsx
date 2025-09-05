import ProductDetails from "@/components/dashboard/forms/product-details";
import { db } from "@/lib/db";
import { getAllCategories } from "@/queries/category";
import { getAllOfferTags } from "@/queries/offer-tag";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SellerNewProductPage() {
  // Fetch the current user
  const user = await currentUser();
  if (!user) {
    redirect("/");
    return;
  }

  // Get the user's store
  const store = await db.store.findFirst({
    where: { userId: user.id },
  });

  if (!store) {
    redirect("/dashboard/seller");
    return;
  }

  const categories = await getAllCategories();
  const offerTags = await getAllOfferTags();
  const countries = await db.country.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="w-full">
      <ProductDetails
        categories={categories}
        storeId={store.id}
        offerTags={offerTags}
        countries={countries}
      />
    </div>
  );
}
