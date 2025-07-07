"use server";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

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
      throw new Error("Please provide category data.");
    }

    // Destructure the received data
    const { id, name, url, image, featured } = category;

    // Validate required fields
    if (!name || name.trim() === '') {
      throw new Error("Category name is required.");
    }
    
    if (!url || url.trim() === '') {
      throw new Error("Category URL is required.");
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

    console.log("Category upserted successfully:", categoryDetails);
    return categoryDetails;
  } catch (error) {
    console.error("Error in upsertCategory:", error);
    throw error;
  }
};