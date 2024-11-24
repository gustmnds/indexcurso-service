import { z } from "zod";

export const FindStorageSchema = z.object({
    id: z.string().uuid()
})
