// Implemented using papa-parse
import Papa from 'papaparse';
import { z } from 'zod';

export const csvJSONSchema = z.array(z.object({
    name: z.string(),
    tags: z.string(), // TODO : z.array(z.string())
    timing: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']),
    url: z.string().url(),
}))

interface CsvToJsonResponse {
    success: boolean;
    error?: any;
    data?: z.infer<typeof csvJSONSchema>;
    count?: number;
    message?: string;
}

export async function convertCsvToJson(file: File): Promise<CsvToJsonResponse> {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {

                resolve(validateCsv(result.data));
            },
            error: (error) => {
                reject(error);
            }
        });
    });
}

export const validateCsv = (data: any) => {
    try {
        const validationRes = csvJSONSchema.parse(data);
        const length = validationRes.length;
        if (length === 0 || length > 20) {
            return {
                success: false,
                error: "Invalid Length",
                message: "CSV File should have atleast 1 and atmost 20 rows.",
            }
        }
        console.log("Validation Success");
        return {
            success: true,
            data: validationRes,
            count: length,
        }
    } catch (error) {
        return {
            success: false,
            error,
        }
    }
}