// Queries
import DataTable from "@/components/ui/data-table";
import { columns } from "./columns";
import { Plus } from "lucide-react";
import { getStoreCoupons } from "@/queries/coupon";
import CouponDetails from "@/components/dashboard/forms/coupon-details";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SellerCouponsPage() {
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

  // Get all store coupons using store ID
  const coupons = await getStoreCoupons(store.id);

  return (
    <div>
      <DataTable
        actionButtonText={
          <>
            <Plus size={15} />
            Create coupon
          </>
        }
        modalChildren={<CouponDetails storeId={store.id} />}
        newTabLink={`/dashboard/seller/coupons/new`}
        filterValue="name"
        data={coupons}
        columns={columns}
        searchPlaceholder="Search coupon ..."
      />
    </div>
  );
}
