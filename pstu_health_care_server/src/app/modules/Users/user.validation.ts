import z from "zod";

export const adminValidation = z.object({
    password: z.string({error: "Password is required!"})
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password must not be longer than 20 characters"),
    // .regex(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //     "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    // ),
    admin: z.object({
        name: z
            .string({error: "Name is required"})
            .min(2, "Name must be at least 2 characters long")
            .max(50, "Name must not exceed 50 characters")
            .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

        email: z
            .string({error: "Email is required"})
            .email("Invalid email address"),

        contactNumber: z
            .string({error: "Email is required!"})
            .regex(/^(\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
    })
})

export const doctorValidation = z.object({
     password: z.string({error: "Password is required!"})
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password must not be longer than 20 characters"),
    // .regex(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //     "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    // ),
    doctor: z.object({
        name: z
            .string({error: "Name is required"})
            .min(2, "Name must be at least 2 characters long")
            .max(50, "Name must not exceed 50 characters")
            .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

        email: z
            .string({error: "Email is required"})
            .email("Invalid email address"),

        contactNumber: z
            .string({error: "Email is required!"})
            .regex(/^(\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
        address: z.string().optional(),
        registrationNumber: z.string({error: "Registration Number is required!"}),
        experience: z.int().optional(),
        qualification :z.string({error: "Qualification is required!"}),
        currentWorkingPlace: z.string({error: "CurrentWorkingPlace is required!"}),
        designation: z.string({error: "Designation is required!"})
    })
})