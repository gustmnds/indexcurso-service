import { Request, Response } from "express";
import { CourseService } from "../../services/course-service";
import { CreateCourseSchema, FindCourseSchema, SearchCourseSchema, UpdateCourseSchema } from "./course-schemas";

export class CourseCotroller {
    public static async create(req: Request, res: Response) {
        const createCourseDto = await CreateCourseSchema.parseAsync(req.body);
        const result = await CourseService.create(createCourseDto);
        return res.status(201).json(result);
    }

    public static async update(req: Request, res: Response)  {
        const updateCourseDto = await UpdateCourseSchema.parseAsync({ id: req.params.id, ...req.body });
        const result = await CourseService.update(updateCourseDto);
        return res.status(200).json(result);
    }

    public static async find(req: Request, res: Response) {
        const findCourseDto = await FindCourseSchema.parseAsync(req.params);
        const result = await CourseService.find(findCourseDto);
        return res.status(200).json(result);
    }

    public static async search(req: Request, res: Response) {
        const searchCourseDto = await SearchCourseSchema.parseAsync(req.query);
        const result = await CourseService.search(searchCourseDto);
        return res.status(200).json(result);
    }

    public static async delete(req: Request, res: Response) {
        const findCourseDto = await FindCourseSchema.parseAsync(req.params);
        await CourseService.delete(findCourseDto);
        return res.status(204).send();
    }
}
