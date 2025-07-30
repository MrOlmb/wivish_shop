// import { ShippingFeeMethod } from "@prisma/client";
import * as z from "zod";

// Catgeory form schema
export const CategoryFormSchema = z.object({
  name: z
    .string({
      required_error: "Category name is required.",
      invalid_type_error: "Category name must be a string.",
    })
    .min(2, { message: "Category name must be at least 2 characters long." })
    .max(50, { message: "Category name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z0-9\s'&-]+$/, {
      message:
        "Only letters, numbers, and spaces are allowed in the category name.",
    }),
  image: z
    .object({
      url: z.string(),
    })
    .array()
    .length(1, "Choose a category image."),
  url: z
    .string({
      required_error: "Category url is required",
      invalid_type_error: "Category url must be a string",
    })
    .min(2, { message: "Category url must be at least 2 characters long." })
    .max(50, { message: "Category url cannot exceed 50 characters." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Only letters, numbers, hyphen, and underscore are allowed in the category url, and consecutive occurrences of hyphens, underscores, or spaces are not permitted.",
    }),
  featured: z.boolean().default(false),
});

// Refactored SubCategory schema
export const SubCategoryFormSchema = z.object({
  name: z
    .string({
      required_error: "Le nom de sous-categorie est requis.",
      invalid_type_error: "Le nom de sous-categorie doit etre une chaine de charactere.",
    })
    .min(2, { message: "Le nom doit contenir au moins 02 characteres." })
    .max(50, { message: "Le nom ne peut depasser 50 characteres." })
    .regex(/^[a-zA-Z0-9\s'&-]+$/, {
      message:
        "Seuls les lettres, les chiffres, et les espaces sont permis dans le nom.",
    }),
  image: z
    .object({
      url: z.string(),
    })
    .array()
    .length(1, "Choisissez une image."),
  url: z
    .string({
      required_error: "L'url de la sous-categorie est requis",
      invalid_type_error: "L'url de la sous-categorie doit etre une chaine de characteres.",
    })
    .min(2, { message: "L'url doit contenir au moins 02 characteres." })
    .max(50, { message: "L'url ne peut exceder 50 characteres." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Seuls les lettres, les chiffres, les tirets, et les traits de huit sont acceptes dans l'url de sous-categorie; Les tirets, traits de huits, et espacas consecutifs ne sont pas autorises.",
    }),
  categoryId:z.string().uuid(),
  featured: z.boolean().default(false),
});



// Store schema avec messages en français
export const StoreFormSchema = z.object({
  name: z
    .string({
      required_error: "Le nom du magasin est requis",
      invalid_type_error: "Le nom du magasin doit être une chaîne de caractères",
    })
    .min(2, { message: "Le nom du magasin doit contenir au moins 2 caractères." })
    .max(50, { message: "Le nom du magasin ne peut pas dépasser 50 caractères." })
    .regex(/^(?!.*(?:[-_& ]){2,})[a-zA-Z0-9_ &-]+$/, {
      message:
        "Seuls les lettres, chiffres, espaces, tirets et traits de soulignement sont autorisés dans le nom du magasin, sans caractères consécutifs.",
    }),
  description: z
    .string({
      required_error: "La description du magasin est requise",
      invalid_type_error: "La description du magasin doit être une chaîne de caractères",
    })
    .min(30, {
      message: "La description du magasin doit contenir au moins 30 caractères.",
    })
    .max(500, { message: "La description du magasin ne peut pas dépasser 500 caractères." }),
  email: z
    .string({
      required_error: "L'email du magasin est requis",
      invalid_type_error: "L'email du magasin doit être une chaîne de caractères",
    })
    .email({ message: "Format d'email invalide." }),
  phone: z
    .string({
      required_error: "Le numéro de téléphone du magasin est requis",
      invalid_type_error: "Le numéro de téléphone du magasin doit être une chaîne de caractères",
    })
    .regex(/^\+?\d+$/, { message: "Format de numéro de téléphone invalide." }),
  logo: z.object({ url: z.string() }).array().length(1, "Choisissez une image de logo."),
  cover: z
    .object({ url: z.string() })
    .array()
    .length(1, "Choisissez une image de couverture."),
  url: z
    .string({
      required_error: "L'URL du magasin est requise",
      invalid_type_error: "L'URL du magasin doit être une chaîne de caractères",
    })
    .min(2, { message: "L'URL du magasin doit contenir au moins 2 caractères." })
    .max(50, { message: "L'URL du magasin ne peut pas dépasser 50 caractères." })
    .regex(/^(?!.*(?:[-_ ]){2,})[a-zA-Z0-9_-]+$/, {
      message:
        "Seuls les lettres, chiffres, tirets et traits de soulignement sont autorisés dans l'URL du magasin, sans caractères consécutifs.",
    }),
  featured: z.boolean().default(false).optional(),
  status: z.string().default("PENDING").optional(),
});

