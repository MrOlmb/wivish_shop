// Product Details form
import ProductDetails from "@/components/dashboard/forms/product-details";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Queries
import { getAllCategories } from "@/queries/category";
import { getAllOfferTags } from "@/queries/offer-tag";
import { getProductMainInfo } from "@/queries/product";

export default async function SellerNewProductVariantPage({
  params,
}: {
  params: { productId: string };
}) {
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
  const product = await getProductMainInfo(params.productId);
  if (!product) return null;
  const countries = await db.country.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div>
      <ProductDetails
        categories={categories}
        storeId={store.id}
        data={product}
        offerTags={offerTags}
        countries={countries}
      />
    </div>
  );
}
