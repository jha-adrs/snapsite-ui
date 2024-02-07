"use server";

import { getAuthSession } from "@/lib/auth";
import { csvJSONSchema } from "@/lib/csv-reader";
import { db } from "@/lib/db";
import { getHash } from "@/lib/links";
import logger from "@/lib/logger";
import { addNotification } from "@/lib/notification";
import { links_timing } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";


interface AddMultipleLinksResponse {
    success: boolean;
    failed: number;
    failedLinks: any[];
}
export const addMultipleLinks = async (data: z.infer<typeof csvJSONSchema>): Promise<AddMultipleLinksResponse> => {
    logger.info("Adding multiple links");
    const session = await getAuthSession();
    if (!session || !session?.user || !session?.user?.email) {
        throw new Error("Unauthorized");
    }
    const user = await db.user.findUniqueOrThrow({
        where: {
            email: session.user.email,
        },
        select: {
            id: true,
        }
    });

    let failed = 0;
    interface failedLinks {

        url: string;
        timing: "DAILY" | "WEEKLY" | "MONTHLY";
        name: string;
        tags: string;

        error?: any;
    }
    const failedLinks: failedLinks[] = [];
    let success = 0;

    try {
        const resp = await db.$transaction(async (db) => {

            const promiseResponse = await Promise.allSettled(
                data.map(async (link) => {
                    return addLinkWithTransaction(link, user, db);
                })
            );
            for (const res of promiseResponse) {
                if (res.status === "fulfilled") {
                    success++;
                } else {
                    failed++;
                }
            }
        }, {
            timeout: 9500
        });
        logger.info("Created links", { success, failed, failedLinks });
        addNotification({
            message: "Added links",
            description: `Succesfully added links from CSV file. ${success} links added, ${failed} failed.`,
            priority: "HIGH",
            extraData: {
                success,
                failed,
                failedLinks,
            }
        });
        revalidatePath("/dashboard");
        revalidatePath("/view");
        logger.info("Created links", { success, failed, failedLinks });

        return {
            success: true,
            failed,
            failedLinks,
        }
    } catch (error) {
        logger.error("Failed to add links", { error });
        addNotification({
            message: "Failed to add links",
            description: "Failed to add links from CSV, please try again later.",
            priority: "HIGH",
            extraData: {
                success,
                failed,
                failedLinks,
            }
        });
        return {
            success: false,
            failed,
            failedLinks,
        }
    }

    // for (const link of data) {
    //     try {
    //         if (link.url.startsWith('http://localhost') || link.url.startsWith('https://localhost')) {
    //             throw new Error('Cannot add links that start with localhost');
    //         }
    //         const urlObj = new URL(link.url);
    //         const domain = urlObj.hostname;
    //         const params = urlObj.search
    //         const hash = getHash(link.url);
    //         const createRes = await db.$transaction(async (db) => {
    //             const domainRes = await db.domains.upsert({
    //                 where: {
    //                     domain,
    //                 },
    //                 update: {
    //                     domain,
    //                 },
    //                 create: {
    //                     domain,
    //                 },
    //                 select: {
    //                     id: true,
    //                     domain: true,
    //                 }
    //             });

    //             const linkRes = await db.links.upsert({
    //                 where: {
    //                     hashedUrl: hash,
    //                 },
    //                 update: {
    //                     url: link.url,
    //                     params: params,
    //                     hashedUrl: hash,
    //                     timing: link.timing,
    //                     domainId: domainRes.id,
    //                 },
    //                 create: {
    //                     url: link.url,
    //                     hashedUrl: hash,
    //                     timing: link.timing,
    //                     domainId: domainRes.id,
    //                     params: params,
    //                 },
    //                 select: {
    //                     id: true,
    //                     url: true,
    //                     hashedUrl: true,
    //                     timing: true,
    //                     domainId: true,
    //                     createdAt: true,
    //                 }
    //             });
    //             const userLinkRes = await db.userlinkmap.upsert({
    //                 where: {
    //                     userId_linkId: {
    //                         userId: user.id,
    //                         linkId: linkRes.id,
    //                     }
    //                 },
    //                 update: {
    //                     userId: user.id,
    //                     linkId: linkRes.id,
    //                     assignedName: link.name,
    //                     tags: JSON.stringify(link.tags),
    //                     timing: link.timing,
    //                 },
    //                 create: {
    //                     userId: user.id,
    //                     linkId: linkRes.id,
    //                     assignedName: link.name,
    //                     tags: JSON.stringify(link.tags),
    //                     timing: link.timing,
    //                 },
    //                 select: {
    //                     id: true,
    //                 }
    //             });
    //             const userDomainRes = await db.userdomainmap.upsert({
    //                 where: {
    //                     userId_domainId: {
    //                         userId: user.id,
    //                         domainId: domainRes.id,
    //                     }
    //                 },
    //                 update: {
    //                     userId: user.id,
    //                     domainId: domainRes.id,
    //                 },
    //                 create: {
    //                     userId: user.id,
    //                     domainId: domainRes.id,
    //                 },
    //                 select: {
    //                     id: true,
    //                 }
    //             });

    //             return {
    //                 link: linkRes,
    //                 userLink: userLinkRes,
    //                 domain: domainRes,
    //                 userDomain: userDomainRes,
    //             }

    //         });
    //         success++;


    //     } catch (error) {
    //         failed++;
    //         failedLinks.push({
    //             ...link,
    //             error: error
    //         });
    //         continue;
    //     }
    // }
    //Using Promise All 
    //const response = await Promise.allSettled(promises);

}

