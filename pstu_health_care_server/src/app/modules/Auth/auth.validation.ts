import z from "zod";

export const loginValidation = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string()
})