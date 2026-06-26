export type LeadSource =
  | "WEBSITE"
  | "FACEBOOK"
  | "GOOGLE_ADS"
  | "REFERRAL"
  | "PHONE_CALL"
  | "WALK_IN"
  | "OTHER";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL_SENT"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export interface LeadAssignee {
  id: string;
  name: string;
  email: string;
}

export interface Lead {
  id: string;
  companyName: string | null;
  contactName: string;
  email: string | null;
  phone: string | null;
  website: string | null;
  source: LeadSource;
  status: LeadStatus;
  remarks: string | null;
  assignedToId: string | null;
  assignedTo: LeadAssignee | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  customer: { id: string } | null;
}

export interface ListLeadsQuery {
  page: number;
  limit: number;
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
}

export interface CreateLeadInput {
  companyName?: string;
  contactName: string;
  email?: string;
  phone?: string;
  website?: string;
  source?: LeadSource;
  status?: LeadStatus;
  remarks?: string;
  assignedToId?: string;
}

export interface UpdateLeadInput extends Omit<CreateLeadInput, "assignedToId"> {
  assignedToId?: string | null;
}
