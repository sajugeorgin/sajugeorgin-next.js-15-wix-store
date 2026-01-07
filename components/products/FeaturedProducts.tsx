import { delay } from "@/lib/utils";
import Product from "./Product";
import { FEATURED_PRODUCTS_CATEGORY_ID } from "@/lib/wix.categories";
import { getProductsByCategoryId } from "@/wix-api/products";

export async function FeaturedProducts() {
  // GET THE PRODUCTS BASED ON CATEGORY ID AND INCLUDE ADDITIONAL FIELDS OF DATA TO BE RETURNED
  const products = await getProductsByCategoryId(
    FEATURED_PRODUCTS_CATEGORY_ID,
    ["CURRENCY", "DIRECT_CATEGORIES_INFO", "PLAIN_DESCRIPTION"],
  );

  // IF NOT PRODUCTS, RETURN NOTHING
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="flex items-center gap-3 text-2xl font-bold">
        Featured Products:{" "}
        <span className="text-[15px]">({products.length} items)</span>
      </h2>

      {/* MAP OVER PRODUCTS ARRAY AND CREATE A NEW COMPONENT FOR EACH PRODUCT */}
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      {/* DEV PURPOSE! */}
      {/* <div className="container w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <details className="bg-muted rounded-lg p-4">
          <summary className="mb-2 cursor-pointer font-semibold">
            Debug: Product Data
          </summary>

          <pre className="overflow-auto text-xs">
            {JSON.stringify(products[2], null, 2)}
          </pre>
        </details>
      </div> */}
    </div>
  );
}
