import { NextRequest, NextResponse } from "next/server";
import { env } from "@/config/env";

export async function POST(req: NextRequest) {
  try {
    // PARSE THE VARIANT ID FROM THE REQUEST
    const { variantId } = (await req.json()) as { variantId: string };

    // VALIDATE PRESENCE OF VARIANT ID
    if (!variantId) {
      return NextResponse.json({ error: "Missing variantId" }, { status: 400 });
    }

    // GET ENV VARIABLES USING T3ENV
    const apiKey = env.WIX_API_KEY;
    const siteId = env.WIX_SITE_ID;

    // CHECK FOR MISSING ENV VARIABLES
    if (!apiKey || !siteId) {
      return NextResponse.json(
        { error: "Missing server env" },
        { status: 500 },
      );
    }

    // USE QUERY PAYLOAD INSTEAD OF SEARCH
    const queryPayload = {
      query: {
        filter: {
          variantId: {
            $eq: variantId,
          },
        },
      },
    };

    // WIX API ENDPOINT - https://dev.wix.com/docs/sdk/backend-modules/stores/catalog-v3/inventory-items-v3/query-inventory-items
    // SET AUTHORIZATION & SITE ID HEADERS
    const wixRes = await fetch(
      "https://www.wixapis.com/stores/v3/inventory-items/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
          "wix-site-id": siteId,
        },
        body: JSON.stringify(queryPayload),
        cache: "no-store",
      },
    );

    // HANDLE WIX API ERRORS
    if (!wixRes.ok) {
      // LOG FULL ERROR RESPONSE FOR DEBUGGING
      const errorText = await wixRes.text();
      console.error("Wix API Error Response:", errorText);
      console.error("Status:", wixRes.status);

      // RETURN NEXT RESPONSE WITH ERROR DETAILS
      return NextResponse.json(
        {
          error: "Wix API request failed",
          status: wixRes.status,
          details: errorText,
        },
        { status: 502 },
      );
    }

    // PARSE WIX RESPONSE DATA WHICH FROM THE SERVER WE CANNOT USE DIRECTLY
    const data = await wixRes.json();

    // EXTRACT THE FIRST ITEM (SHOULD ONLY BE ONE PER VARIANT ID)
    const item = data?.inventoryItems?.[0];

    // IF NO ITEM FOUND, ASSUME UNLIMITED STOCK
    if (!item) {
      return NextResponse.json({
        variantId,
        inStock: true,
        trackQuantity: false,
        quantity: null,
        message: "No inventory item found - unlimited stock",
      });
    }

    // DETERMINE STOCK STATUS BASED ON WIX LOGIC
    const trackQuantity = item.trackQuantity ?? false;

    // QUANTITY MAY BE UNDEFINED IF NOT TRACKED
    const quantity = typeof item.quantity === "number" ? item.quantity : null;

    // AVAILABILITY STATUS FROM WIX
    const availabilityStatus = item.availabilityStatus;

    // USE WIX AVAILABILITY STATUS TO DETERMINE IN STOCK
    let inStock: boolean;

    // IF OUT_OF_STOCK, SET TO FALSE, IF AVAILABLE OR PARTIALLY_OUT_OF_STOCK, SET TO TRUE
    if (availabilityStatus === "OUT_OF_STOCK") {
      inStock = false;
    } else if (
      availabilityStatus === "AVAILABLE" ||
      availabilityStatus === "PARTIALLY_OUT_OF_STOCK"
    ) {
      inStock = true;
    } else if (typeof item.inStock === "boolean") {
      inStock = item.inStock;
    } else if (trackQuantity) {
      inStock = (quantity ?? 0) > 0;
    } else {
      inStock = true;
    }

    // RETURN THE STOCK DATA
    // _DEBUG FIELD INCLUDES RAW WIX DATA FOR DEBUGGING PURPOSES
    return NextResponse.json({
      variantId,
      inStock,
      trackQuantity,
      quantity,
      availabilityStatus,
      _debug: {
        rawInStock: item.inStock,
        rawQuantity: item.quantity,
        rawTrackQuantity: item.trackQuantity,
        rawAvailabilityStatus: item.availabilityStatus,
        fullItem: item,
      },
    });
  } catch (error) {
    // CATCH ALL ERROR HANDLING
    console.error("Variant stock API error:", error);

    // RETURN 500 ERROR RESPONSE
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
