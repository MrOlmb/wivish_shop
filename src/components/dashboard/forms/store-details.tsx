"use client";

// React, Next.js
import { useState } from "react";
import { useRouter } from "next/navigation";

// React Hook Form
import { useForm } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";

// Custom Components
import ImageUpload from "@/components/dashboard/shared/image-upload";

// Schemas
import { StoreFormSchema } from "@/lib/schemas";

// Queries
import { upsertStore } from "@/queries/store";

// Toast
import { toast } from "sonner"; 

// Prisma types
import { Store } from "@prisma/client";

interface StoreDetailsProps {
  initialData?: Store | null;
}

type StoreFormValues = z.infer<typeof StoreFormSchema>;

export default function StoreDetails({ initialData }: StoreDetailsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(StoreFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      url: initialData?.url || "",
      logo: initialData?.logo ? [{ url: initialData.logo }] : [],
      cover: initialData?.cover ? [{ url: initialData.cover }] : [],
      featured: initialData?.featured || false,
    },
  });

  const onSubmit = async (values: StoreFormValues) => {
    try {
      setLoading(true);

      const storeData = {
        id: initialData?.id || crypto.randomUUID(),
        name: values.name,
        description: values.description,
        email: values.email,
        phone: values.phone,
        url: values.url,
        logo: values.logo[0]?.url || "",
        cover: values.cover[0]?.url || "",
        featured: values.featured || false,
        status: initialData?.status || "PENDING",
      };

      const result = await upsertStore(storeData);

      if (result) {
        toast.success(
          initialData 
            ? "Magasin mis à jour avec succès!" 
            : "Magasin créé avec succès!"
        );
        
        if (!initialData) {
          router.push(`/dashboard/seller/stores/${result.url}`);
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {initialData ? "Modifier le magasin" : "Créer un nouveau magasin"}
        </h1>
        <p className="text-gray-600 mt-2">
          {initialData 
            ? "Mettez à jour les informations de votre magasin" 
            : "Remplissez les informations pour créer votre magasin"
          }
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo Upload */}
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo du magasin *</FormLabel>
                <FormControl>
                  <ImageUpload
                    type="profile"
                    value={field.value ? field.value.map((image) => image.url) : []}
                    disabled={loading}
                    onChange={(url) => {
                      field.onChange([{ url }]);
                    }}
                    onRemove={() => field.onChange([])}
                    error={!!form.formState.errors.logo}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Upload */}
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image de couverture *</FormLabel>
                <FormControl>
                  <ImageUpload
                    type="cover"
                    value={field.value ? field.value.map((image) => image.url) : []}
                    disabled={loading}
                    onChange={(url) => {
                      field.onChange([{ url }]);
                    }}
                    onRemove={() => field.onChange([])}
                    error={!!form.formState.errors.cover}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Store Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du magasin *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Entrez le nom de votre magasin"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Store URL */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL du magasin *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="url-de-votre-magasin"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Store Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email du magasin *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="email"
                      placeholder="contact@votre-magasin.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Store Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone du magasin *</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="+33123456789"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Store Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description du magasin *</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Décrivez votre magasin, vos produits et services..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Featured checkbox - only show for admins or when editing */}
          {initialData && (
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Magasin en vedette</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Ce magasin apparaîtra dans la section des magasins en vedette
                    </p>
                  </div>
                </FormItem>
              )}
            />
          )}

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
              {loading ? "Enregistrement..." : (initialData ? "Mettre à jour" : "Créer le magasin")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}