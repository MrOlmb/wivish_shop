"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// UI Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Custom Components
import ImageUpload from "@/components/dashboard/shared/image-upload";

// Icons
import { Plus, Trash2, Package } from "lucide-react";

// Schemas & Types
import { ProductFormSchema } from "@/lib/schemas";

// Queries
import { createProduct } from "@/queries/product";

// Toast
import { toast } from "sonner";

// Prisma types
import { Category, SubCategory } from "@prisma/client";

type ProductFormValues = z.infer<typeof ProductFormSchema>;

interface ProductDetailsProps {
  categories: Category[];
  subCategories: SubCategory[];
  storeId: string;
}

export default function ProductDetails({ categories, subCategories, storeId }: ProductDetailsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);
  const [productImages, setProductImages] = useState<{url: string}[]>([]);
  const [variantImages, setVariantImages] = useState<{url: string}[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      name: "",
      description: "",
      variantName: "",
      variantDescription: "",
      images: [],
      variantImage: [],
      categoryId: "",
      subCategoryId: "",
      brand: "",
      sku: "",
      weight: 0,
      colors: [{ color: "" }],
      sizes: [{ size: "", quantity: 1, price: 0, discount: 0 }],
      product_specs: [{ name: "", value: "" }],
      variant_specs: [{ name: "", value: "" }],
      freeShippingForAllCountries: false,
      shippingFeeMethod: "ITEM",
    },
  });

  const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
    control: form.control,
    name: "colors",
  });

  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
    control: form.control,
    name: "sizes",
  });

  const { fields: productSpecFields, append: appendProductSpec, remove: removeProductSpec } = useFieldArray({
    control: form.control,
    name: "product_specs",
  });

  const { fields: variantSpecFields, append: appendVariantSpec, remove: removeVariantSpec } = useFieldArray({
    control: form.control,
    name: "variant_specs",
  });

  // Sync image states with form
  useEffect(() => {
    form.setValue("images", productImages);
    form.trigger("images");
  }, [productImages, form]);

  useEffect(() => {
    form.setValue("variantImage", variantImages);
    form.trigger("variantImage");
  }, [variantImages, form]);

  // Filter subcategories based on selected category
  useEffect(() => {
    const categoryId = form.watch("categoryId");
    if (categoryId) {
      const filtered = subCategories.filter(sub => sub.categoryId === categoryId);
      setFilteredSubCategories(filtered);
      // Reset subcategory if it doesn't belong to selected category
      const currentSubCategoryId = form.getValues("subCategoryId");
      if (currentSubCategoryId && !filtered.find(sub => sub.id === currentSubCategoryId)) {
        form.setValue("subCategoryId", "");
      }
    } else {
      setFilteredSubCategories([]);
      form.setValue("subCategoryId", "");
    }
  }, [form.watch("categoryId"), subCategories, form]);

  const onSubmit = async (values: ProductFormValues) => {
    try {
      setLoading(true);

      const productData = {
        ...values,
        storeId,
      };

      console.log("Creating product with data:", productData);
      
      const result = await createProduct(productData);
      
      toast.success("Produit créé avec succès!");
      router.push(`/dashboard/seller/stores/${storeId}/products`);
    } catch (error: any) {
      console.error("Product creation error:", error);
      toast.error(error.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-2">
        <Package className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Créer un nouveau produit</h1>
      </div>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Basic Product Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de base</CardTitle>
              <CardDescription>
                Informations principales du produit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du produit *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nom du produit"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marque *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Marque du produit"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description du produit *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description détaillée du produit..."
                        className="min-h-[120px]"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sous-catégorie *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={loading || !form.watch("categoryId")}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une sous-catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredSubCategories.map((subCategory) => (
                            <SelectItem key={subCategory.id} value={subCategory.id}>
                              {subCategory.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images du produit</CardTitle>
              <CardDescription>
                Téléchargez entre 3 et 6 images pour votre produit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images du produit (3-6 images) * - {field.value ? field.value.length : 0}/6</FormLabel>
                    <FormControl>
                      <ImageUpload
                        type="standard"
                        value={productImages.map((image) => image.url)}
                        disabled={loading || productImages.length >= 6}
                        onChange={(url) => {
                          if (productImages.length < 6) {
                            const newImages = [...productImages, { url }];
                            setProductImages(newImages);
                          }
                        }}
                        onRemove={(url) => {
                          const newImages = productImages.filter((image) => image.url !== url);
                          setProductImages(newImages);
                        }}
                        error={!!form.formState.errors.images}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Product Variant */}
          <Card>
            <CardHeader>
              <CardTitle>Variante du produit</CardTitle>
              <CardDescription>
                Informations sur la variante spécifique du produit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="variantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de la variante *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: Taille Large, Couleur Rouge"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Code produit unique"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="variantDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description de la variante</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description spécifique à cette variante..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poids (kg) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.5"
                          disabled={loading}
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingFeeMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Méthode de calcul livraison</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ITEM">Par article</SelectItem>
                          <SelectItem value="KG">Par kilogramme</SelectItem>
                          <SelectItem value="FIXED">Forfait fixe</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="variantImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image de la variante *</FormLabel>
                    <FormControl>
                      <ImageUpload
                        type="profile"
                        value={variantImages.map((image) => image.url)}
                        disabled={loading}
                        onChange={(url) => {
                          setVariantImages([{ url }]);
                        }}
                        onRemove={() => {
                          setVariantImages([]);
                        }}
                        error={!!form.formState.errors.variantImage}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Couleurs disponibles</CardTitle>
              <CardDescription>
                Ajoutez les couleurs disponibles pour ce produit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {colorFields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name={`colors.${index}.color`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Nom de la couleur"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {colorFields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeColor(index)}
                      disabled={loading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendColor({ color: "" })}
                disabled={loading}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une couleur
              </Button>
            </CardContent>
          </Card>

          {/* Sizes and Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Tailles et prix</CardTitle>
              <CardDescription>
                Configurez les tailles, quantités et prix pour chaque taille
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sizeFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`sizes.${index}.size`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taille</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="S, M, L..."
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`sizes.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantité</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            disabled={loading}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`sizes.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix (€)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            disabled={loading}
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`sizes.${index}.discount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Remise (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            disabled={loading}
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end">
                    {sizeFields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeSize(index)}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendSize({ size: "", quantity: 1, price: 0, discount: 0 })}
                disabled={loading}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une taille
              </Button>
            </CardContent>
          </Card>

          {/* Product Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Spécifications du produit</CardTitle>
              <CardDescription>
                Caractéristiques techniques du produit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {productSpecFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`product_specs.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de la spécification</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: Matériau, Couleur..."
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-2">
                    <FormField
                      control={form.control}
                      name={`product_specs.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Valeur</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ex: Coton, Rouge..."
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {productSpecFields.length > 1 && (
                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeProductSpec(index)}
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendProductSpec({ name: "", value: "" })}
                disabled={loading}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une spécification
              </Button>
            </CardContent>
          </Card>

          {/* Variant Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Spécifications de la variante</CardTitle>
              <CardDescription>
                Caractéristiques spécifiques à cette variante
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {variantSpecFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`variant_specs.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de la spécification</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: Taille exacte, Poids..."
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-2">
                    <FormField
                      control={form.control}
                      name={`variant_specs.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Valeur</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ex: 42cm x 30cm..."
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {variantSpecFields.length > 1 && (
                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeVariantSpec(index)}
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendVariantSpec({ name: "", value: "" })}
                disabled={loading}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une spécification
              </Button>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => router.back()}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer le produit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}