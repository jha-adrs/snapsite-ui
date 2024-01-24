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
                    linkdata: {
                        select: {
                            _count: true,
                        }
                    }
                }
            }
        },
    });
    if(!userLink){
        throw new Error("Link not found");
    }
    return userLink;
};

export type LinkInfoType = {
    id: string;
    assignedName: string;
    tags: string;
    timing: string;
    createdAt: Date;
    updatedAt: Date;
    links: {
        id: string;
        url: string;
        enablePriceTracker: boolean;
        linkdata: {
            _count: number;
        }
    }
}