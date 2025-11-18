import Link from "next/link";
import { productsV3 } from "@wix/stores";
import { media as wixMedia } from "@wix/sdk";

interface IAllProducts {
  product: productsV3.V3Product; // The type of { items: allProducts } in <FeaturedProducts/>
}

export default function Product({ product }: IAllProducts) {
  // Main media (image, video, etc.) associated with this product
  const mainImage = product.media?.main;
  // Product Image
  const imageId = mainImage?.image;

  // Use the Wix Media API to scale an image to fill specified dimensions and build a usable URL
  const resizedImageURL = imageId
    ? wixMedia.getScaledToFillImageUrl(imageId, 700, 700, {})
    : null;

  return (
    <div className="flex flex-col border-b">
      <Link href={`/products/${product.slug}`}>
        {/* Using a normal </img> because we are resizing the images manually using Wix */}
        {/* We would also need to whitelist the Wix domain which raises security concerns */}

        {/* A cool on-hover scale image effect */}
        <div className="overflow-hidden">
          <img
            src={resizedImageURL || "/placeholder.png"}
            alt={mainImage?.altText || ""}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-1 bg-gray-100 p-2">
        <span className="font-mono font-bold">{product.name}</span>

        <span className="font-mono font-bold">
          {product.actualPriceRange?.minValue?.formattedAmount}
        </span>

        <div
          className="line-clamp-3 text-sm"
          dangerouslySetInnerHTML={{
            __html: product.plainDescription || "",
          }}
        />
      </div>
    </div>
  );
}
