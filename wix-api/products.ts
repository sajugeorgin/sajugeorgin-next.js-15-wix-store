// WILL HOLD ALL THE LOGIC RELATED TO THE WIX PRODUCTS

import { myWixClient } from "@/lib/wix-client.base";
import { cache } from "react";

export type Fields =
  | "THUMBNAIL"
  | "UNKNOWN_REQUESTED_FIELD"
  | "URL"
  | "CURRENCY"
  | "INFO_SECTION"
  | "MERCHANT_DATA"
  | "PLAIN_DESCRIPTION"
  | "INFO_SECTION_PLAIN_DESCRIPTION"
  | "SUBSCRIPTION_PRICES_INFO"
  | "BREADCRUMBS_INFO"
  | "WEIGHT_MEASUREMENT_UNIT_INFO"
  | "VARIANT_OPTION_CHOICE_NAMES"
  | "MEDIA_ITEMS_INFO"
  | "DESCRIPTION"
  | "DIRECT_CATEGORIES_INFO"
  | "ALL_CATEGORIES_INFO"
  | "INFO_SECTION_DESCRIPTION";

// GET ALL PRODUCTS USING THE CATALOGUE PRODUCTSV3 API
// SPECIFIC DATA IS ONLY PROVIDED IN THE RESPONSE IF THE FIELDS ARE INCLUDED IN THE REQUEST BODY
// E.G. FIELDS: ["CURRENCY", "DIRECT_CATEGORIES_INFO"] ETC.
export async function getProductsByCategoryId(id: string, fields: Fields[]) {
  const wixClient = myWixClient();

  const { items: allProducts } = await wixClient.productsV3
    .queryProducts({
      fields, // ADDITIONAL FIELDS TO PULL FROM THE WIX BACKEND
    })
    .descending("_updatedDate")
    .find(); // EXECUTE QUERY

  // FILTER OUT SPECIFIC PRODUCTS BASED ON THE CATEGORY ID PROVIDED BY THE USER
  const specificProducts = allProducts.filter((product) => {
    return product.directCategoriesInfo?.categories?.some(
      (cat) => cat._id === id,
    );
  });

  return specificProducts;
}

// GET A SINGLE PRODUCT FROM WIX CMS BY PRODUCT SLUG
// WRAPPED IN cache() TO PREVENT DUPLICATE API CALLS DURING THE SAME REQUEST
//
// WHY cache() IS IMPORTANT:
// In Next.js, the same data is often needed in multiple places during a single request:
// 1. generateMetadata() needs product data to create page metadata
// 2. Page component needs the same product data to render the UI
//
// WITHOUT cache():
// - getProductBySlug would be called TWICE per render
// - Example: User visits /products/leather-shoes
//   → generateMetadata() calls getProductBySlug("leather-shoes") ← API CALL 1
//   → Page component calls getProductBySlug("leather-shoes") ← API CALL 2
// - Result: 2 API calls, slower page load, wasted resources
//
// WITH cache():
// - First call fetches from API and stores result in memory
// - Second call returns cached result instantly (no API call)
// - Example: User visits /products/leather-shoes
//   → generateMetadata() calls getProductBySlug("leather-shoes") ← API CALL 1 (cached)
//   → Page component calls getProductBySlug("leather-shoes") ← INSTANT (from cache)
// - Result: 1 API call, faster page load, efficient
//
// CACHE BEHAVIOR:
// - Cache is per-request only (not shared between users)
// - Automatically cleared after request completes
// - Safe to use with dynamic data
// - Only works in Server Components (not Client Components)

export const getProductBySlug = cache(async (slug: string) => {
  // console.log("getProductBySlug"); // Will only log ONCE per request now

  const wixClient = myWixClient();

  // RETRIEVES A SINGLE PRODUCT BY SLUG
  const product = await wixClient.productsV3.getProductBySlug(slug, {
    // SPECIFY ADDITIONAL FIELDS TO RETRIEVE FROM WIX BACKEND
    fields: [
      "CURRENCY",
      "DESCRIPTION",
      "PLAIN_DESCRIPTION",
      "MEDIA_ITEMS_INFO",
      "DIRECT_CATEGORIES_INFO",
    ],
  });

  return product;
});
