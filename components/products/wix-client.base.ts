import { createClient, OAuthStrategy } from "@wix/sdk";
import { productsV3 } from "@wix/stores";
import { reviews } from "@wix/reviews";
import { files } from "@wix/media";
import { members } from "@wix/members";
import { redirects } from "@wix/redirects";
import { env } from "@/config/env";

export function myWixClient() {
  return createClient({
    modules: {
      productsV3,
      redirects,
      files,
      reviews,
      members,
    },
    auth: OAuthStrategy({
      clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
    }),
  });
}
