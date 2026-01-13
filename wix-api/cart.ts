import { WIX_STORE_APP_ID } from "@/constants";
import { findVariant } from "@/lib/utils";
import { WixClientType } from "@/lib/wix-client.base";
import { productsV3 } from "@wix/stores";
import { toast } from "sonner";

// ASYNC FUNCTION TO GET THE A USER'S CURRENT CART
export async function getCart(wixClient: WixClientType) {
  try {
    console.log("Fetching cart...");

    // THE RESPONSE STRUCTURE IS { cart: {...} }
    const cart = await wixClient.currentCart.getCurrentCart();

    // IF NO CART ONLY CONSOLE LOG
    if (!cart) {
      console.log("No cart yet.");
      return null;
    }

    // FOR DEBUGGING!
    console.log("Cart found.");
    console.log("Items:", cart.lineItems?.length ?? 0);

    // RETURN CART INSTANCE
    return cart;
  } catch (error: any) {
    // GET THE ERROR CODE
    const code = error?.details?.applicationError?.code;

    // THIS IS A NORMAL EMPTY STATE
    if (code === "OWNED_CART_NOT_FOUND") {
      console.log("No cart yet for this user.");
      return null;
    }

    // ONLY LOG REAL FAILURES
    // CONSOLE.ERROR ON THE SERVER TRIGGERS THE NEXT ERROR OVERLAY SO USE CONSOLE.LOG INSTEAD
    console.error("Unexpected cart error:", error);
    return null;
  }
}

// INTERFACE FOR ADD TO CART FUNCTION PARAMETERS
interface AddToCartValues {
  product: productsV3.V3Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

// ASYNC FUNCTION TO ADD AN ITEM TO THE CART
export async function addToCart(
  wixClient: WixClientType,
  { product, selectedOptions, quantity }: AddToCartValues,
) {
  try {
    // VALIDATIONS
    // 1. CHECK IF PRODUCT AND SELECTED OPTIONS ARE PROVIDED
    if (!product || !selectedOptions) {
      toast.error("No product or variant selected.");
      return { ok: false, error: "No product or variant selected." };
    }

    // 2. CHECK IF QUANTITY IS ATLEAST 1
    if (!quantity) {
      toast.error("Quantity must be atleast 1.");
      return { ok: false, error: "Quantity must be atleast 1." };
    }

    // FIND THE SELECTED VARIANT BASED ON USER'S OPTIONS
    const selectedVariant = findVariant(product, selectedOptions);

    // 3. CHECK IF SELECTED VARIANT EXISTS
    if (!selectedVariant) {
      toast.error("Selected variant not found.");
      return { ok: false, error: "Selected variant not found." };
    }

    // THIS WILL AUTOMATICALLY CREATE A CART IF NONE EXISTS FOR THE USER
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        // ADDING A SINGLE LINE ITEM
        {
          catalogReference: {
            // CATALOG REFERENCE DETAILS
            appId: WIX_STORE_APP_ID, // WIX STORE APPLICATION ID
            catalogItemId: product._id || "", // PRODUCT ID
            options: {
              // SELECTED OPTIONS
              variantId: selectedVariant._id, // VARIANT ID
            },
          },
          quantity, // QUANTITY TO ADD
        },
      ],
    });

    // NOTIFY USER OF SUCCESSFUL ADDITION
    toast.success("Item added to cart.");
    return response.cart;
  } catch (error: any) {
    // EXTRACT AND DISPLAY RELEVANT ERROR MESSAGE
    const msg =
      error?.details?.validationError?.message ||
      error?.details?.applicationError?.description ||
      error?.message ||
      "Add to cart error.";

    // TRIGGERS A NEXT ERROR OVERLAY (BLOCKS UI)
    toast.error(msg);
    return { ok: false, error: msg };
  }
}
