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
import { CUSTOMER_STATUSES } from "./customer.validation";
import type { CustomerStatus } from "./customer.types";

interface CustomersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: CustomerStatus | "all";
  onStatusChange: (value: CustomerStatus | "all") => void;
}

export function CustomersFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: CustomersFiltersProps) {
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

      <Select value={status} onValueChange={(value) => onStatusChange(value as CustomerStatus | "all")}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          {CUSTOMER_STATUSES.map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
