import ProductBadge from "@/components/products/ProductBadge";
import ProductDetails from "@/components/products/ProductDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WixImage from "@/components/wix/WixImage";
import { getProductBySlug } from "@/wix-api/products";
import { CreditCard, ShoppingBasket } from "lucide-react";
import { notFound } from "next/navigation";

type PageParams = {
  slug: string;
};

export default async function Page(props: { params: Promise<PageParams> }) {
  // IN NEXT 15, PARAMS HAVE BEEN MADE ASYNCHRONOUS. THEREFORE PARAMS RETURNS A PROMISE
  const { slug } = await props.params;

  // GET A SINGLE PRODUCT BY SLUG VIA PARAMS
  let product;

  // USE TRY CATCH BLOCK OTHERWISE THE NOTFOUND() PAGE WILL NOT BE DISPLAYED
  try {
    product = (await getProductBySlug(slug)).product;
  } catch {
    return notFound();
  }

  // IF NO PRODUCT RETURN NOTFOUND() PAGE
  if (!product) return notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <ProductDetails product={product} />
      
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </main>
  );
}
