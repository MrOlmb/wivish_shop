// React, Next.js
import { FC } from "react";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// Custom Ui Components
import Logo from "@/components/shared/logo";
import UserInfo from "./user-info";
import SidebarNavAdmin from "./nav-admin";
import SidebarNavSeller from "./nav-seller";

// Menu links
import {
  SellerDashboardSidebarOptions,
  adminDashboardSidebarOptions,
} from "@/constants/data";


interface SidebarProps {
  isAdmin?: boolean;
}

const Sidebar: FC<SidebarProps> = async ({ isAdmin }) => {
  const user = await currentUser();
  return (
    <div className="w-[300px] border-r h-screen fixed top-0 left-0 bottom-0 bg-white flex flex-col">
      <div className="p-4 flex-shrink-0">
        <Logo width="100%" height="100px" />
      </div>
      <div className="px-4 pb-4 flex-shrink-0">
        {user && <UserInfo user={user} />}
      </div>
      <div className="flex-1 px-4 pb-4">
        {isAdmin ? (
          <SidebarNavAdmin menuLinks={adminDashboardSidebarOptions} />
        ) : (
          <SidebarNavSeller menuLinks={SellerDashboardSidebarOptions} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
