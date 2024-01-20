import { config } from "@/config/config";
import { z } from "zod";

export const getLinkDataSchema = z.object({
    hashedUrl: z.string().min(1).max(20),
    take: z.number().min(1).max(100).default(10),
    skip: z.number().min(0).max(100).default(0),
    period: z.enum(["DAILY", "WEEKLY", "MONTHLY"]).default("DAILY"),
    timeRangeStart: z.date().optional(),
    timeRangeEnd: z.date().optional(),
})

export const PresignedURLApiResponseSchema = z.object({
    success: z.number(),
    message: z.string(),
    data: z.array(z.object({
        key: z.string(),
        url: z.string(),
    })).optional(),
})