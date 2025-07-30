import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import StoreDetails from "@/components/dashboard/forms/store-details";

interface SellerStoreSettingsPageProps {
  params: {
    storeUrl: string;
  };
}

export default async function SellerStoreSettingsPage({ params }: SellerStoreSettingsPageProps) {
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

  return (
    <div>
      <StoreDetails initialData={store} />
    </div>
  );
}