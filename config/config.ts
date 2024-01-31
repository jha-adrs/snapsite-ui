import { z } from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});
const envVarsSchema = z.object({
    NODE_ENV: z
        .enum(['production', 'development', 'test'])
        .refine((value) => value !== undefined, { message: 'NODE_ENV is required' }),
    PORT: z.coerce.number().default(3000),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    EXTERNAL_API_ENDPOINT: z.string().url().optional(),
    AWS_ACCESS_KEY_ID: z.string().describe('AWS access key ID'),
    AWS_SECRET_ACCESS_KEY: z.string().describe('AWS secret access key'),
    AWS_S3_BUCKET_NAME: z.string().describe('AWS S3 bucket name'),
    AWS_BUCKET_REGION: z.string().default('us-east-1').describe('AWS S3 bucket region'),
    SLACK_WEBHOOK_URL: z.string().url(),
});

const envVars = envVarsSchema.safeParse(process.env);

if (!envVars.success) {
    throw new Error(`Config validation error: ${envVars.error.message}`);
}


export const config = {
    env: envVars.data.NODE_ENV,
    port: envVars.data.PORT,
    isProduction: envVars.data.NODE_ENV === 'production',
    isDevelopment: envVars.data.NODE_ENV === 'development',
    isTest: envVars.data.NODE_ENV === 'test',
    googleClientId: envVars.data.GOOGLE_CLIENT_ID,
    googleClientSecret: envVars.data.GOOGLE_CLIENT_SECRET,
    apiEndpoint: envVars.data.EXTERNAL_API_ENDPOINT,
    aws: {
        accessKeyId: envVars.data.AWS_ACCESS_KEY_ID,
        secretAccessKey: envVars.data.AWS_SECRET_ACCESS_KEY,
        bucketName: envVars.data.AWS_S3_BUCKET_NAME,
        region: envVars.data.AWS_BUCKET_REGION,
    },
    slack: {
        webhookUrl: envVars.data.SLACK_WEBHOOK_URL,
    }
};

