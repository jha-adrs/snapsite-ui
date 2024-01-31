"use server"

import { config } from "@/config/config";
import logger from "@/lib/logger";
import axios from "axios";

export const postSlack = async(message: string) => {
    try {
        const res = await axios.post(config.slack.webhookUrl, {
            text: `:robot_face:  ${message}\n Env:(${config.env})`,
        });
        if (res.status === 200) {
            logger.info('Slack message sent', { message });
        }
    } catch (error) {
        logger.error('Error in sending slack message', error);
    }
}