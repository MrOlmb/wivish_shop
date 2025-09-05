"use client";

// React
import { FC, useEffect } from "react";

// Prisma model
import { Coupon } from "@prisma/client";

// Form handling utilities
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
import { CouponFormSchema } from "@/lib/schemas";

// UI Components
import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Queries
import { upsertCoupon } from "@/queries/coupon";

// Utils
import { v4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { NumberInput } from "@tremor/react";

// Date time picker
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

interface CouponDetailsProps {
  data?: Coupon;
  storeUrl: string;
}

const CouponDetails: FC<CouponDetailsProps> = ({ data, storeUrl }) => {
  // Initializing necessary hooks
  const { toast } = useToast(); // Hook for displaying toast messages
  const router = useRouter(); // Hook for routing

  // Form hook for managing form state and validation
  const form = useForm<z.infer<typeof CouponFormSchema>>({
    mode: "onChange", // Form validation mode
    resolver: zodResolver(CouponFormSchema), // Resolver for form validation
    defaultValues: {
      // Setting default form values from data (if available)
      code: data?.code,
      discount: data?.discount,
      startDate: data?.startDate || format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      endDate: data?.endDate || format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    },
  });

  // Loading status based on form submission
  const isLoading = form.formState.isSubmitting;

  // Reset form values when data changes
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  // Submit handler for form submission
  const handleSubmit = async (values: z.infer<typeof CouponFormSchema>) => {
    try {
      // Upserting category data
      const response = await upsertCoupon(
        {
          id: data?.id ? data.id : v4(),
          code: values.code,
          discount: values.discount,
          startDate: values.startDate,
          endDate: values.endDate,
          storeId: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        storeUrl
      );

      // Displaying success message
      toast({
        title: data?.id
          ? "Le coupon a été mis à jour."
          : `Félicitations! '${response?.code}' est maintenant créé.`,
      });

      // Redirect or Refresh data
      if (data?.id) {
        router.refresh();
      } else {
        router.push(`/dashboard/seller/stores/${storeUrl}/coupons`);
      }
    } catch (error: any) {
      // Handling form submission errors
      toast({
        variant: "destructive",
        title: "Oups!",
        description: error.toString(),
      });
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Informations du coupon</CardTitle>
          <CardDescription>
            {data?.id
              ? `Mettre à jour les informations du coupon ${data?.code}.`
              : " Créons un coupon. Vous pourrez modifier le coupon plus tard depuis le tableau des coupons ou la page du coupon."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                disabled={isLoading}
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Code du coupon</FormLabel>
                    <FormControl>
                      <Input placeholder="Coupon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Remise du coupon</FormLabel>
                    <FormControl>
                      <NumberInput
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder="%"
                        min={1}
                        className="!shadow-none rounded-md !text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de début</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        onChange={(date) => {
                          field.onChange(
                            date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : ""
                          );
                        }}
                        value={field.value ? new Date(field.value) : null}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de fin</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        onChange={(date) => {
                          field.onChange(
                            date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : ""
                          );
                        }}
                        value={field.value ? new Date(field.value) : null}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "chargement..."
                  : data?.id
                  ? "Enregistrer les informations du coupon"
                  : "Créer le coupon"
                }
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default CouponDetails;
