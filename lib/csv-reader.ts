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
        console.log("Validation Success");
        return {
            success: true,
            data: validationRes,
        }
    } catch (error) {
        return {
            success: false,
            error,
        }
    }
}