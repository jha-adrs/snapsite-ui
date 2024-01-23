import { getAuthSession } from "./auth";
import { db } from "./db";
import logger from "./logger";

export const getUserByEmailPublic = async (email: string) => {
    try {
        logger.info("getUserByEmail fn [user.ts]");

        const user = await db.user.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                email: true,
            }
        });
        return user;
    } catch (error) {
        throw new Error("Error in getUserByEmail fn [user.ts]");
    }
}

// To get counts of links, domains, notifications etc.
export const getUserCountData = async () => {
    try {
        const session = await getAuthSession();
        if (!session || !session.user || !session.user.email) {
            throw new Error("No session found");
        }
        const user = await db.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                id: true,
                email: true,
            }
        });
        if (!user) {
            logger.error("No user found in getUserCountData fn [user.ts]");
            throw new Error("No user found in getUserCountData fn [user.ts]");
        }
        // Prisma queries work only when awaited or then catched
        const linkCount = db.userlinkmap.count({
            where: {
                userId: user.id,
            }
        });
        const domainCount = db.userdomainmap.count({
            where: {
                userId: user.id,
            }
        });
        const notificationCount = db.notifications.count({
            where: {
                userId: user.id,
            }
        });
        const bookmarkCount = db.bookmarks.count({
            where: {
                userId: user.id,
            }
        })

        const [links, domains, notifications, bookmarks] = await Promise.all([linkCount, domainCount, notificationCount, bookmarkCount]);
        logger.info("getUserCountData fn [user.ts]");
        return { links, domains, notifications,bookmarks };
    } catch (error) {
        logger.error("Error in getUserCountData fn [user.ts]", error);
        throw new Error("Error in getUserCountData fn [user.ts]");
    }
}

// TODO: Needs review
export type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type UserCountDataType = PromiseType<ReturnType<typeof getUserCountData>>;