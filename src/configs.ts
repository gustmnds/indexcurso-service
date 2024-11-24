import { z } from "zod";

const configSchema = z.object({
    PORT: z.coerce.number().int().nonnegative(),
    DATABASE_URL: z.string().url(),
    STORAGE_URL: z.string().url(),
    JWT_SECRET: z.string()
});

export type ProjectConfigs = z.infer<typeof configSchema>;
export const Configs = configSchema.parse(process.env);
