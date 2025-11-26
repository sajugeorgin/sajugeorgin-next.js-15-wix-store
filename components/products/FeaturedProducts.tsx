import { delay } from "@/lib/utils";
import Product from "./Product";
import { FEATURED_PRODUCTS_CATEGORY_ID } from "@/lib/wix.categories";
import { getProductsByCategoryId } from "@/wix-api/products";

export async function FeaturedProducts() {
  await delay(3000);

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

      {/* PLACEHOLDER TO SEE JSON USING HTML <PRE/> TAG - USEFUL FOR DEVELOPMENT */}
      {/* <pre>
        {JSON.stringify(featuredProducts[featuredProducts.length - 1], null, 2)}
      </pre> */}
    </div>
  );
}
