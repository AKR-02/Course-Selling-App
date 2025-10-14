
import z from "zod";

export const adminsignup = z.object({
    username: z.string().min(3, "username must be atleast 3 characters"),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(20, { message: 'Password must be at most 20 characters long' })
        .refine((password) => /[A-Z]/.test(password), {
            message: 'Password must contain at least one uppercase letter',
        })
        .refine((password) => /[a-z]/.test(password), {
            message: 'Password must contain at least one lowercase letter',
        })
        .refine((password) => /[0-9]/.test(password), {
            message: 'Password must contain at least one digit',
        })
        .refine((password) => /[!@#$%^&*]/.test(password), {
            message: 'Password must contain at least one special character',
        })
});

export const coursevali = z.object({
    title: z.string().max(40, "title must not contain more than 20 characters"),
    description: z.string().min(20, "description must contain atleast 20 characters"),
    imageLink: z.string(),
    price: z.number().max(99999,"price should not exceed 5 digits")
})




