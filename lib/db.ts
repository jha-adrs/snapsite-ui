//"use server";
import { config } from "@/config/config";
import { PrismaClient } from "@prisma/client";
declare global {
    var cachedPrisma: PrismaClient;
}
let prisma : PrismaClient;
if( config.env === 'production' ){
    prisma = new PrismaClient();
}else{
    if( !global.cachedPrisma ){
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}
export const db = prisma;