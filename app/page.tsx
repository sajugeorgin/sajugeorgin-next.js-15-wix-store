import Image from "next/image";
import banner from "@/assets/banner.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/loading/LoadingSkeleton";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      {/* BANNER */}
      <div className="bg-secondary flex items-center rounded-xl md:h-96">
        {/* LEFT SIDE */}
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl font-bold md:text-4xl">
            Simple pieces, strong looks.
          </h1>

          <p>
            Quality materials, careful construction, and easy styling. Dress
            them up or down and feel confident every day.
          </p>

          <Button
            asChild
            className="cursor-pointer transition duration-300 hover:scale-105"
          >
            <Link href="/shop">
              Shop Now <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative hidden h-full w-1/2 md:block">
          <Image src={banner} alt="banner" className="h-full object-cover" />
          <div className="from-secondary absolute inset-0 bg-linear-to-r via-transparent to-transparent" />
        </div>
      </div>

      {/* APP DISPLAYS BANNER IMMEDIATELY SINCE WE ARE USING A SUSPENSE BOUNDARY */}
      {/* FEATURED PRODUCTS ARE ONLY SHOWN AFTER THEY ARE FETCHED */}
      {/* THIS IMPROVES PAGE LOAD TIMES AS THE ASYNC FUNCTION DOESN'T STOP THE BANNER FROM LOADING */}
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}