const addLinkWithTransaction = async (link: any, user: any, db: any) => {

    try {
        if (link.url.startsWith('http://localhost') || link.url.startsWith('https://localhost')) {
            throw new Error('Cannot add links that start with localhost');
        }
        const urlObj = new URL(link.url);
        const domain = urlObj.hostname;
        const params = urlObj.search
        const hash = getHash(link.url);
        const domainRes = await db.domains.upsert({
            where: {
                domain,
            },
            update: {
                domain,
            },
            create: {
                domain,
            },
            select: {
                id: true,
                domain: true,
            }
        });

        const linkRes = await db.links.upsert({
            where: {
                hashedUrl: hash,
            },
            update: {
                url: link.url,
                params: params,
                hashedUrl: hash,
                timing: link.timing,
                domainId: domainRes.id,
            },
            create: {
                url: link.url,
                hashedUrl: hash,
                timing: link.timing,
                domainId: domainRes.id,
                params: params,
            },
            select: {
                id: true,
                url: true,
                hashedUrl: true,
                timing: true,
                domainId: true,
                createdAt: true,
            }
        });
        const userLinkRes = await db.userlinkmap.upsert({
            where: {
                userId_linkId: {
                    userId: user.id,
                    linkId: linkRes.id,
                }
            },
            update: {
                userId: user.id,
                linkId: linkRes.id,
                assignedName: link.name,
                tags: JSON.stringify(link.tags),
                timing: link.timing,
            },
            create: {
                userId: user.id,
                linkId: linkRes.id,
                assignedName: link.name,
                tags: JSON.stringify(link.tags),
                timing: link.timing,
            },
            select: {
                id: true,
            }
        });
        const userDomainRes = await db.userdomainmap.upsert({
            where: {
                userId_domainId: {
                    userId: user.id,
                    domainId: domainRes.id,
                }
            },
            update: {
                userId: user.id,
                domainId: domainRes.id,
            },
            create: {
                userId: user.id,
                domainId: domainRes.id,
            },
            select: {
                id: true,
            }
        });

        return {
            link: linkRes,
            userLink: userLinkRes,
            domain: domainRes,
            userDomain: userDomainRes,
        }
        //success++; Wont work here as it will be called multiple times concurrently

    } catch (error) {
        //failed++;
        logger.error("Failed to add link", { link, error });
        // failedLinks.push({
        //     ...link,
        //     error: error
        // });
        throw error;

    }
};