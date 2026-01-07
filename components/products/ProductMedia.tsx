"use client";

import { productsV3 } from "@wix/stores";
import WixImage from "@/components/wix/WixImage";
import { media as wixMedia } from "@wix/sdk";
import { useEffect, useState } from "react";
import ProductPreviewMedia from "./ProductPreviewMedia";
import Zoom from "react-medium-image-zoom";

interface ProductMediaProps {
  mediaItems: productsV3.ProductMedia[];
}

const ProductMedia = ({ mediaItems }: ProductMediaProps) => {
  // STORE CURRENTLY SELECTED MEDIA
  const [selectedMedia, setSelectedMedia] = useState<
    productsV3.ProductMedia | undefined
  >(undefined);

  // AVOID HYDRATION ISSUES WITH NEXT.JS WHEN RENDERING IMAGES/ VIDEOS
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // VIDEO PLAYING STATE
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);

  // SET MOUNTED STATE TO TRUE WHEN COMPONENT MOUNTS
  useEffect(() => {
    if (mediaItems?.length) {
      setSelectedMedia(mediaItems[0]);
    }

    setIsMounted(true);
  }, []);

  // IF NO MEDIA ITEMS, RETURN NULL
  if (!mediaItems || mediaItems.length === 0) {
    return null;
  }

  // EXTRACT MAIN IMAGE/ VIDEO. IN THIS CASE, WE JUST TAKE THE FIRST ITEM
  const mainImage = selectedMedia?.image;
  const mainAlt = selectedMedia?.altText;

  // GET THE ABSOLUTE URL FOR A SPECIFIC WIX MEDIA VIDEO
  // USE THE WIX MEDIA SDK
  const mainVideoObject =
    typeof selectedMedia?.video === "string" &&
    selectedMedia.video.startsWith("wix:video://")
      ? wixMedia.getVideoUrl(selectedMedia.video)
      : null;

  // ABSOLUTE URL FOR THE VIDEO
  const mainVideoUrl = mainVideoObject?.url;

  return (
    <div className="h-fit w-full md:sticky md:top-0 md:basis-2/5">
      {/* INITIAL PRODUCT IMAGE/ VIDEO */}
      <div className="flex aspect-square items-center justify-center">
        {!isMounted ? (
          // SSR PLACEHOLDER
          <div className="size-full bg-gray-200" />
        ) : mainImage ? (
          // RENDER IMAGE
          <Zoom key={selectedMedia.url}>
            <WixImage
              productImage={mainImage}
              width={800}
              height={800}
              alt={mainAlt}
            />
          </Zoom>
        ) : mainVideoUrl ? (
          // RENDER VIDEO
          // UPDATE VIDEO EVENT HANDLERS - TO DYNAMICALLY DISPLAY PLAY & PAUSE ICONS
          <video
            preload="metadata"
            controls
            autoPlay
            playsInline
            onPlaying={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            onEnded={() => setVideoPlaying(false)}
            className="size-full"
          >
            <source src={mainVideoUrl} />
          </video>
        ) : null}
      </div>

      {/* OTHER MEDIA ITEMS */}
      {mediaItems?.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {mediaItems.map((mediaItem) => (
            <ProductPreviewMedia
              key={mediaItem._id}
              mediaItem={mediaItem}
              isSelected={mediaItem._id === selectedMedia?._id}
              onSelect={() => setSelectedMedia(mediaItem)}
              videoPlaying={videoPlaying}
              selectedMedia={selectedMedia!}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductMedia;
