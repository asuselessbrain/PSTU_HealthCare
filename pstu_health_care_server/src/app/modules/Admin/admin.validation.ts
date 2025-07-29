import z from "zod";

export const validateUpdateAdmin = z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional()
})