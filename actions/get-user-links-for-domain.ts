"use server"
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserDomainLinks } from "@/lib/links";
import logger from "@/lib/logger";

export const getUserLinksForDomain = async (domain: string, take: number, skip: number) => {
    try {
        logger.info(`getUserLinksForDomain fn [links.ts] called with domain: ${domain}, take: ${take}, skip: ${skip}`);
        if (!domain) {
            return [];
        }
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
            logger.error("No user found in getUserDomainLinks fn [links.ts]");
            throw new Error("No user found in getUserDomainLinks fn [links.ts]");
        }
        const links = await db.userlinkmap.findMany({
            where: {
                userId: user.id,
                links: {
                    domains: {
                        domain: domain,
                    }
                }
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
                    }
                }
            },
        });
        return links;

    } catch (error) {
        logger.error(`Error in getUserDomainLinks fn [links.ts] ${error}`);
        throw error;
    }
}

export type GetUserLinksForDomain = ReturnType<typeof getUserLinksForDomain>;