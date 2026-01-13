import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { currentCart, checkout } from "@wix/ecom";
import { productsV3, collections } from "@wix/stores";
import { reviews } from "@wix/reviews";
import { files } from "@wix/media";
import { members } from "@wix/members";
import { redirects } from "@wix/redirects";
import { env } from "@/config/env";

// PASS THE TOKENS WHEN CREATING THE WIX CLIENT
export function myWixClient(tokens: Tokens | undefined) {
  return createClient({
    modules: {
      currentCart,
      checkout,
      productsV3,
      collections,
      redirects,
      files,
      reviews,
      members,
    },
    auth: OAuthStrategy({
      clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
      tokens,
    }),
  });
}

// EXPORTING THE TYPE OF THE WIX CLIENT RETURN VALUE
export type WixClientType = ReturnType<typeof myWixClient>;
