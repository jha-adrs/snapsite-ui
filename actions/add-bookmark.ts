"use server"

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import logger from "@/lib/logger";
import { revalidatePath } from "next/cache";

// Used to add a bookmark to the current link data

export const addBookmark = async (hashedUrl: string, linkDataId: number) => {
    logger.info("addBookmark", { hashedUrl, linkDataId });
    const session = await getAuthSession();
    if (!session || !session.user) {
        return { success: false, error: "Unauthorized" };
    }
    let domain = "";
    let operationPerformed: "added" | "removed" = "added";
    try {
        await db.$transaction(async (tx) => {
            
            const user = await tx.user.findUnique({
                where: {
                    email: session.user?.email || "",
                },
                select: {
                    id: true,
                }
            })
            if (!user) {
                throw new Error("User not found");
            }
            const existingLinkData = await tx.linkdata.findUnique({
                where: {
                    id: linkDataId,
                    hashedUrl: hashedUrl,
                },
                select: {
                    id: true,
                    links: {
                        select: {
                            domains: {
                                select: {
                                    domain: true,
                                }
                            }
                        }
                    }
                }
            });
            if (!existingLinkData) {
                throw new Error("Link not found");
            }
            domain = existingLinkData.links.domains.domain;
            const existingBookmark = await tx.bookmarks.findUnique({
                where: {
                    userId_linkDataId: {
                        userId: user.id,
                        linkDataId: existingLinkData.id,
                    },
                    isDeleted: false,
                },
                select: {
                    id: true,
                }
            });
            if (!existingBookmark) {
                await tx.bookmarks.upsert({
                    where: {
                        userId_linkDataId: {
                            userId: user.id,
                            linkDataId: existingLinkData.id,

                        }
                    },
                    create: {
                        userId: user.id,
                        linkDataId: existingLinkData.id,

                    },
                    update: {
                        isDeleted: false,
                    }
                });
            }
            else {
                operationPerformed = "removed";
                await tx.bookmarks.update({
                    where: {
                        id: existingBookmark.id,
                    },
                    data: {
                        isDeleted: true,
                    }
                })
            }
        });
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong while updating!" };
    }
    revalidatePath('/dashboard');
    revalidatePath(`/view/${domain}?link=${hashedUrl}`)
    logger.info("addBookmark", { operationPerformed });
    return { success: true, message: `Bookmark ${operationPerformed}`, operationPerformed }
};