// Product schema avec messages en français - version simplifiee
export const ProductFormSchema = z.object({
  name: z
    .string({
      required_error: "Le nom du produit est requis.",
      invalid_type_error: "Le nom du produit doit être une chaîne de caractères.",
    })
    .min(2, { message: "Le nom du produit doit contenir au moins 2 caractères." })
    .max(200, { message: "Le nom du produit ne peut pas dépasser 200 caractères." }),
  description: z
    .string({
      required_error: "La description du produit est requise.",
      invalid_type_error: "La description du produit doit être une chaîne de caractères.",
    })
    .min(50, {
      message: "La description du produit doit contenir au moins 50 caractères.",
    }),
  variantName: z
    .string({
      required_error: "Le nom de la variante est requis.",
      invalid_type_error: "Le nom de la variante doit être une chaîne de caractères.",
    })
    .min(2, {
      message: "Le nom de la variante doit contenir au moins 2 caractères.",
    })
    .max(100, {
      message: "Le nom de la variante ne peut pas dépasser 100 caractères.",
    }),
  variantDescription: z
    .string({
      invalid_type_error: "La description de la variante doit être une chaîne de caractères.",
    })
    .optional(),
  images: z
    .object({ url: z.string() })
    .array()
    .min(3, "Veuillez télécharger au moins 3 images pour le produit.")
    .max(6, "Vous pouvez télécharger jusqu'à 6 images pour le produit."),
  variantImage: z
    .object({ url: z.string() })
    .array()
    .length(1, "Choisissez une image pour la variante du produit."),
  categoryId: z
    .string({
      required_error: "La catégorie du produit est requise.",
      invalid_type_error: "L'ID de catégorie doit être un UUID valide.",
    })
    .uuid("L'ID de catégorie doit être un UUID valide."),
  subCategoryId: z
    .string({
      required_error: "La sous-catégorie du produit est requise.",
      invalid_type_error: "L'ID de sous-catégorie doit être un UUID valide.",
    })
    .uuid("L'ID de sous-catégorie doit être un UUID valide."),
  brand: z
    .string({
      required_error: "La marque du produit est requise.",
      invalid_type_error: "La marque du produit doit être une chaîne de caractères.",
    })
    .min(2, {
      message: "La marque du produit doit contenir au moins 2 caractères.",
    })
    .max(50, {
      message: "La marque du produit ne peut pas dépasser 50 caractères.",
    }),
  sku: z
    .string({
      required_error: "Le SKU du produit est requis.",
      invalid_type_error: "Le SKU du produit doit être une chaîne de caractères.",
    })
    .min(6, {
      message: "Le SKU du produit doit contenir au moins 6 caractères.",
    })
    .max(50, {
      message: "Le SKU du produit ne peut pas dépasser 50 caractères.",
    }),
  weight: z.number({
    required_error: "Le poids du produit est requis.",
    invalid_type_error: "Le poids doit être un nombre.",
  }).min(0.01, {
    message: "Veuillez fournir un poids de produit valide.",
  }),
  colors: z
    .object({ color: z.string() })
    .array()
    .min(1, "Veuillez fournir au moins une couleur.")
    .refine((colors) => colors.every((c) => c.color.length > 0), {
      message: "Tous les champs de couleur doivent être remplis.",
    }),
  sizes: z
    .object({
      size: z.string(),
      quantity: z
        .number()
        .min(1, { message: "La quantité doit être supérieure à 0." }),
      price: z.number().min(0.01, { message: "Le prix doit être supérieur à 0." }),
      discount: z.number().min(0).default(0),
    })
    .array()
    .min(1, "Veuillez fournir au moins une taille.")
    .refine(
      (sizes) =>
        sizes.every((s) => s.size.length > 0 && s.price > 0 && s.quantity > 0),
      {
        message: "Tous les champs de taille doivent être correctement remplis.",
      }
    ),
  product_specs: z
    .object({
      name: z.string(),
      value: z.string(),
    })
    .array()
    .min(1, "Veuillez fournir au moins une spécification de produit.")
    .refine(
      (product_specs) =>
        product_specs.every((s) => s.name.length > 0 && s.value.length > 0),
      {
        message: "Tous les champs de spécifications du produit doivent être correctement remplis.",
      }
    ),
  variant_specs: z
    .object({
      name: z.string(),
      value: z.string(),
    })
    .array()
    .min(1, "Veuillez fournir au moins une spécification de variante.")
    .refine(
      (variant_specs) =>
        variant_specs.every((s) => s.name.length > 0 && s.value.length > 0),
      {
        message: "Tous les champs de spécifications de variante doivent être correctement remplis.",
      }
    ),
  freeShippingForAllCountries: z.boolean().default(false),
  shippingFeeMethod: z.enum(["ITEM", "KG", "FIXED"]).default("ITEM"),
});