import { z } from 'zod';

export const queryParamsSchema = z.object({
  page: z.number().catch(1),
  search: z.string().catch('').optional(),
});

export type QueryParamsType = z.infer<typeof queryParamsSchema>;
