import logger from "@/lib/logger";
import { getLinksValidator } from "@/lib/validators/get-links";
import { NextRequest } from "next/server";

// Fetch links for a given user and domain
export async function POST(req: NextRequest) {
    logger.info("POST /api/links", );
    // Domain comes in params
    const body = await req.json();

    return new Response(JSON.stringify({}), {status: 200});
}