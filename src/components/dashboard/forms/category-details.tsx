"use client"

//React FC import
import { FC, useEffect } from "react";

//Prisma model here
import { Category } from "@prisma/client";

//Form handling utility
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
//Schema
import { CategoryFormSchema } from "@/lib/schemas";
//UI Components
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ImageUpload from "../shared/image-upload";

//Function to upsert the categories
import { upsertCategory } from "@/queries/category";
//Utils
import { v4 } from 'uuid'
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CategoryDetailsProps {
  data?: Category;
}

const CategoryDetails: FC<CategoryDetailsProps> = ({ data }) => {
  // Initializing necessary hooks
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: data?.name ?? "",
      image: data?.image ? [{ url: data.image }] : [],
      url: data?.url ?? "",
      featured: data?.featured ?? false,
    }
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name ?? "",
        image: data.image ? [{ url: data.image }] : [],
        url: data.url ?? "",
        featured: data.featured ?? false,
      });
    }
  }, [data, form]);

  const handleSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {
    try {
      console.log("Form values:", values);

      const categoryData = {
        id: data?.id ?? v4(),
        name: values.name,
        image: values.image[0].url,
        url: values.url,
        featured: values.featured,
      };

      console.log("Sending to upsertCategory:", categoryData);

      const response = await upsertCategory(categoryData as Category);

      toast({
        title: data?.id ? "Catégorie mise à jour" : "Catégorie créee avec succès",
      });

      if (data?.id) {
        router.refresh();
      } else {
        router.push('/dashboard/admin/categories');
      }
    } catch (error: any) {
      console.error("Submit error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Une erreur est survenu",
      });
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Information De la Catégorie</CardTitle>
          <CardDescription>
            {data?.id
              ? `Modifier ${data?.name} informations de catégorie.`
              : "Créez une catégorie. Vous pouvez modifier les informations plus tard dans la table des catégories ou dans la page de création des catégories."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                    <FormLabel>Nom de la catégorie</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrer le nom de la categorie" {...field} disabled={isLoading} />
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
                    <FormLabel>URL de la categorie</FormLabel>
                    <FormControl>
                      <Input placeholder="category-url" {...field} disabled={isLoading} />
                    </FormControl>
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
                        Cette categorie apparaitra sur la page d'accueil.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : data?.id ? "Modifier la categorie" : "Creer la categorie"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default CategoryDetails;