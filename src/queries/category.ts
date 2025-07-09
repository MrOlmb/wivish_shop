"use server";

// Clerk
import { clerkClient, currentUser } from "@clerk/nextjs/server";

// Prisma model
import { Category } from "@prisma/client";

// DB
import { db } from "@/lib/db";

export const upsertCategory = async (category: Category) => {
  try {
    console.log("Received category data:", category);

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

    if (!category) {
      throw new Error("Entrez des donnees de categorie s'il vous plait.");
    }

    // Destructure the received data
    const { id, name, url, image, featured } = category;

    // Validate required fields
    if (!name || name.trim() === '') {
      throw new Error("Le nom de Categorie est obligatoire.");
    }
    
    if (!url || url.trim() === '') {
      throw new Error("L'URL de Categorie est obligatoire.");
    }

    // Check for existing category with same name or URL
    const existingCategory = await db.category.findFirst({
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

    if (existingCategory) {
      if (existingCategory.name === name.trim()) {
        throw new Error("Une catégorie avec le même nom existe déjà.");
      } else if (existingCategory.url === url.trim()) {
        throw new Error("Une catégorie avec la même URL existe déjà.");
      }
    }

    // Upsert category into the database
    const categoryDetails = await db.category.upsert({
      where: { id },
      update: {
        name: name.trim(),
        url: url.trim(),
        image,
        featured,
      },
      create: {
        id,
        name: name.trim(),
        url: url.trim(),
        image,
        featured,
      },
    });

    console.log("Categorie modifié avec succes:", categoryDetails);
    return categoryDetails;
  } catch (error) {
    console.error("Erreur durant la modification:", error);
    throw error;
  }
};



// Function: getAllCategories
// Permission level: Public
// Description: Retrieves all categories from the database.
export const getAllCategories = async() => {
  // Retrieve all categories from the database
  const categories = await db.category.findMany({
    orderBy:{
      updatedAt:"desc",
    },
  })
  // Returns: Array of categories sorted by updatedAt date in descending order.
  return categories;
}


// Function: getCategory
// Permission level: Public
// Description: Retrieves a specific category from the database.
// Parameters:
//   - categoryID: The id of the category to be retrieved.
// Returns: Details of the requested category.

export const getCategory = async(categoryId:string)=>{
  
  // Ensure categoryId is provided
  if(!categoryId) throw new Error("Entrer un ID de categorie s'il vous plait");

  // Retrieve category
  const category= await db.category.findUnique({
    where:{
      id:categoryId,
    }
  });
  
  return category;
}
  

// Function: deleteCategory
// Permission level: Admin
// Description: Deletes a specific category from the database.
// Parameters:
//   - categoryID: The id of the category to be deleted.
// Returns: A respomse indicating success or failure to delete selected category.

export const deleteCategory = async(categoryId:string)=>{
  // Make sure a categoryId is given
  if(!categoryId) throw new Error("Entrer un ID de categorie s'il vous plait");

  // Get current user
  const user = await currentUser();

  // Check if user is authenticated
  if(!user) throw new Error('Utilisateur non authentifie') ;

  // Verify admin permission
  if(user.privateMetadata.role !== "ADMIN")
    throw new Error(
  "Access Non Autorise: Privileges d'Administrateur requis.")

  // Retrieve category
  const response= await db.category.delete({
    where:{
      id:categoryId,
    }
  });
  
  return response;
}
