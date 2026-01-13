import { Tokens } from "@wix/sdk";
import { myWixClient } from "./wix-client.base";
import { cookies } from "next/headers";
import { WIX_SESSION_COOKIE } from "@/constants";
import { cache } from "react";

// FUNCTION TO CREATE WIX CLIENT ON THE SERVER WITH TOKENS FROM COOKIES
// WE CAN ALSO WRAP THIS FUNCTION IN A CACHE FOR PERFORMANCE BECAUSE
// THE TOKENS WILL NOT CHANGE DURING A SINGLE REQUEST LIFECYCLE SO WE CAN
// AVOID CREATING MULTIPLE CLIENT INSTANCES DURING THE SAME REQUEST
export const getWixServerClient = cache(async () => {
  let tokens: Tokens | undefined;

  // ATTEMPT TO RETRIEVE TOKENS FROM WIX SESSION COOKIE
  try {
    // WHEN WE USE THE COOKIES FUNCTION IN NEXT.JS, YOU DONT HAVE STATIC CACHING ANYMORE
    // BUT DYNAMIC CACHING IS OKAY BECAUSE WE WANT FRESH DATA ON EVERY REQUEST AS PRODUCT
    // PAGES SHOULD BE DYNAMIC - BECAUSE IF WE CHANGE DATA IN THE WIX CMS,
    // WE WANT TO REFLECT THAT CHANGE IMMEDIATELY.
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(WIX_SESSION_COOKIE); // GET THE WIX SESSION COOKIE

    // DEBUG LOGGING!
    console.log(
      "SESSION COOKIE EXISTS:",
      !!sessionCookie?.name && !!sessionCookie.value,
    );

    // IF COOKIE EXISTS, PARSE THE TOKENS
    if (sessionCookie?.value) {
      tokens = JSON.parse(sessionCookie.value);
    }
  } catch (error) {
    // LOG ANY ERRORS DURING PARSING - THROWS A NEXT ERROR OVERLAY
    console.error("Error parsing session cookie:", error);
  }

  // MIDDLEWARE SETS THE TOKENS AND ENSURES THEY EXIST,
  // SO WE CAN SAFELY CREATE A CLIENT WITH TOKENS SO THAT WE CAN TRACK THE USERS CART
  return myWixClient(tokens);
});
