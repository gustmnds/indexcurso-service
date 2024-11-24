import { z } from "zod";
import { CreateCourseSchema, FindCourseSchema, SearchCourseSchema, UpdateCourseSchema } from "../controllers/course/course-schemas";
import { StorageService } from "./storage-service";
import { prisma } from "../prisma";
import path from "path";
import { Configs } from "../configs";
import { CourseNotFound } from "../utils/errors/course-not-found-error";

export class CourseService {
    public static async create(createCourseDto: z.infer<typeof CreateCourseSchema>) {
        const { banner, logo, ...course } = createCourseDto;

        const [bannerId, logoId] = await Promise.all([
            StorageService.createImage(Buffer.from(banner, "base64url")),
            StorageService.createImage(Buffer.from(logo, "base64url"))
        ]);

        const courseData = await prisma.courses.create({
            data: {
                ...course,
                banner: path.posix.join(Configs.STORAGE_URL, "image", bannerId),
                logo: path.posix.join(Configs.STORAGE_URL, "image", logoId),
            }
        });

        return courseData;
    }

    public static async update(updateCourseDto: z.infer<typeof UpdateCourseSchema>) {
        const { id, ...course } = updateCourseDto;

        const courseExists = await prisma.courses.findUnique({
            where: { id }
        });

        if (!courseExists) {
            throw new CourseNotFound();
        }

        if (course.banner) {
            const bannerId = await StorageService.createImage(Buffer.from(course.banner, "base64url"));
            course.banner = path.posix.join(Configs.STORAGE_URL, "image", bannerId);
        }

        if (course.logo) {
            const logoId = await StorageService.createImage(Buffer.from(course.logo, "base64url"));
            course.logo = path.posix.join(Configs.STORAGE_URL, "image", logoId);
        }


        const courseData = await prisma.courses.update({
            where: { id },
            data: course
        });

        return courseData;
    }

    public static async search(searchCourseDto: z.infer<typeof SearchCourseSchema>) {
        const courseData = await prisma.courses.findMany({
            where: {
                name: {
                    contains: searchCourseDto.name
                }
            }
        });

        return courseData;
    }

    public static async find(findCourseDto: z.infer<typeof FindCourseSchema>) {
        const courseData = await prisma.courses.findUnique({
            where: findCourseDto
        });

        if(!courseData) {
            throw new CourseNotFound();
        }

        return courseData;
    }

    public static async delete(findCourseDto: z.infer<typeof FindCourseSchema>) {
        const courseExists = await prisma.courses.findUnique({
            where: findCourseDto
        });

        if (!courseExists) {
            throw new CourseNotFound();
        }

        await prisma.courses.delete({
            where: findCourseDto
        });
    }
}
