// Queries
import DataTable from "@/components/ui/data-table";
import { columns } from "./columns";
import { getStoreOrders } from "@/queries/store";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function SellerOrdersPage() {
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

  const orders = await getStoreOrders(store.id);

  return (
    <div>
      <DataTable
        filterValue="name"
        data={orders}
        columns={columns}
        searchPlaceholder="Search order ..."
      />
    </div>
  );
}
