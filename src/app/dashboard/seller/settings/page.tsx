// DB
import StoreDetails from "@/components/dashboard/forms/store-details";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import StoreDefaultShippingDetails from "@/components/dashboard/forms/store-default-shipping-details";
import StoreShippingRates from "@/components/dashboard/forms/shippingRate-details";

export default async function SellerSettingsPage() {
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

  const countries = await db.country.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="w-full flex flex-col gap-10">
      <StoreDetails data={store} storeId={store.id} />
      <StoreDefaultShippingDetails storeId={store.id} />
      <StoreShippingRates storeId={store.id} countries={countries} />
    </div>
  );
}
