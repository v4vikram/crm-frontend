import { z } from "zod";

export const buildEmployeeFormSchema = (isEditing: boolean) =>
  z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters").max(100),
      email: z.email(),
      password: z.string().max(72).optional(),
      role: z.enum(["ADMIN", "MEMBER"]),
    })
    .superRefine((data, ctx) => {
      if (!isEditing && (!data.password || data.password.length < 6)) {
        ctx.addIssue({
          code: "custom",
          message: "Password must be at least 6 characters",
          path: ["password"],
        });
      }
    });

export interface EmployeeFormValues {
  name: string;
  email: string;
  password?: string;
  role: "ADMIN" | "MEMBER";
}
