// Next.js
import { redirect } from "next/navigation";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// DB
import { db } from "@/lib/db";

export default async function AdminDashboardPage() {
  // Fetch the current user. If the user is not authenticated, redirect them to the home page.
  const user = await currentUser();
  if (!user) {
    redirect("/");
    return;
  }

  // Get store stats
  const totalStores = await db.store.count();
  const totalProducts = await db.product.count();
  const totalCategories = await db.category.count();
  const totalUsers = await db.user.count();
  const totalOrders = await db.orderGroup.count();

  // Get the main store for admin to manage
  const mainStore = await db.store.findFirst({
    where: { userId: user.id },
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your e-commerce platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Stores</h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">{totalStores}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">{totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Categories</h3>
          <p className="text-2xl font-bold text-purple-600 mt-2">{totalCategories}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold text-orange-600 mt-2">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold text-red-600 mt-2">{totalOrders}</p>
        </div>
      </div>

      {/* Main Store Management */}
      {mainStore && (
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Store: {mainStore.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-green-600">{mainStore.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{mainStore.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{mainStore.phone}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Description</p>
            <p className="text-gray-700">{mainStore.description}</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="/dashboard/admin/stores" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-gray-900">Manage Stores</h3>
            <p className="text-sm text-gray-600 mt-1">View and manage all stores</p>
          </a>
          <a 
            href="/dashboard/admin/categories" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-gray-900">Manage Categories</h3>
            <p className="text-sm text-gray-600 mt-1">Create and edit categories</p>
          </a>
          <a 
            href="/dashboard/admin/subCategories" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-gray-900">Manage Sub-Categories</h3>
            <p className="text-sm text-gray-600 mt-1">Create and edit subcategories</p>
          </a>
        </div>
      </div>
    </div>
  );
}
