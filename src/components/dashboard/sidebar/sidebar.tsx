// Import React
import { FC } from "react";

// Custom UI components
import Logo from "@/components/shared/logo";
import UserInfo from "./user-info";
import SidebarNavAdmin from "./nav-admin";
import SidebarNavSeller from "./nav-seller";

// Menu Links
import { adminDashboardSidebarOptions, SellerDashboardSidebarOptions } from "@/constants/data";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// Prisma models
import { Store } from "@prisma/client";

// Interface defintion
interface SidebarProps{
    isAdmin?: boolean;
    stores?:Store[];
}

const Sidebar: FC<SidebarProps> = async ({isAdmin}) =>{
    const user = await currentUser();
    return <div className="w-[300px] border-r h-screen p-4 flex flex-col gap-2 fixed top-0 left-0 bottom-0">
        <Logo width={"100%"} height={"180px"}/>
        <span className="mt-3"/>
        {user && <UserInfo user={user}/>}
        {
            isAdmin ? <SidebarNavAdmin menuLinks={adminDashboardSidebarOptions}/> : <SidebarNavSeller menuLinks={SellerDashboardSidebarOptions}/>
        }
    </div>
};

export default Sidebar;