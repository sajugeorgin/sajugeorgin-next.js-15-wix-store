import Link from "next/link";
import { productsV3 } from "@wix/stores";
import WixImage from "../wix/WixImage";
import ProductBadge from "@/components/ProductBadge";
import { cn } from "@/lib/utils";

interface IAllProducts {
  product: productsV3.V3Product; // THE DEFAULT TYPE OF PRODUCTS IN THE V3 API SDK
}

export default function Product({ product }: IAllProducts) {
  // MAIN MEDIA (image, video, etc.)
  const main = product.media?.main;

  // GET PRODUCT AVAILABILITY
  const availability = product.inventory?.availabilityStatus;
  let stockStatus: string | undefined;

  // SWITCH CASES FOR BADGE COMPONENT TEXT
  switch (availability) {
    case "IN_STOCK":
      stockStatus = "In Stock";
      break;
    case "PARTIALLY_OUT_OF_STOCK":
      stockStatus = "Low Stock";
      break;
    case "OUT_OF_STOCK":
      stockStatus = "Out of Stock";
      break;
    default:
      stockStatus = "In Stock";
  }

  // GET THE CURRENT PRODUCT PRICE
  const currentPrice = Number(product.actualPriceRange?.minValue?.amount ?? 0);

  // GET THE PREVIOUS PRODUCT PRICE
  const previousPrice = Number(
    product.compareAtPriceRange?.minValue?.amount ?? 0,
  );

  return (
    <div className="flex flex-col border-b">
      <Link href={`/products/${product.slug}`}>
        {/* NORMAL </img> BECAUSE WE ARE RESIZING IMAGES USING WIX SO DON'T NEED NEXT IMAGE */}
        {/* ALSO RAISES SECURITY CONCERNS AROUND WHITELISTING THE WIX DOMAIN */}

        <div className="relative overflow-hidden">
          {/* COMBINATION OF OVERFLOW-HIDDEN + SCALE CREATES A COOL HOVER EFFECT */}

          {/* CUSTOM WIX IMAGE COMPONENT */}
          <WixImage
            productImage={main?.image}
            width={700}
            height={700}
            alt={main?.altText}
            className="transition-transform duration-300 hover:scale-105"
          />

          <div className="absolute right-3 bottom-3 flex flex-wrap items-center gap-2">
            {/* PRODUCT RIBBON BADGE E.G. NEW, SALE, NEW ARRIVAL ETC. */}
            {product.ribbon && (
              <ProductBadge>{product.ribbon.name}</ProductBadge>
            )}
          </div>

          <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
            {/* STOCK STATUS E.G. IN STOCK, OUT OF STOCK ETC. */}
            <ProductBadge
              className={cn(
                "",
                stockStatus === "In Stock" ? "bg-green-300" : "bg-red-300",
              )}
            >
              {stockStatus}
            </ProductBadge>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-1 bg-gray-100 p-2">
        {/* PRODUCT NAME */}
        <span className="font-mono font-bold">{product.name}</span>

        <div className="flex gap-2 font-mono">
          {/* CURRENT PRICE */}
          <span>£{currentPrice.toFixed(2)}</span>

          {/* DISPLAY PREVIOUS PRICE IF ITS BIGGER THAN THE CURRENT PRICE */}
          <span>
            {previousPrice > currentPrice && (
              <span className="line-through">£{previousPrice.toFixed()}</span>
            )}
          </span>
        </div>

        <div
          className="line-clamp-3 text-sm"
          dangerouslySetInnerHTML={{
            __html: product.plainDescription || "", // PRODUCT DESCRIPTION IN HTML
          }}
        />
      </div>
    </div>
  );
}
