"use client";

import { cn } from "@/lib/utils";
import { productsV3 } from "@wix/stores";
import WixImage from "@/components/wix/WixImage";
import { media as wixMedia } from "@wix/sdk";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

interface ProductPreviewMediaProps {
  mediaItem: productsV3.ProductMedia;
  isSelected: boolean;
  onSelect: () => void;
  videoPlaying?: boolean;
  selectedMedia: productsV3.ProductMedia;
}

const ProductPreviewMedia = ({
  mediaItem,
  isSelected,
  onSelect,
  videoPlaying,
  selectedMedia,
}: ProductPreviewMediaProps) => {
  // AVOID HYDRATION ISSUES WITH NEXT.JS WHEN RENDERING IMAGES/ VIDEOS
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // SET MOUNTED TO TRUE AFTER THE COMPONENTS MOUNTS
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // MEDIA IMAGE, ALT AND TYPE
  const mediaImage = mediaItem?.image;
  const mediaAlt = mediaItem?.altText || "Product Media";
  const mediaType = mediaItem?.mediaType;

  // GET THE ABSOLUTE URL FOR A SPECIFIC WIX MEDIA VIDEO
  // USE THE WIX MEDIA SDK
  const videoObject =
    typeof mediaItem.video === "string" &&
    mediaItem.video.startsWith("wix:video://")
      ? wixMedia.getVideoUrl(mediaItem.video)
      : null;

  // ABSOLUTE URL FOR THE VIDEO
  const videoUrl = videoObject?.url;

  // IF NOT MEDIA IMAGE AND ABSOLUTE URL (ATLEAST ONE MUST EXIST)
  if (!mediaImage && !videoUrl) return null;

  return (
    <div
      className={cn(
        "bg-secondary relative cursor-pointer overflow-hidden rounded",
        isSelected && "outline-primary outline-3",
      )}
      onClick={onSelect} // ON CLICK HANDLER
      onChange={onSelect}
    >
      {!isMounted ? (
        // SSR PLACEHOLDER
        <div className="size-32 bg-gray-200" />
      ) : mediaType === "VIDEO" && videoUrl ? (
        // MEDIA TYPE IS VIDEO AND WE HAVE AN ABSOLUTE URL FOR THE VIDEO
        <div className="relative size-25">
          {mediaImage ? (
            // VIDEO THUMBNAIL
            <WixImage
              productImage={mediaImage}
              alt={mediaAlt}
              width={100}
              height={100}
            />
          ) : (
            // ACTUAL VIDEO
            <video
              className="h-full w-full object-cover"
              preload="metadata"
              playsInline
            >
              <source src={videoUrl} />
            </video>
          )}

          {videoPlaying && mediaItem._id === selectedMedia._id ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Pause className="size-8 fill-white text-white" />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="size-8 fill-white text-white" />
            </div>
          )}
        </div>
      ) : mediaType === "IMAGE" && mediaImage ? (
        // ELSE DISPLAY THE IMAGE MEDIA
        <WixImage
          productImage={mediaImage}
          alt={mediaAlt}
          width={100}
          height={100}
        />
      ) : null}
    </div>
  );
};

export default ProductPreviewMedia;
