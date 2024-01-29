"use server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";

// Get info about the link for a user
export const getLinkInfo = async (hash:string) => {
    const user = await getCurrentUser();
    if(!user){
        throw new Error("User not logged in");
    }
    const userLink = await db.userlinkmap.findFirst({
        where:{
            links:{
                hashedUrl:hash
            },
            userId:user.id
        },
        select: {
            id: true,
            assignedName: true,
            tags: true,
            timing: true,
            createdAt: true,
            updatedAt: true,
            links: {
                select: {
                    id: true,
                    url: true,
                    enablePriceTracker: true,
                }
            }
        },
    });
    if(!userLink){
        throw new Error("Link not found");
    }
    //Get count of linkdata
    const scrapeCount = await db.linkdata.count({
        where: {
            hashedUrl: hash,
        }
    })
    return {
        ...userLink,
        scrapeCount
    
    };
};

export type LinkInfoType = {
    id: number;
    assignedName: string;
    tags: string | null;
    timing: string;
    createdAt: Date;
    updatedAt: Date;
    links: {
        id: number;
        url: string;
        enablePriceTracker: boolean;
    }
    scrapeCount: number;
}