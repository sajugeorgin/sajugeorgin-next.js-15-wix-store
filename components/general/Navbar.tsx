import { myWixClient } from "@/lib/wix-client.base";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { ShoppingCartIcon } from "lucide-react";

const Navbar = async () => {
  // GET THE USERS CART (AWAIT) AND RETURN THE CART OBJECT FROM THE RESPONSE
  const currentCart = await getCart().then((res) => {
    return res?.cart;
  });

  // LINE ITEMS IN THE CART BY THE CUSTOMER
  // USE A REDUCER TO CALCULATE THE TOTAL ITEMS
  const totalQuantity =
    currentCart?.lineItems?.reduce(
      (acc, item) => (acc += item.quantityInfo?.requestedQuantity || 0),
      0,
    ) || 0;

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="Nirra" width={40} height={40} />

          <span className="text-xl font-bold">Nirra</span>
        </Link>

        <div className="flex items-center gap-2">
          <ShoppingCartIcon className="size-5" />

          {totalQuantity}
        </div>
      </div>
    </header>
  );
};

// ASYNC FUNCTION TO GET THE A USER'S CURRENT CART
async function getCart() {
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

export default Navbar;
