import { myWixClient } from "@/lib/wix-client.base";

// WILL HOLD ALL THE LOGIC RELATED TO THE WIX CART

// ASYNC FUNCTION TO GET THE A USER'S CURRENT CART
export async function getCart() {
  const wixClient = myWixClient();

  try {
    return await wixClient.currentCartV2.getCurrentCart();
  } catch (error) {
    if (
      (error as any).details.applicationError.code === "CURRENT_CART_NOT_FOUND"
    ) {
      return null;
    } else {
      throw error;
    }
  }
}
