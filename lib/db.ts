// Ignore typescript errors
// @ts-nocheck
require('server-only');
import { config } from "@/config/config";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime/library";
import logger from "./logger";
import { postSlack } from "@/actions/post-slack";
declare global {
    var cachedPrisma: PrismaClient<PrismaClientOptions, 'info' | 'warn' | 'error' | 'query'>;
}
const options: Prisma.LogDefinition[] = [
    { level: 'query', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
];
let prisma: PrismaClient;
if (config.env === 'production') {
    prisma = new PrismaClient({
        log: options,

    });
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient({
            log: options,
        });
    }
    prisma = global.cachedPrisma;
}

prisma.$on('warn', (e:any) => {
    if(!e) return;
    logger.warn(e.message, e.target);
})
prisma.$on('info', (e) => {
    if(!e) return;
    logger.info(e.message, e.target)
})

prisma.$on('error', (e) => {
    if(!e) return;
    logger.error(e.message, e.target)
})
prisma.$on('query', (e) => {
    if(!e) return;
    if (e?.duration > 1000) {
        logger.warn("Execute Query Slow", { "Query": e.query, "Params": e.params, "Duration": `${e.duration}ms` })
    }
    else if (e?.duration > 1500) {
        logger.warn("Execute Query Very Slow", { "Query": e.query, "Params": e.params, "Duration": `${e.duration}ms` })
        postSlack(`Execute Query Very Slow: ${e.query} ${e.params} ${e.duration}ms`)
    }
    else {
        logger.verbose("Execute Query", { "Query": e.query, "Params": e.params, "Duration": `${e.duration}ms` })
    }
})

export const db = prisma;
