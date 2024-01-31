"use server"
import { config } from '@/config/config';
import logger from '@/lib/logger';
import { getCurrentUser } from '@/lib/user';
import {
    GetObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { links_timing } from '@prisma/client';

const client = new S3Client({
    region: config.aws.region,
    credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
    },
});
export const getPresignedURL = async (key: string) => {
    const command = new GetObjectCommand({
        Bucket: config.aws.bucketName,
        Key: key,
    });
    const url = await getSignedUrl(client, command, { expiresIn: 86400 });
    return {
        key,
        url,
    }
};

type GetKeysType = {
    htmlObjectKey: string;
    screenshotObjectKey: string;
    thumbnailObjectKey: string;
};

export const getMultiplePresignedURLs = async (url: string, hashedUrl: string, timing: links_timing, keys: GetKeysType[]) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            throw new Error('User not found');
        }
        //logger.info('Getting keys', { keys, url, hashedUrl, timing });
        const presignedURLs: {
            key: string;
            url: string | null;
        }[] = [];
        for (const key of keys) {
            const { htmlObjectKey, screenshotObjectKey, thumbnailObjectKey } = key;
            const urls = await Promise.all([
                getPresignedURL(`${htmlObjectKey}`),
                getPresignedURL(`${screenshotObjectKey}`),
                getPresignedURL(`${thumbnailObjectKey}`),
            ]);
            //logger.info('Got presigned urls');
            if (urls.length === 3 && urls[0] && urls[1] && urls[2]) {
                presignedURLs.push(
                    {
                        key: htmlObjectKey,
                        url: urls[0].url,
                    },
                    {
                        key: screenshotObjectKey,
                        url: urls[1].url,
                    },
                    {
                        key: thumbnailObjectKey,
                        url: urls[2].url,
                    }
                );
            } else {
                logger.error('Error in getting multiple presigned urls', urls);
            }
        }

        return presignedURLs;
    } catch (error) {
        logger.error('Error in getMultiplePresignedURLService', error);
        return error;
    }
}
