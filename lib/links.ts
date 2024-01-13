// Utils for handling links
import { createHash } from "crypto";
import logger from "./logger";
import { getAuthSession } from "./auth";
import { db } from "./db";
const length = 20;
export const getHash = (url: string) => {
    try {
        const urlObj = new URL(url);
        const hash = createHash("sha256");
        hash.update(urlObj.href);
        return hash.digest("hex").slice(0, length);
    } catch (error) {
        logger.error("Error in getHash fn [links.ts]", error);
        throw new Error("Error in getHash fn [links.ts]");
    }
};


export const getUserLinks = async (
    takeLinks: number = 5,
    skipLinks: number = 0
) => {
    try {
        logger.info("getUserLinks fn [links.ts]");
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
            logger.error("No user found in getUserLinks fn [links.ts]");
            throw new Error("No user found in getUserLinks fn [links.ts]");
        }
        const links = await db.userlinkmap.findMany({
            where: {
                userId: user.id,
            },
            take: takeLinks,
            skip: skipLinks,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                assignedName: true,
                tags: true,
                createdAt: true,
                timing: true,
                links: {
                    select: {
                        hashedUrl: true,
                        url: true,
                        isActive: true,
                        domains: {
                            select:{
                                domain: true,
                            
                            }
                        }
                    }
                }
            }


        })
        return links;
    } catch (error) {
        logger.error("Error in getUserLinks fn [links.ts]", error);
        throw new Error("Error in getUserLinks fn [links.ts]");
    }
}

export type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
export type UserLinksType = PromiseType<ReturnType<typeof getUserLinks>>;