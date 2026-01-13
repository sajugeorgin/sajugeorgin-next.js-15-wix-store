import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { ShoppingCartIcon } from "lucide-react";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";

const Navbar = async () => {
  // GET THE USERS CART (AWAIT) AND RETURN THE CART OBJECT FROM THE RESPONSE
  const cart = await getCart(await getWixServerClient());

  // LINE ITEMS IN THE CART BY THE CUSTOMER
  // USE A REDUCER TO CALCULATE THE TOTAL ITEMS IN THE CART
  const quantity =
    cart?.lineItems?.reduce((acc, item) => (acc += item.quantity || 0), 0) || 0;

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="Nirra" width={40} height={40} />

          <span className="text-xl font-bold">Nirra</span>
        </Link>

        <div className="flex items-center gap-2">
          <ShoppingCartIcon className="size-5" />
          {quantity ?? 0} items in the cart.
        </div>
      </div>

      {/* DEV PURPOSE! */}
      <div className="container w-full max-w-7xl px-2 py-4 sm:px-4 lg:px-6">
        <details className="bg-muted rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">
            Debug: Items in the cart
          </summary>

          <pre className="overflow-auto text-xs">
            {JSON.stringify(cart?.lineItems, null, 2)}
          </pre>
        </details>
      </div>
    </header>
  );
};

export default Navbar;
