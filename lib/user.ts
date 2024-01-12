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
                image: true,
            }
        });
        return user;
    } catch (error) {
        throw new Error("Error in getUserByEmail fn [user.ts]");
    }
}

export const getUserCountData = async () => {
    try {
        const session = await getAuthSession();
        if (!session || !session.user || !session.user.email) {
            return 0;
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
            return 0;
        }
        const linksCount = await db.userlinkmap.count({
            where: {
                userId: user.id,
            },
        });
        const domainCount = await db.userlinkmap.count({
            where: {
                userId: user.id,
                links: {
                    domains: {

                    }
                }
            }
        })
        return linksCount;
    } catch (error) {

    }
}