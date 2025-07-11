import { getAllSubCategories } from "@/queries/subCategory";
import { Prisma } from "@prisma/client";

export interface DashboardSidebarMenuInterface {
    label: string;
    icon: string;
    link: string;
}

// subcategory + parent category
export type SubCategoryWithCategory=Prisma.PromiseReturnType<typeof getAllSubCategories >[0]; 