import { z } from "zod"

const blogValidationSchema = z.object({
    title: z.string().nonempty("Title is required"),
    content: z.string().nonempty("Content is required"),
    author: z.string(),
});

export const blogValidation = {
    blogValidationSchema
}