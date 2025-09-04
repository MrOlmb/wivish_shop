import CouponDetails from "@/components/dashboard/forms/coupon-details";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SellerNewCouponPage() {
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

  return (
    <div className="w-full">
      <CouponDetails storeId={store.id} />
    </div>
  );
}
