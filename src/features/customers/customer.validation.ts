import { z } from "zod";
import { UNASSIGNED } from "../leads/lead.validation";

export { UNASSIGNED };

export const CUSTOMER_STATUSES = ["ACTIVE", "INACTIVE", "CHURNED"] as const;

const dealValueField = z
  .string()
  .trim()
  .refine((value) => value === "" || (!Number.isNaN(Number(value)) && Number(value) >= 0), {
    message: "Deal value must be a positive number",
  });

export const convertLeadSchema = z.object({
  address: z.string().trim().max(500),
  dealValue: dealValueField,
  status: z.enum(CUSTOMER_STATUSES),
  remarks: z.string().trim().max(2000),
});

export type ConvertLeadFormValues = z.infer<typeof convertLeadSchema>;

export const customerFormSchema = z.object({
  contactName: z.string().trim().min(2, "Name must be at least 2 characters").max(255),
  companyName: z.string().trim().max(255),
  email: z.union([z.literal(""), z.email("Invalid email")]),
  phone: z.string().trim().max(20),
  address: z.string().trim().max(500),
  dealValue: dealValueField,
  status: z.enum(CUSTOMER_STATUSES),
  remarks: z.string().trim().max(2000),
  assignedToId: z.string(),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;
