import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { env } from "./config/env";
import { NextRequest, NextResponse } from "next/server";
import { WIX_SESSION_COOKIE } from "./constants";

// CREATING A NEW CLIENT BECAUSE WE NEED ANY MODULES FROM OUR MAIN WIX CLIENT
const wixClient = createClient({
  auth: OAuthStrategy({
    clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
  }),
});

export default async function proxy(request: NextRequest) {
  const cookies = request.cookies; // GET THE COOKIES FROM THE REQUEST
  const sessionCookie = cookies.get(WIX_SESSION_COOKIE); // CHECK FOR A SPECIFIC COOKIE IN THE DATA STORE

  let sessionTokens = sessionCookie
    ? (JSON.parse(sessionCookie.value) as Tokens) // PARSE THE COOKIE VALUE IF IT EXISTS
    : await wixClient.auth.generateVisitorTokens(); // OTHERWISE, GENERATE NEW VISITOR TOKENS - THIS IS FOR ANONYMOUS USERS

  if (sessionTokens.accessToken.expiresAt < Math.floor(Date.now() / 1000)) {
    // CHECK IF THE ACCESS TOKEN IS EXPIRED (IN THE PAST)
    try {
      sessionTokens = await wixClient.auth.renewToken(
        sessionTokens.refreshToken,
      ); // RENEW THE TOKENS USING THE REFRESH TOKEN BECAUSE THE ACCESS TOKEN IS EXPIRED
    } catch (error) {
      sessionTokens = await wixClient.auth.generateVisitorTokens(); // IF RENEWAL FAILS, GENERATE NEW VISITOR TOKENS BECAUSE THE REFRESH TOKEN IS INVALID
    }
  }

  request.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens)); // SET THE UPDATED TOKENS IN THE REQUEST COOKIES

  const res = NextResponse.next({ request }); // CREATE A NEXT RESPONSE OBJECT

  // SET THE MAX AGE, SECURE AND HTTP ONLY FLAGS FOR THE COOKIE IN THE RESPONSE
  res.cookies.set(WIX_SESSION_COOKIE, JSON.stringify(sessionTokens), {
    maxAge: 60 * 60 * 24 * 7, // 7 DAYS
    secure: process.env.NODE_ENV === "production",
  });

  // RETURN THE RESPONSE OBJECT
  return res;
}

// CREATE A MATCHER TO APPLY THE MIDDLEWARE TO SPECIFIC ROUTES
// THIS EXCLUDES STATIC FILES AND NEXT.JS ASSETS AND ONLY APPLIES TO PAGE ROUTES AND API ROUTES
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
