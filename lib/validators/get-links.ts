//Validator for getLinks
import {z} from 'zod';

export const getLinksValidator = z.object({
    domain: z.string().optional(),
    limit: z.number().int().min(1).max(50).optional(),
    offset: z.number().int().min(0).optional(),
    orderBy: z.enum(['createdAt', 'updatedAt']).optional(),
    order: z.enum(['ASC', 'DESC']).optional(),
    search: z.string().optional()
});