import type { Lead } from "./lead.types";

export type LeadPriority = "HIGH" | "MEDIUM" | "LOW";

export interface LeadPriorityResult {
  priority: LeadPriority;
  nextAction: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function getLeadPriority(lead: Lead): LeadPriorityResult {
  if (lead.status === "WON" || lead.status === "LOST") {
    return { priority: "LOW", nextAction: "Closed" };
  }

  const referenceDate = lead.lastContactedAt ?? lead.createdAt;
  const daysSinceContact = (Date.now() - new Date(referenceDate).getTime()) / DAY_MS;

  let priority: LeadPriority;
  if ((lead.status === "NEW" && !lead.lastContactedAt) || daysSinceContact > 5) {
    priority = "HIGH";
  } else if (daysSinceContact > 2) {
    priority = "MEDIUM";
  } else {
    priority = "LOW";
  }

  let nextAction: string;
  if (lead.status === "NEW") {
    nextAction = "Call today";
  } else if (lead.status === "NEGOTIATION") {
    nextAction = "Schedule meeting";
  } else if (daysSinceContact > 2) {
    nextAction = "Follow up";
  } else {
    nextAction = "Send WhatsApp";
  }

  return { priority, nextAction };
}
