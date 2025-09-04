"use client"

import { FC, useEffect } from "react";
import { Coupon } from "@prisma/client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CouponFormSchema } from "@/lib/schemas";
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
import { upsertCoupon } from "@/queries/coupon";
import { v4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface CouponDetailsProps {
  data?: Coupon;
  storeId: string;
}

const CouponDetails: FC<CouponDetailsProps> = ({ data, storeId }) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof CouponFormSchema>>({
    resolver: zodResolver(CouponFormSchema),
    defaultValues: {
      code: data?.code || "",
      startDate: data?.startDate || "",
      endDate: data?.endDate || "",
      discount: data?.discount || 0,
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (data) {
      form.reset({
        code: data.code || "",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        discount: data.discount || 0,
      });
    }
  }, [data, form]);

  const handleSubmit = async (values: z.infer<typeof CouponFormSchema>) => {
    try {
      console.log("Form values:", values);

      const couponData = {
        id: data?.id || v4(),
        code: values.code,
        startDate: values.startDate,
        endDate: values.endDate,
        discount: values.discount,
        storeId: storeId,
      };

      console.log("Sending to upsertCoupon:", couponData);

      const response = await upsertCoupon(couponData as Coupon);

      toast({
        title: data?.id ? "Coupon updated successfully" : "Coupon created successfully",
      });

      if (data?.id) {
        router.refresh();
      } else {
        router.push('/dashboard/seller/coupons');
      }
    } catch (error: any) {
      console.error("Submit error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred",
      });
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Coupon Information</CardTitle>
          <CardDescription>
            {data?.id
              ? `Update ${data?.code} coupon information.`
              : "Create a coupon. You can edit the coupon later from the coupons table."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter coupon code" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Percentage</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="10" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isLoading} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : data?.id ? "Update Coupon" : "Create Coupon"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default CouponDetails;