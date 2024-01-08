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
};