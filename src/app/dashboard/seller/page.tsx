// Next.js
import { redirect } from "next/navigation";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// DB
import { db } from "@/lib/db";

export default async function SellerDashboardPage() {
  // Fetch the current user. If the user is not authenticated, redirect them to the home page.
  const user = await currentUser();
  if (!user) {
    redirect("/");
    return; // Ensure no further code is executed after redirect
  }

  // Get the user's single store
  const store = await db.store.findUnique({
    where: { userId: user.id },
  });

  if (!store) {
    redirect("/");
    return;
  }

  // Get counts separately to avoid TypeScript issues
  const totalProducts = await db.product.count({
    where: { storeId: store.id }
  });

  const totalOrders = await db.orderGroup.count({
    where: { storeId: store.id }
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back to {store.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Store Status</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{store.status}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Rating</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{store.averageRating.toFixed(1)}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="/dashboard/seller/products/new" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-gray-900">Add Product</h3>
            <p className="text-sm text-gray-600 mt-1">Create a new product</p>
          </a>
          <a 
            href="/dashboard/seller/categories/new" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-gray-900">Add Category</h3>
            <p className="text-sm text-gray-600 mt-1">Create a new category</p>
          </a>
          <a 
            href="/dashboard/seller/orders" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-gray-900">View Orders</h3>
            <p className="text-sm text-gray-600 mt-1">Manage your orders</p>
          </a>
        </div>
      </div>
    </div>
  );
}
