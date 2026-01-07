"use client";

import { CreditCard, ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ProductBadge from "./ProductBadge";
import { productsV3 } from "@wix/stores";
import ProductOptions from "./ProductOptions";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductMedia from "./ProductMedia";

interface ProductDetailsProps {
  product: productsV3.V3Product; // THE DEFAULT TYPE OF PRODUCTS IN THE V3 WIX API SDK
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  // STORE PRODUCT QUANTITY
  const [qauntity, setQuantity] = useState(1);

  // STORE PRODOCT OPTIONS E.G. PRODUCT VARIANTS... COLOR & SIZE
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.options
      ?.map((option) => ({
        [option.name || ""]: option.choicesSettings?.choices?.[0].name || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {},
  );

  // GET ALL SPECIFIC VARIANT INFOMATION
  const selectedVariant = findVariant(product, selectedOptions);

  // CHECK WHETHER THE SPECIFIC VARIANT IS IN STOCK
  const variantInStock = checkInStock(product, selectedOptions);

  // EXTRACT PRODUCT DETAILS FOR RENDERING
  const mediaItems = product.media?.itemsInfo?.items;

  const productName = product.name;
  const productBrand = product.brand?.name;

  const productRibbon = product.ribbon?.name;
  const productDescription = product.plainDescription;

  // UNDEFINED CHECK
  if (!mediaItems) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-10 lg:gap-20">
      {/* CUSTOM PRODUCT MEDIA COMPONENT */}
      <ProductMedia mediaItems={mediaItems} />

      {/* MAIN PRODUCT INFORMATION */}
      <div className="flex w-full flex-col gap-4 md:basis-3/5">
        {/* NAME AND OUT OF STOCK BADGE */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide lg:text-3xl">
            {productName}
          </h1>

          {!variantInStock && (
            <ProductBadge className="bg-red-400">
              Variant Out of Stock
            </ProductBadge>
          )}
        </div>

        {/* BRAND, RIBBON AND PRICE */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* LEFT SIDE: BRAND AND RIBBON */}
          <div className="flex flex-col gap-2">
            {productBrand && (
              <span className="text-muted-foreground text-xs">
                {productBrand}
              </span>
            )}

            {productRibbon && <ProductBadge>{productRibbon}</ProductBadge>}
          </div>

          {/* RIGHT SIDE: PRICE */}
          <div className="flex items-center gap-3 bg-green-400/55 p-3 text-xl font-semibold">
            <div className="flex items-center gap-2">
              <span>£{selectedVariant?.price?.actualPrice?.amount}</span>
            </div>

            {/* IF THE COMPARE AT PRICE EXISTS AND ITS HIGHER THAN THE ACTUAL PRICE */}
            {selectedVariant?.price?.compareAtPrice?.amount &&
              Number(selectedVariant.price.compareAtPrice.amount) >
                Number(selectedVariant.price.actualPrice?.amount) && (
                <span className="text-base font-normal text-gray-900 line-through opacity-80">
                  £{selectedVariant.price.compareAtPrice.amount}
                </span>
              )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div
          className="prose prose-sm my-3 max-w-none"
          dangerouslySetInnerHTML={{
            __html: productDescription || "",
          }}
        />

        {/* PRODUCT OPTIONS - SEPARATE COMPONENT - E.G. COLOR, SIZE ETC. */}
        <ProductOptions
          product={product}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />

        {/* QUANTITY */}
        <div className="mt-4 flex flex-col gap-2">
          <span className="text-sm font-medium">Quantity:</span>
          <Input type="number" className="w-24" min="1" defaultValue="1" />
        </div>

        {/* ADD TO CART AND BUY NOW BUTTONS */}
        <div className="mt-4 flex w-full flex-col gap-3">
          <Button
            className="w-full cursor-pointer rounded-none bg-orange-400 hover:bg-orange-400/70"
            disabled={!variantInStock}
          >
            <ShoppingBasket className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>

          <Button
            className="w-full cursor-pointer rounded-none bg-gray-300 text-black hover:bg-gray-300/70"
            disabled={!variantInStock}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Buy Now
          </Button>
        </div>

        {/* <div className="max-w-5xl bg-yellow-200 text-sm text-wrap">
          In stock: {JSON.stringify(variantInStock)}
        </div>

        <div className="max-w-5xl bg-green-300 text-sm text-wrap">
          Selected options: {JSON.stringify(selectedOptions)}
        </div>

        <div className="max-w-5xl bg-purple-300 text-wrap">
          Selected variant:{" "}
          <pre>{JSON.stringify(selectedVariant, null, 2)}</pre>
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetails;
