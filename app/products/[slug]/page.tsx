import ProductDetails from "@/components/products/ProductDetails";
import { extractRichText } from "@/lib/metadata";
import { delay } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getProductBySlug } from "@/wix-api/products";
import { productsV3 } from "@wix/stores";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PageParams = {
  slug: string;
};

// GENERATE META DATA FOR IMPROVED SEO WHICH IS IMPORTANT FOR ECOMMERCE WEBSITES
// BECAUSE YOU WANT USERS TO FIND YOUR PRODUCTS
// HAS TO BE NAMED generateMetadata() - RECOGINISED BY NEXT.JS
export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  // GET A SINGLE PRODUCT BY SLUG VIA PARAMS
  let product: productsV3.V3Product | undefined;

  // USE TRY CATCH BLOCK OTHERWISE THE NOTFOUND() PAGE WILL NOT BE DISPLAYED
  try {
    product = (await getProductBySlug(await getWixServerClient(), slug))
      .product;
  } catch {
    return notFound();
  }

  // IF NO PRODUCT EXISTS, SHOW 404 PAGE
  if (!product) return notFound();

  // GET PRODUCT DATA
  const mainImage = product.media?.main;
  const name = product.name;
  const description = extractRichText(product.description);

  return {
    title: name,
    description: description,
    openGraph: {
      images: mainImage?.url
        ? [{ url: mainImage.url, alt: mainImage.altText || "" }]
        : undefined,
    },
  };
}

export default async function Page(props: { params: Promise<PageParams> }) {
  // FOR DEVELOPMENT TO SEE LOADING SKELETON
  await delay(2000);

  // IN NEXT 15, PARAMS HAVE BEEN MADE ASYNCHRONOUS. THEREFORE PARAMS RETURNS A PROMISE
  const { slug } = await props.params;

  // GET A SINGLE PRODUCT BY SLUG VIA PARAMS
  let product: productsV3.V3Product | undefined;

  // USE TRY CATCH BLOCK OTHERWISE THE NOTFOUND() PAGE WILL NOT BE DISPLAYED
  try {
    product = (await getProductBySlug(await getWixServerClient(), slug))
      .product;
  } catch {
    return notFound();
  }

  // IF NO PRODUCT EXISTS, SHOW 404 PAGE
  if (!product) return notFound();

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      {/* PRODUCT DETAILS COMPONENT - PASS THE PRODUCT AS A PROP */}
      <ProductDetails product={product} />

      {/* DEV PURPOSE! */}
      {/* <div className="container w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <details className="bg-muted rounded-lg p-4">
          <summary className="mb-2 cursor-pointer font-semibold">
            Debug: Product Data
          </summary>

          <pre className="overflow-auto text-xs">
            {JSON.stringify(product, null, 2)}
          </pre>
        </details>
      </div> */}
    </main>
  );
}
