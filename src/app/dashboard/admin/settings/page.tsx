// Next.js
import { redirect } from "next/navigation";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// DB
import { db } from "@/lib/db";

// Components
import StoreDetails from "@/components/dashboard/forms/store-details";

export default async function AdminStoreSettingsPage() {
  // Fetch the current user
  const user = await currentUser();
  if (!user) {
    redirect("/");
    return;
  }

  // Get the main store for admin to manage
  const mainStore = await db.store.findFirst({
    where: { userId: user.id },
  });

  if (!mainStore) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto text-center">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4">No Store Found</h2>
          <p className="text-yellow-700">
            No store is currently assigned to your admin account. Please run the seeding script or create a store manually.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Store Settings</h1>
        <p className="text-gray-600 mt-2">Manage your store information, branding, and settings</p>
      </div>
      
      <StoreDetails data={mainStore} storeId={mainStore.id} />
    </div>
  );
}