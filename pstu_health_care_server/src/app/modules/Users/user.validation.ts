import z from "zod";

export const adminValidation = z.object({
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password must not be longer than 20 characters"),
    // .regex(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //     "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    // ),
    admin: z.object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters long")
            .max(50, "Name must not exceed 50 characters")
            .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

        email: z
            .string()
            .email("Invalid email address"),

        contactNumber: z
            .string()
            .regex(/^(\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
    })
})