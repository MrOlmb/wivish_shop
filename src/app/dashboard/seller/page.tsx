// NextJs helper libraries
import { redirect } from "next/navigation";

// Clerk currentUser helper function 
import { currentUser } from "@clerk/nextjs/server";

// DB
import { db } from "@/lib/db";

export default async function SellerDashboardPage() {

  // Fetch the current user and if not authenticated redirect to the front page 
  const user = await currentUser();
  if(!user){
    redirect("/");
    return; // Ensure no further code is executed after the redirect
  }

  // Retrieves the list of stores associated with an authenticated user
  const stores = await db.store?.findMany({
    where:{
      userId:user.id,
    }
  })

  // If the user has no store , redirects them to the appropriate page to create a new store
  if(!stores){
    redirect("/dashboard/seller/stores/new")
    return;
  }else if(stores.length){ // if the user has stores , redirect them to the dashboard of their main store
    redirect(`/dashboard/seller/stores/${stores[0].url}`)
  }

  return (
      <div>Seller Dashboard</div>
    );
  }