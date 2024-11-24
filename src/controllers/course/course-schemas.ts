import { z } from "zod";

export const CreateCourseSchema = z.object({
    name: z.string().min(1).max(512),
    description: z.string().max(2048),
    platform: z.string().min(1).max(256),
    author: z.string().min(1).max(256),
    url: z.string().url(),
    popularity: z.number().int().min(0).default(0),
    logo: z.string().base64(),
    banner: z.string().base64()
})

export const UpdateCourseSchema = CreateCourseSchema.partial().extend({
    id: z.string().uuid()
})

export const FindCourseSchema = z.object({
    id: z.string().uuid()
});

export const SearchCourseSchema = z.object({
    name: z.string().optional()
});
