import { productsV3 } from "@wix/stores";
import { Button } from "../ui/button";
import { addToCart } from "@/wix-api/cart";
import { ShoppingBasket } from "lucide-react";
import { wixBrowserClient } from "@/lib/wix-client.browser";

interface AddToCartButtonProps extends React.ComponentProps<"button"> {
  product: productsV3.V3Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  className,
  product,
  selectedOptions,
  quantity,
  ...props
}: AddToCartButtonProps) {
  return (
    <Button
      onClick={() =>
        addToCart(wixBrowserClient, {
          product,
          selectedOptions,
          quantity,
        })
      }
      {...props}
      className={className}
    >
      <ShoppingBasket className="mr-2 size-4" />
      Add to Cart
    </Button>
  );
}
