"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LEAD_SOURCES, LEAD_STATUSES } from "./lead.validation";
import type { LeadSource, LeadStatus } from "./lead.types";

interface LeadsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: LeadStatus | "all";
  onStatusChange: (value: LeadStatus | "all") => void;
  source: LeadSource | "all";
  onSourceChange: (value: LeadSource | "all") => void;
}

export function LeadsFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  source,
  onSourceChange,
}: LeadsFiltersProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, company, email, phone..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="pl-8"
        />
      </div>

      <Select value={status} onValueChange={(value) => onStatusChange(value as LeadStatus | "all")}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {LEAD_STATUSES.map((value) => (
            <SelectItem key={value} value={value}>
              {value.replace(/_/g, " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={source} onValueChange={(value) => onSourceChange(value as LeadSource | "all")}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All sources</SelectItem>
          {LEAD_SOURCES.map((value) => (
            <SelectItem key={value} value={value}>
              {value.replace(/_/g, " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
