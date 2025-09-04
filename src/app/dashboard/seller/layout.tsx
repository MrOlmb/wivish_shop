// React,Next.js
import { ReactNode } from "react";
import { redirect } from "next/navigation";

// Custom UI Components
import Header from "@/components/dashboard/header/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

export default async function SellerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Fetch the current user. If the user is not authenticated, redirect them to the home page.
  const user = await currentUser();
  if (!user) {
    redirect("/");
    return; // Ensure no further code is executed after redirect
  }

  // Block non sellers from accessing the seller dashboard
  if (user?.privateMetadata.role !== "SELLER") redirect("/");

  return (
    <div className="h-full w-full flex">
      <Sidebar />
      <div className="w-full ml-[300px]">
        <Header />
        <div className="w-full mt-[75px] p-4">{children}</div>
      </div>
    </div>
  );
}
