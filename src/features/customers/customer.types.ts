export type CustomerStatus = "ACTIVE" | "INACTIVE" | "CHURNED";

export interface CustomerContact {
  id: string;
  name: string;
  email: string;
}

export interface CustomerLead {
  id: string;
  contactName: string;
  companyName: string | null;
}

export interface Customer {
  id: string;
  companyName: string | null;
  contactName: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  dealValue: number | null;
  status: CustomerStatus;
  remarks: string | null;
  assignedToId: string | null;
  assignedTo: CustomerContact | null;
  createdById: string;
  leadId: string;
  lead: CustomerLead;
  createdAt: string;
  updatedAt: string;
}

export interface ListCustomersQuery {
  page: number;
  limit: number;
  search?: string;
  status?: CustomerStatus;
}

export interface ConvertLeadInput {
  address?: string;
  dealValue?: number;
  status?: CustomerStatus;
  remarks?: string;
}

export interface UpdateCustomerInput {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  dealValue?: number | null;
  status?: CustomerStatus;
  remarks?: string;
  assignedToId?: string | null;
}
