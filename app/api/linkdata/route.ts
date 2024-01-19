// Gets link data and history from the db and returns historic linkdata
// and the link data itself
// Can be based daily, weekly, monthly, with take and skip for pagination

import { config } from "@/config/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import logger from "@/lib/logger";
import { getLinkDataSchema } from "@/lib/validators/get-link-data";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const session = await getAuthSession();
        if (!session || !session.user) {
            return new Response('Unauthorized', { status: 401 });
        }
        logger.info("POST /api/links/[hashedUrl]/route body", body);
        const { hashedUrl, take, skip, period, timeRangeStart, timeRangeEnd } = await getLinkDataSchema.parseAsync(body);

        logger.info("POST /api/links/[hashedUrl]/route hashedUrl", {
            hashedUrl,
            take,
            skip,
            period,
            timeRangeStart,
            timeRangeEnd,

        });
        const link = await db.links.findUnique({
            where: {
                hashedUrl: hashedUrl,

            },
            select: {
                url: true,
                hashedUrl: true,
                params: true,
                isActive: true,
                timing: true,
                domains: {
                    select: {
                        domain: true,
                        includeParams: true,
                    }
                },
            }
        });
        if (!link) {
            return new Response('Not found', { status: 404 })
        }
        const linkData = await db.linkdata.findMany({
            where: {
                hashedUrl: hashedUrl,
                timing: period,
                createdAt: {
                    lte: timeRangeEnd,
                    gte: timeRangeStart,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: take,
            skip: skip,
            select: {
                id: true,
                metadata: true,
                createdAt: true,
                htmlObjectKey: true,
                screenshotKey: true,
                thumbnailKey: true,
                timing: true,
                bookmarks: true,
            }
        });
        const requiredKeys = linkData.map((linkD) => {
            return {
                id: linkD.id,
                htmlObjectKey: linkD.htmlObjectKey,
                screenshotObjectKey: linkD.screenshotKey,
                thumbnailObjectKey: linkD.thumbnailKey,
            }
        })

        const keysRes = await axios.post(`${config.apiEndpoint}/tracker/multiplePresignedURL`, {
            url: link.url,
            hashedUrl: link.hashedUrl,
            timing: link.timing,
            keys: requiredKeys,
        })

        if ( !keysRes.data && !keysRes.data.success) { 
            logger.error("POST /api/links/[hashedUrl]/route error", keysRes.data);
            return new Response('Something went wrong', { status: 500 });
        }
        logger.info("POST /api/links/[hashedUrl]/route keysRes", keysRes.data);
        return new Response(JSON.stringify({
            link,
            linkData,
            keys: keysRes.data,
        }), { status: 200 });
    } catch (error) {
        logger.error("POST /api/links/[hashedUrl]/route error", error);
        return new Response('Error', { status: 500 })
    }
}