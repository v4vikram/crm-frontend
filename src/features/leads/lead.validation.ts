import { z } from "zod";

export const LEAD_SOURCES = [
  "WEBSITE",
  "FACEBOOK",
  "GOOGLE_ADS",
  "REFERRAL",
  "PHONE_CALL",
  "WALK_IN",
  "OTHER",
] as const;

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
] as const;

export const UNASSIGNED = "unassigned" as const;

export const leadFormSchema = z.object({
  contactName: z.string().trim().min(2, "Name must be at least 2 characters").max(255),
  companyName: z.string().trim().max(255),
  email: z.union([z.literal(""), z.email("Invalid email")]),
  phone: z.string().trim().max(20),
  website: z.union([z.literal(""), z.url("Invalid URL")]),
  source: z.enum(LEAD_SOURCES),
  status: z.enum(LEAD_STATUSES),
  remarks: z.string().trim().max(2000),
  assignedToId: z.string(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
