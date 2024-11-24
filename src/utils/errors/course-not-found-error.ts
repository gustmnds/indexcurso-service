import { WebError } from "./web-errors";

export class CourseNotFound extends WebError {
    constructor() {
        super(404, "COURSE_NOT_FOUND", "Unable to find a course that matches the id provided.");
    }
}
