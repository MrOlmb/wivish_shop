"use server";

import { db } from "@/lib/db";
import { CartWithCartItemsType } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { Coupon } from "@prisma/client";

// Function: upsertCoupon
// Description: Upserts a coupon into the database, updating it if it exists or creating a new one if not.
// Permission Level: Seller only
// Parameters:
//   - coupon: Coupon object containing details of the coupon to be upserted.
//   - storeUrl: String representing the store's unique URL, used to retrieve the store ID.
// Returns: Updated or newly created coupon details.
export const upsertCoupon = async (coupon: Coupon, storeId: string) => {
  try {
    // Get current user
    const user = await currentUser();

    // Ensure user is authenticated
    if (!user) throw new Error("Unauthenticated.");

    // Verify seller permission
    if (user.privateMetadata.role !== "SELLER")
      throw new Error(
        "Unauthorized Access: Seller Privileges Required for Entry."
      );

    // Ensure coupon data and storeId are provided
    if (!coupon) throw new Error("Please provide coupon data.");
    if (!storeId) throw new Error("Store ID is required.");

    // Retrieve store using storeId and ensure it belongs to the current user
    const store = await db.store.findUnique({
      where: { id: storeId },
    });

    if (!store) throw new Error("Store not found.");

    if (store.userId !== user.id)
      throw new Error("Unauthorized Access: You do not own this store.");

    // Throw error if a coupon with the same code and storeId already exists
    const existingCoupon = await db.coupon.findFirst({
      where: {
        AND: [
          { code: coupon.code },
          { storeId: store.id },
          {
            NOT: {
              id: coupon.id,
            },
          },
        ],
      },
    });

    if (existingCoupon) {
      throw new Error(
        "A coupon with the same code already exists for this store."
      );
    }

    // Upsert coupon into the database
    const couponDetails = await db.coupon.upsert({
      where: {
        id: coupon.id,
      },
      update: { ...coupon, storeId: store.id },
      create: { ...coupon, storeId: store.id },
    });

    return couponDetails;
  } catch (error) {
    throw error;
  }
};

// Function: getStoreCoupons
// Description: Retrieves all coupons for a specific store based on the provided store ID.
// Permission Level: Seller only
// Parameters:
//   - storeId: String representing the store's unique ID.
// Returns: Array of coupon details for the specified store.
export const getStoreCoupons = async (storeId: string) => {
  try {
    // Get current user
    const user = await currentUser();

    // Ensure user is authenticated
    if (!user) throw new Error("Unauthenticated.");

    // Verify seller permission
    if (user.privateMetadata.role !== "SELLER")
      throw new Error(
        "Unauthorized Access: Seller Privileges Required for Entry."
      );

    // Ensure storeId is provided
    if (!storeId) throw new Error("Store ID is required.");

    // Retrieve store using storeId and ensure it belongs to the current user
    const store = await db.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) throw new Error("Store not found.");

    if (store.userId !== user.id)
      throw new Error("Unauthorized Access: You do not own this store.");

    // Retrieve and return all coupons for the specified store
    const coupons = await db.coupon.findMany({
      where: {
        storeId: store.id,
      },
    });

    return coupons;
  } catch (error) {
    // Log and re-throw any errors
    throw error;
  }
};

// Function: getCoupon
// Description: Retrieves a specific coupon from the database.
// Access Level: Public
// Parameters:
//   - couponId: The ID of the coupon to be retrieved.
// Returns: Details of the requested coupon.
export const getCoupon = async (couponId: string) => {
  try {
    // Ensure coupon ID is provided
    if (!couponId) throw new Error("Please provide coupon ID.");

    // Retrieve coupon
    const coupon = await db.coupon.findUnique({
      where: {
        id: couponId,
      },
    });

    return coupon;
  } catch (error) {
    throw error;
  }
};

// Function: deleteCoupon
// Description: Deletes a coupon from the database.
// Permission Level: Seller only (must be the store owner)
// Parameters:
//   - couponId: The ID of the coupon to be deleted.
//   - storeId: The ID of the store associated with the coupon.
// Returns: Response indicating success or failure of the deletion operation.

export const deleteCoupon = async (couponId: string, storeId: string) => {
  try {
    // Get current user
    const user = await currentUser();

    // Check if user is authenticated
    if (!user) throw new Error("Unauthenticated.");

    // Verify seller permission
    if (user.privateMetadata.role !== "SELLER")
      throw new Error("Unauthorized Access: Seller Privileges Required.");

    // Ensure coupon ID and store ID are provided
    if (!couponId || !storeId)
      throw new Error("Please provide coupon ID and store ID.");

    // Get the store associated with the provided store ID
    const store = await db.store.findUnique({
      where: {
        id: storeId,
      },
    });

    // Verify store exists
    if (!store) throw new Error("Store not found.");

    // Verify that the logged-in user is the owner of the store
    if (store.userId !== user.id) {
      throw new Error(
        "You are not the owner of this store. Only the store owner can delete coupons."
      );
    }

    // Delete the coupon from the database
    const response = await db.coupon.delete({
      where: {
        id: couponId,
        storeId: store.id,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Applies a coupon to a cart for items belonging to the coupon's store.
 *
 * @param couponCode - The coupon code to apply.
 * @param cartId - The ID of the cart to apply the coupon to.
 * @returns A message indicating success or failure, along with the updated cart.
 */

export const applyCoupon = async (
  couponCode: string,
  cartId: string
): Promise<{ message: string; cart: CartWithCartItemsType }> => {
  try {
    // Step 1: Fetch the coupon details
    const coupon = await db.coupon.findUnique({
      where: {
        code: couponCode,
      },
      include: {
        store: true,
      },
    });

    if (!coupon) {
      throw new Error("Invalid coupon code.");
    }

    // Step 2: Validate the coupon's date range
    const currentDate = new Date();
    const startDate = new Date(coupon.startDate);
    const endDate = new Date(coupon.endDate);

    if (currentDate < startDate || currentDate > endDate) {
      throw new Error("Coupon is expired or not yet active.");
    }

    // Step 3: Fetch the cart and validate its existence
    const cart = await db.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        cartItems: true,
        coupon: true,
      },
    });

    if (!cart) {
      throw new Error("Cart not found.");
    }

    // Step 4: Ensure no coupon is already applied to the cart
    if (cart.couponId) {
      throw new Error("A coupon is already applied to this cart.");
    }

    // Step 5: Filter items from the store associated with the coupon
    const storeId = coupon.storeId;

    const storeItems = cart.cartItems.filter(
      (item) => item.storeId === storeId
    );

    if (storeItems.length === 0) {
      throw new Error(
        "No items in the cart belong to the store associated with this coupon."
      );
    }

    // Step 6: Calculate the discount on the store's items
    const storeSubTotal = storeItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const storeShippingTotal = storeItems.reduce(
      (acc, item) => acc + item.shippingFee,
      0
    );

    const storeTotal = storeSubTotal + storeShippingTotal;

    const discountedAmount = (storeTotal * coupon.discount) / 100;

    const newTotal = cart.total - discountedAmount;

    // Step 7: Update the cart with the applied coupon and new total
    const updatedCart = await db.cart.update({
      where: {
        id: cartId,
      },
      data: {
        couponId: coupon.id,
        total: newTotal,
      },
      include: {
        cartItems: true,
        coupon: {
          include: {
            store: true,
          },
        },
      },
    });

    return {
      message: `Coupon applied successfully. Discount: -$${discountedAmount.toFixed(
        2
      )} applied to items from ${coupon.store.name}.`,
      cart: updatedCart,
    };
  } catch (error: any) {
    throw error;
  }
};
