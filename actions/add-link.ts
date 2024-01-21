"use server"
import { startSingleCron } from "@/lib/api";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getHash } from "@/lib/links";
import logger from "@/lib/logger";
import { links_timing } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Add a link to the database for the 

interface AddLinkProps {
    url: string;
    timing: links_timing;
    tags: string[];
    assignedName: string;
}

export const addLink = async ({
    url,
    timing,
    tags,
    assignedName,
}: AddLinkProps) => {

    // Check if the link already exists
    // If it does, return the hash
    // If it doesn't, create a new link
    // and return the hash
    logger.info("Adding link", { url, timing, tags, assignedName });
    // Inorder to avoid links pointing to the server itself 
    if (url.startsWith('http://localhost') || url.startsWith('https://localhost')) {
        throw new Error('Cannot add links that start with localhost');

    }
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
    // Reformat url to inclde http if not present
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const params = urlObj.search
    const hash = getHash(url);

    const createRes = await db.$transaction(async (db) => {
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
                url: url,
                params: params,
                hashedUrl: hash,
                timing,
                domainId: domainRes.id,
            },
            create: {
                url: url,
                hashedUrl: hash,
                timing,
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
                assignedName,
                tags: JSON.stringify(tags),
                timing,
            },
            create: {
                userId: user.id,
                linkId: linkRes.id,
                assignedName,
                tags: JSON.stringify(tags),
                timing,
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

    });

    revalidatePath("/dashboard");
    revalidatePath("/view");
    revalidatePath(`/view/${domain}`);
    logger.info("Created link", { createRes })
    
    const now = new Date();
    const timeDiff = createRes.link.createdAt.getTime() - now.getTime();
    //Start the cron job only if the link was created in the last 2 seconds
    // if(timeDiff < 2000){
    //     logger.info("Starting cron job as time is less than 2sec ", {hash, timing, url});
    //     startSingleCron(hash, timing, url); // Start the cron job for the link
    // }

    if (createRes.userLink.id) {
        return true;
    }
    return false;


}