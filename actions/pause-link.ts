"use server"
import { db } from "@/lib/db";
import logger from "@/lib/logger";
import { getCurrentUser } from "@/lib/user";
export const pauseLink = async (hash: string) => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("User not logged in");
    }
    const link = await db.links.findFirst({
        where: {
            hashedUrl: hash
        },
        select: {
            id: true,
            url: true,
            enablePriceTracker: true,

        }
    });
    if (!link) {
        throw new Error("Link not found");
    }
    const updateStatus = await db.userlinkmap.update({
        where: {
            userId_linkId: {
                linkId: link.id,
                userId: user.id
            }
        },
        data: {
            isPaused: true
        }
    });
    logger.info("Link paused", { linkId: link.id, userId: user.id });
    return updateStatus;
}