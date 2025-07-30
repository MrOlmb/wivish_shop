import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { db } from "./db"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate unique slug for products or variants
export async function generateUniqueSlug(baseSlug: string, type: "product" | "variant"): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    // Check if slug exists in database
    let existingRecord;
    
    if (type === "product") {
      existingRecord = await db.product.findUnique({
        where: { slug },
      });
    } else {
      existingRecord = await db.productVariant.findUnique({
        where: { slug },
      });
    }

    // If slug doesn't exist, return it
    if (!existingRecord) {
      return slug;
    }

    // If it exists, try with counter
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}
