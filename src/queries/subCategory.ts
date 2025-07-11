"use server";

// Clerk
import { clerkClient, currentUser } from "@clerk/nextjs/server";

// Prisma model
import { Category, SubCategory } from "@prisma/client";

// DB
import { db } from "@/lib/db";

export const upsertSubCategory = async (subCategory: SubCategory, categoryId:Category) => {
  try {
    console.log("Received subCategory data:", subCategory);

    // Get current user
    const user = await currentUser();

    // Ensure user is authenticated
    if (!user) {
      throw new Error("Utilisateur non authentifié.");
    }

    // Verify admin permission
    if (user.privateMetadata.role !== "ADMIN") {
      throw new Error("Accès non autorisé : Privilèges d'administrateur requis.");
    }

    if (!subCategory) {
      throw new Error("Entrez des donnees de sous-categorie s'il vous plait.");
    }

    // Destructure the received data
    const { id, name, url, image, featured, categoryId } = subCategory;

    // Validate required fields
    if (!name || name.trim() === '') {
      throw new Error("Le nom de sous-Categorie est obligatoire.");
    }
    
    if (!url || url.trim() === '') {
      throw new Error("L'URL de sous-Categorie est obligatoire.");
    }

    // Check for existing subCategory with same name or URL
    const existingSubCategory = await db.subCategory.findFirst({
      where: {
        AND: [
          {
            OR: [{ name: name.trim() }, { url: url.trim() }],
          },
          {
            NOT: { id: id },
          },
        ],
      },
    });

    if (existingSubCategory) {
      if (existingSubCategory.name === name.trim()) {
        throw new Error("Une catégorie avec le même nom existe déjà.");
      } else if (existingSubCategory.url === url.trim()) {
        throw new Error("Une catégorie avec la même URL existe déjà.");
      }
    }

    // Upsert subCategory into the database
    const subCategoryDetails = await db.subCategory.upsert({
      where: { id },
      update: {
        name: name.trim(),
        url: url.trim(),
        image,
        featured,
        categoryId:categoryId
      },
      create: {
        id,
        name: name.trim(),
        url: url.trim(),
        image,
        featured,
        categoryId:categoryId
      },
    });

    console.log("Sous-categorie modifié avec succes:", subCategoryDetails);
    return subCategoryDetails;
  } catch (error) {
    console.error("Erreur durant la modification:", error);
    throw error;
  }
};



// Function: getAllSubCategories
// Permission level: Public
// Description: Retrieves all sous-categories from the database.
export const getAllSubCategories = async() => {
  // Retrieve all sous-categories from the database
  const subCategories = await db.subCategory.findMany({
    include:{
      category:true,
    },
    orderBy:{
      updatedAt:"desc",
    },
  })
  // Returns: Array of sous-categories sorted by updatedAt date in descending order.
  return subCategories;
}


// Function: GetCategory
// Permission level: Public
// Description: Retrieves a specific subCategory from the database.
// Parameters:
//   - subCategoryID: The id of the subCategory to be retrieved.
// Returns: Details of the requested subCategory.

export const getSubCategory = async(subCategoryId:string)=>{

  // Get the current user info
  const user = await currentUser();
  
  // Make sure the user is connected to the platform
  if(!user) throw new Error('Utilisateur non authentifie') ;
  
  // Ensure subCategoryId is provided
  if(!subCategoryId) throw new Error("Entrer un ID de sous-categorie s'il vous plait");

  // Retrieve subCategory
  const subCategory= await db.subCategory.findUnique({
    include:{
      category:true,
    },
    where:{
      id:subCategoryId,
    }
  });
  
  return subCategory;
}
  

// Function: deleteSubCategory
// Permission level: Admin
// Description: Deletes a specific subCategory from the database.
// Parameters:
//   - subCategoryID: The id of the subCategory to be deleted.
// Returns: A respomse indicating success or failure to delete selected subCategory.

export const deleteSubCategory = async(subCategoryId:string)=>{
  // Make sure a subCategoryId is given
  if(!subCategoryId) throw new Error("Entrer un ID de sous-categorie s'il vous plait");

  // Get current user
  const user = await currentUser();

  // Check if user is authenticated
  if(!user) throw new Error('Utilisateur non authentifie') ;

  // Verify admin permission
  if(user.privateMetadata.role !== "ADMIN")
    throw new Error(
  "Access Non Autorise: Privileges d'Administrateur requis.")

  // Retrieve subCategory
  const response= await db.subCategory.delete({
    where:{
      id:subCategoryId,
    }
  });
  
  return response;
}
