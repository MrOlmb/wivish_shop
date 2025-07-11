"use client"

//React FC import
import { FC, useEffect } from "react";

//Prisma model here
import { Category, SubCategory } from "@prisma/client";

//Form handling utility
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
//Schema
import { SubCategoryFormSchema } from "@/lib/schemas";
//UI Components
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ImageUpload from "../shared/image-upload";

//Function to upsert the sous-categories
import { upsertCategory } from "@/queries/category";
//Utils
import { v4 } from 'uuid'
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { upsertSubCategory } from "@/queries/subCategory";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SubCategoryDetailsProps {
  data?: SubCategory;
  categories: Category[]
}

const SubCategoryDetails: FC<SubCategoryDetailsProps> = ({ data, categories }) => {
  // Initializing necessary hooks
  const { toast } = useToast();
  const router = useRouter();


  // Form hook for managing the state and validation

  const form = useForm<z.infer<typeof SubCategoryFormSchema>>({
    resolver: zodResolver(SubCategoryFormSchema),
    defaultValues: {
      name: data?.name ?? "",
      image: data?.image ? [{ url: data.image }] : [],
      url: data?.url ?? "",
      featured: data?.featured ?? false,
      categoryId: data?.categoryId,
    }
  });

  // Loading status based on form submission
  const isLoading = form.formState.isSubmitting;

  const formData= form.watch();
  console.log("formData", formData);


  // Reset form values when data changes
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name ?? "",
        image: data.image ? [{ url: data.image }] : [],
        url: data.url ?? "",
        featured: data.featured ?? false,
        categoryId: data.categoryId
      });
    }
  }, [data, form]);


  // Submit handler for form submission
  const handleSubmit = async (values: z.infer<typeof SubCategoryFormSchema>) => {
    try {
      console.log("Form values:", values);

      // Saving form data in a variable
      const subCategoryData = {
        id: data?.id ?? v4(),
        name: values.name,
        image: values.image[0].url,
        url: values.url,
        featured: values.featured,
        categoryId:values.categoryId,
      };

      console.log("Sending to upsertSubCategory:", subCategoryData);

      // Calling the upsetCategory function with parameters subCategoryData
      const response = await upsertSubCategory(subCategoryData as SubCategory);

      // Displaying success message
      toast({
        title: data?.id ? "Sous-sous-catégorie mise à jour" : "Sous-sous-catégorie créee avec succès",
      });

      // redirect or refresh data
      if (data?.id) {
        router.refresh();
      } else {
        router.push('/dashboard/admin/subCategories');
      }
    } catch (error: any) {
      // handling form submission errors
      console.error("Submit error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Une erreur est survenue",
      });
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Information De la Sous-Catégorie</CardTitle>
          <CardDescription>
            {data?.id
              ? `Modifier ${data?.name} informations de sous-catégorie.`
              : "Créez une sous-catégorie. Vous pouvez modifier les informations plus tard dans la table des sous-catégories ou dans la page de création des sous-catégories."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex justify-center">
                    <FormControl>
                      <ImageUpload
                        type="profile"
                        value={field.value.map((image) => image.url)}
                        disabled={isLoading}
                        onChange={(url) => field.onChange([{ url }])}
                        onRemove={() => field.onChange([])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de la sous-catégorie</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Entrer le nom de la sous-categorie"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de la sous-categorie</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="subcategory-url"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categorie</FormLabel>
                    <Select
                      disabled={isLoading || categories.length == 0}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select a category"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          categories.map((category)=>(
                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>{" "}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        Cette sous-categorie apparaitra sur la page d'accueil.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Loading..."
                  : data?.id
                  ? "Modifier la sous-categorie"
                  : "Creer la sous-categorie"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default SubCategoryDetails;