// WILL HOLD ALL THE LOGIC RELATED TO THE WIX PRODUCTS

import { myWixClient } from "@/lib/wix-client.base";

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

// GET A SINGLE PRODUCT FROM WIX CMS
export async function getProductBySlug(slug: string) {
  const wixClient = myWixClient();

  // RETRIEVES A SINGLE PRODUCT BY SLUG
  const product = await wixClient.productsV3.getProductBySlug(slug, {
    fields: ["CURRENCY", "PLAIN_DESCRIPTION", "DIRECT_CATEGORIES_INFO"],
  });

  return product;
}
