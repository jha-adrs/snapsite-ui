"use server";

import { Notification_Priority } from "@prisma/client";
import { getAuthSession } from "./auth";
import { db } from "./db";
import { getCurrentUser } from "./user";
import logger from "./logger";

// manage user notifications

interface NotificationProps {
    message: string;
    description?: string;
    extraData?: object;
    priority: Notification_Priority;
}

export const addNotification = async ({ message, description, extraData, priority }: NotificationProps) => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("No user found");
    }
    const notification = await db.notifications.create({
        data: {
            message,
            description,
            extraData,
            priority,
            userId: user.id,
        }
    });
    logger.info("Added notification", { notification });
}

interface ChangeNotificationReadStatusProps {
    id: number;
    read: boolean;
}

export const changeNotificationReadStatus = async ({ id, read }: ChangeNotificationReadStatusProps) => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("No user found");
    }
    const notification = await db.notifications.update({
        where: {
            id: id,
        },
        data: {
            readStatus: read,
        }
    });
    logger.info("Updated notification", { notification });
}

export const getNotifications = async () => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("No user found");
    }
    const notifications = await db.notifications.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 10,
    });
    return notifications;
}