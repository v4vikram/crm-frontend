import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Customer } from "./customer.types";

interface CustomersTableProps {
  customers: Customer[];
  isLoading: boolean;
  onEdit: (customer: Customer) => void;
  onDelete?: (customer: Customer) => void;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formatDealValue = (value: number | null) =>
  value === null
    ? "—"
    : value.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const statusVariant = (status: Customer["status"]): "default" | "secondary" | "destructive" => {
  if (status === "ACTIVE") return "default";
  if (status === "CHURNED") return "destructive";
  return "secondary";
};

export function CustomersTable({ customers, isLoading, onEdit, onDelete }: CustomersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contact</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Deal value</TableHead>
          <TableHead>Assigned to</TableHead>
          <TableHead>Customer since</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-28" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell />
            </TableRow>
          ))}

        {!isLoading && customers.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
              No customers yet.
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{customer.contactName}</span>
                  {customer.email && (
                    <span className="text-sm text-muted-foreground">{customer.email}</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{customer.companyName ?? "—"}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(customer.status)}>{customer.status}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{formatDealValue(customer.dealValue)}</TableCell>
              <TableCell className="text-muted-foreground">
                {customer.assignedTo?.name ?? "Unassigned"}
              </TableCell>
              <TableCell className="text-muted-foreground">{formatDate(customer.createdAt)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" aria-label="Customer actions">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => onEdit(customer)}>Edit</DropdownMenuItem>
                    {onDelete && (
                      <DropdownMenuItem variant="destructive" onSelect={() => onDelete(customer)}>
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
