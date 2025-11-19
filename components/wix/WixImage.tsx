import { ImgHTMLAttributes } from "react";
import { media as wixMedia } from "@wix/sdk";

/*
WixImageProps builds a special image props type for this component.

1. Start with the default <img> props, but remove (omit) src, width, height and alt
   because we want to control those ourselves.

2. Add our own fields:
   - productImage: the Wix media image e.g. wix:image://v1/22e53e_b231b9c8053942b49508f464049db5c9...
   - placeholder: optional placeholder image.
   - alt: optional alt text.

3. Force one of two layouts:
   A. scaleToFill is true, and the caller must provide width and height.
   B. scaleToFill is false, and no width or height are needed.

This gives strong type safety and clear rules for using our image component.
*/

type WixImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "alt"
> & {
  productImage: string | undefined;
  placeholder?: string;
  alt?: string | null | undefined;
} & (
    | {
        scaleToFill?: true;
        width: number;
        height: number;
      }
    | {
        scaleToFill: false;
      }
  );

export default function WixImage({
  productImage,
  placeholder = "/placeholder.png",
  alt,
  ...props
}: WixImageProps) {
  const imageUrl = productImage // IF THE PRODUCT IMAGE EXISTS
    ? props.scaleToFill || props.scaleToFill === undefined // AND SCALETOFILL IS TRUE OR UNDEFINED
      ? wixMedia.getScaledToFillImageUrl(
          // SCALE IMAGE (using Wix Media SDK API) TO WIDTH AND HEIGHT
          productImage,
          props.width,
          props.height,
          {},
        )
      : wixMedia.getImageUrl(productImage).url // OTHERWISE USE IMAGE WITH ORIGINAL DIMENSIONS
    : placeholder; // OTHERWISE USE PLACEHOLDER IMAGE

  return <img src={imageUrl} alt={alt || ""} {...props} />;
}
