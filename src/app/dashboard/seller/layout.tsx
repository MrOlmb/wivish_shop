import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

// Components
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import Header from "@/components/dashboard/header/header";

// Constants
import { SellerDashboardSidebarOptions } from "@/constants/data";

export default async function SellerDashboardLayout({ children }: { children: ReactNode; }) {

    // Block regular users from accessing the seller dashboard
    const user = await currentUser();

    if((user?.privateMetadata.role !== "SELLER")){
        redirect("/"); //Check for the correct role and redirect if need be
    }

    return (
        <div className="h-full">
            <Header />
            <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
                <Sidebar menuLinks={SellerDashboardSidebarOptions} />
            </div>
            <main className="md:pl-20 pt-16">
                {children}
            </main>
        </div>
    );
}