"use client";

import { CreditCard, ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import WixImage from "../wix/WixImage";
import ProductBadge from "./ProductBadge";
import { productsV3 } from "@wix/stores";
import ProductOptions from "./ProductOptions";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";

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
  const productImage = product?.media?.main?.image;
  const productImageAltText = product.media?.main?.altText;

  const productName = product.name;
  const productBrand = product.brand?.name;

  const productCurrentPrice = Number(
    product.actualPriceRange?.minValue?.amount ?? 0,
  );

  const productPreviousPrice = Number(
    product.compareAtPriceRange?.minValue?.amount ?? 0,
  );

  const productRibbon = product.ribbon?.name;
  const productDescription = product.plainDescription;

  return (
    <div className="flex flex-col items-start gap-10 transition-all duration-200 md:flex-row lg:gap-20">
      {/* CUSTOM WIX IMAGE COMPONENT */}
      <div className="basis-2/5 overflow-hidden">
        <WixImage
          productImage={productImage}
          width={1000}
          height={1000}
          alt={productImageAltText}
          className="sticky top-0 transition-all duration-300 hover:scale-105"
        />
      </div>

      {/* MAIN PRODUCT INFORMATION */}
      <div className="flex basis-3/5 flex-col items-start gap-3">
        {/* NAME */}
        <h1 className="text-xl font-bold tracking-wide lg:text-3xl">
          {productName}
        </h1>

        <div className="flex flex-row items-center gap-60 md:gap-64 lg:gap-70">
          {/* 1. */}
          <div className="flex flex-col gap-3">
            {/* BRAND */}
            {productBrand && (
              <span className="text-muted-foreground text-xs">
                {productBrand}
              </span>
            )}

            {/* RIBBON */}
            {productRibbon && <ProductBadge>{productRibbon}</ProductBadge>}
          </div>

          {/* 2 */}
          <div className="bg-primary space-x-2 p-2 text-xl">
            {/* CURRENT PRICE */}
            <span>£{productCurrentPrice.toFixed(2)}</span>

            {/* PREVIOUS PRICE IF ITS BIGGER THAN THE CURRENT PRICE */}
            <span>
              {productPreviousPrice > productCurrentPrice && (
                <span className="line-through">
                  £{productPreviousPrice.toFixed()}
                </span>
              )}
            </span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div
          className="pro my-5 text-sm"
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
        <div className="mt-5 flex w-[35%] flex-col gap-2">
          <span className="text-sm">Quantity:</span>

          <Input type="number" />
        </div>

        {/* ADD TO CART CTA */}
        <Button className="w-[70%] cursor-pointer rounded-none bg-orange-400 hover:bg-orange-400/70">
          <ShoppingBasket />
          Add to Cart
        </Button>

        {/* BUY NOW CTA */}
        <Button className="w-[70%] cursor-pointer rounded-none bg-gray-300 hover:bg-gray-300/70">
          <CreditCard />
          Buy Now
        </Button>

        <div className="max-w-5xl bg-yellow-200 text-wrap">
          In stock: {JSON.stringify(variantInStock)}
        </div>

        <div className="max-w-5xl bg-green-300 text-wrap">
          Selected options: {JSON.stringify(selectedOptions)}
        </div>

        <div className="max-w-5xl bg-purple-300 text-wrap">
          Selected variant:{" "}
          <pre>{JSON.stringify(selectedVariant, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
