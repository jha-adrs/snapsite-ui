// Handles external API calls to nodeJS backend

import { config } from '@/config/config';
import { links_timing } from '@prisma/client';
import axios from 'axios';
import logger from './logger';

export const startSingleCron = async (hashedUrl: string, timing: links_timing, originalUrl: string) => {
    const apiEndpoint = `${config.apiEndpoint}/tracker/start/single`;
    logger.info(`Starting cron for ${hashedUrl} with timing ${timing}`);
    const { data } = await axios.post(apiEndpoint, {
        hash: hashedUrl,
        timing,
        url: originalUrl,
    });
    logger.info(`Started cron for ${hashedUrl} with timing ${timing}`);
    console.log(data);
    return data;
}
