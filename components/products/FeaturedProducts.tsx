import { delay } from "@/lib/utils";
import { myWixClient } from "../../lib/wix-client.base";
import Product from "./Product";
import { FEATURED_PRODUCTS_CATEGORY_ID } from "@/lib/wix.categories";

export async function FeaturedProducts() {
  await delay(3000);

  const wixClient = myWixClient(); // Use the WIX client

  // Get ALL PRODUCTS using the Catalog ProductsV3 API
  const { items: allProducts } = await wixClient.productsV3
    .queryProducts({
      fields: [
        "CURRENCY",
        "PLAIN_DESCRIPTION",
        "SUBSCRIPTION_PRICES_INFO",
        "DIRECT_CATEGORIES_INFO",
      ],
    })
    .descending("_updatedDate")
    .find(); // Execute query

  // Filter out only the products that are in "FEATURED PRODUCTS" category
  // Specific data is only available in the API response body if the fields are requested (included) in the query.
  // E.g. fields: ["CURRENCY", "DIRECT_CATEGORIES_INFO"].
  const featuredProducts = allProducts.filter((product) =>
    product.directCategoriesInfo?.categories?.some(
      (cat) => cat._id === FEATURED_PRODUCTS_CATEGORY_ID,
    ),
  );

  // If no featured products, return nothing
  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="flex items-center gap-3 text-2xl font-bold">
        Featured Products:{" "}
        <span className="text-[15px]">({featuredProducts.length} items)</span>
      </h2>

      {/* Map over the featured products and create a <Product/> component for each one */}
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      {/* Placeholder to see returned JSON - USEFUL FOR DEVELOPMENT */}
      {/* <pre>
        {JSON.stringify(featuredProducts[featuredProducts.length - 1], null, 2)}
      </pre> */}
    </div>
  );
}
