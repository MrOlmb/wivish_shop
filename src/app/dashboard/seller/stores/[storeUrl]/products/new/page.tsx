import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ProductDetails from "@/components/dashboard/forms/product-details";

interface NewProductPageProps {
  params: {
    storeUrl: string;
  };
}

export default async function NewProductPage({ params }: NewProductPageProps) {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  // Get store information
  const store = await db.store.findUnique({
    where: {
      url: params.storeUrl,
      userId: user.id,
    },
  });

  if (!store) {
    redirect("/dashboard/seller");
  }

  // Get categories and subcategories for the form
  const [categories, subCategories] = await Promise.all([
    db.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    db.subCategory.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return (
    <ProductDetails 
      categories={categories}
      subCategories={subCategories}
      storeId={store.id}
    />
  );
}