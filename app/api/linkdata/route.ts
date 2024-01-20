// Gets link data and history from the db and returns historic linkdata
// and the link data itself
// Can be based daily, weekly, monthly, with take and skip for pagination

import { config } from "@/config/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import logger from "@/lib/logger";
import { getUserByEmailPublic } from "@/lib/user";
import { PresignedURLApiResponseSchema, getLinkDataSchema } from "@/lib/validators/get-link-data";
import { $Enums, Bookmarks, Prisma, linkdata } from "@prisma/client";
import axios from "axios";
import { find, get } from "lodash";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const session = await getAuthSession();
        if (!session || !session.user || !session.user.email) {
            return new Response('Unauthorized', { status: 401 });
        }
        logger.info("POST /api/links/[hashedUrl]/route body");
        const { hashedUrl, take, skip, period, timeRangeStart, timeRangeEnd } = await getLinkDataSchema.parseAsync(body);

        logger.info("POST /api/links/[hashedUrl]/route hashedUrl", {
            hashedUrl,
            take,
            skip,
            period,
            timeRangeStart,
            timeRangeEnd,

        });
        const user = await getUserByEmailPublic(session.user.email);
        if(!user) {
            return new Response('Unauthorized', { status: 401 });
        }
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
                bookmarks: {
                    where: {
                        userId: user.id, // Returns the bookmark
                        isDeleted: false,
                    },
                    select: {
                        id: true,
                    }
                }
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

        if (!keysRes || !keysRes.data || !keysRes.data.success || !keysRes.data.data) {
            logger.error("POST /api/links/[hashedUrl]/route error",);
            return new Response('Something went wrong', { status: 500 });
        }
        logger.info("POST /api/links/[hashedUrl]/route keysRes");
        const {
            success,
            message,
            data,
        } = await PresignedURLApiResponseSchema.parseAsync(keysRes.data);
        const finalResponse = linkData.map((linkD, index) => {
            return {
                id: linkD.id,
                metadata: linkD.metadata,
                createdAt: linkD.createdAt,
                bookmarked: linkD.bookmarks.length > 0,
                html: {
                    objectKey: linkD.htmlObjectKey,
                    url: data?.filter((d) => d.key === linkD.htmlObjectKey)[0]?.url,
                },
                thumbnail: {
                    objectKey: linkD.thumbnailKey,
                    url: data?.filter((d) => d.key === linkD.thumbnailKey)[0]?.url,
                },
                screenshot: {
                    objectKey: linkD.screenshotKey,
                    url: data?.filter((d) => d.key === linkD.screenshotKey)[0]?.url,
                }
            }
        });

        return new Response(JSON.stringify({
            link,
            linkData,
            keys: finalResponse,
        }), { status: 200 });
    } catch (error) {
        logger.error("POST /api/links/[hashedUrl]/route error", error);
        return new Response('Error', { status: 500 })
    }
}


export type LinkDataType = {
    link: {
        url: string;
        hashedUrl: string;
        params: string | null;
        isActive: boolean;
        timing: $Enums.links_timing;
        domains: {
            domain: string;
            includeParams: boolean;
        };
    };
    linkData: {
        id: linkdata["id"];
        metadata: linkdata["metadata"];
        createdAt: linkdata["createdAt"];
        htmlObjectKey: linkdata["htmlObjectKey"];
        screenshotKey: linkdata["screenshotKey"];
        thumbnailKey: linkdata["thumbnailKey"];
        timing: linkdata["timing"];
        bookmarked: boolean;
    };
    keys: {
        id: linkdata["id"];
        metadata: linkdata["metadata"];
        createdAt: Date;
        bookmarked: boolean;
        html: {
            objectKey: string;
            url: string | undefined;
        };
        thumbnail: {
            objectKey: string;
            url: string | undefined;
        };
        screenshot: {
            objectKey: string;
            url: string | undefined;
        };
    }[];
}