// Import React and Next.js
import { ReactNode } from "react";

// Custom UI components
import Header from "@/components/dashboard/header/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";

// Clerk
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

// Constants
import { SellerDashboardSidebarOptions } from "@/constants/data";

export default async function SellerStoreDashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeUrl: string };
}) {
  // Check if the user is authenticated, redirect to the homepage if not authenticated.
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  // Check if user has SELLER role
  if (user.privateMetadata.role !== "SELLER") {
    redirect("/");
  }

  // Verify store ownership
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
    <div className="h-full">
      <Header />
      <div className="flex mt-16">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0 mt-16">
          <Sidebar menuLinks={SellerDashboardSidebarOptions} />
        </div>
        {/* Main content */}
        <main className="md:pl-64 w-full">
          <div className="p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
