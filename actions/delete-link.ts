"use server"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db";
import logger from "@/lib/logger";
import { revalidatePath } from "next/cache";

export const deleteLink = async (hashedUrl: string) => {
    logger.info("Deleting link", { hashedUrl });
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
    if (!user) {
        throw new Error("Unauthorized");
    }

    const existingLink = await db.links.findUnique({
        where: {
            hashedUrl,
        },
        select: {
            id: true,
            url: true,
            hashedUrl: true,
            domains: {
                select: {
                    id: true,
                    domain: true,
                }
            }
        }
    });
    if (!existingLink) {
        logger.error("Link not found while deleting", { hashedUrl });
        throw new Error("Link not found");
    }
    const linkId = existingLink.id;
    const linkUrl = existingLink.url;
    const linkDomain = existingLink.domains.domain;
    const linkDomainId = existingLink.domains.id;
    const linkHashedUrl = existingLink.hashedUrl;
    // Check hash
    if (linkHashedUrl !== hashedUrl) {
        logger.error("Hash mismatch", { linkHashedUrl, hashedUrl });
        throw new Error("Hash mismatch");
    }
    // Delete link
    // This won't  run unless await is used
    try {
        const deleteRes = await db.$transaction(async (db) => {
            const deleteUserLinkMap = await db.userlinkmap.delete({
                where: {
                    userId_linkId: {
                        userId: user.id,
                        linkId,
                    }
                }
            });
            // Check if the link is used by any other user
            const linkUserLinkMap = await db.userlinkmap.count({
                where: {
                    linkId,
                }
            });
            if (linkUserLinkMap === 0) {
                // Set link as inactive
                const deleteLink = await db.links.update({
                    where: {
                        id: linkId,
                    },
                    data: {
                        isActive: false,
                    }
                });
            }
            //Check if the domain is used by any other link
            const domainUserMapRes = await db.userdomainmap.count({
                where: {
                    domainId: linkDomainId,
                    userId: user.id,
                }
            });
            if (domainUserMapRes === 0) {
                // Delete domain
                const deleteDomain = await db.userdomainmap.delete({
                    where: {
                        userId_domainId: {
                            userId: user.id,
                            domainId: linkDomainId,
                        }
                    }
                });
            }
            return {
                deleteUserLinkMap,
                linkUserLinkMap,
                domainUserMapRes,
            }
        })
        revalidatePath('/view');
        revalidatePath('/dashboard');
        revalidatePath(`/view/${linkDomain}/${hashedUrl}`);
        
        logger.info("Link deleted", { deleteRes });
        return true;
    } catch (error) {
        logger.error("Error while deleting link", { error });
        return false;
    }



}