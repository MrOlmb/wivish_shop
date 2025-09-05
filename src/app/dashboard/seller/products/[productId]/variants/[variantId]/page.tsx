// Product details form
import ProductDetails from "@/components/dashboard/forms/product-details";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Queries
import { getAllCategories } from "@/queries/category";
import { getAllOfferTags } from "@/queries/offer-tag";
import { getProductVariant } from "@/queries/product";

export default async function ProductVariantPage({
  params,
}: {
  params: { productId: string; variantId: string };
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
  const { productId, variantId } = params;
  const productDetails = await getProductVariant(productId, variantId);
  if (!productDetails) return;
  const newDetails = {
    ...ProductDetails,
    variantDescription: productDetails.variantDescription ?? undefined,
  };
  const countries = await db.country.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <ProductDetails
        categories={categories}
        offerTags={offerTags}
        storeId={store.id}
        data={newDetails}
        countries={countries}
      />
    </div>
  );
}
