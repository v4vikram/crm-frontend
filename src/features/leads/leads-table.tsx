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
import { getLeadPriority, type LeadPriority } from "./lead-priority";
import type { Lead } from "./lead.types";

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete?: (lead: Lead) => void;
  onConvert?: (lead: Lead) => void;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const statusVariant = (status: Lead["status"]): "default" | "secondary" | "destructive" => {
  if (status === "WON") return "default";
  if (status === "LOST") return "destructive";
  return "secondary";
};

const priorityVariant = (priority: LeadPriority): "destructive" | "secondary" | "outline" => {
  if (priority === "HIGH") return "destructive";
  if (priority === "MEDIUM") return "secondary";
  return "outline";
};

export function LeadsTable({ leads, isLoading, onEdit, onDelete, onConvert }: LeadsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contact</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Assigned to</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Created</TableHead>
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
                <Skeleton className="h-5 w-16 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell />
            </TableRow>
          ))}

        {!isLoading && leads.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
              No leads found.
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{lead.contactName}</span>
                  {lead.email && (
                    <span className="text-sm text-muted-foreground">{lead.email}</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{lead.companyName ?? "—"}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(lead.status)}>{lead.status.replace(/_/g, " ")}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {lead.source.replace(/_/g, " ")}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {lead.assignedTo?.name ?? "Unassigned"}
              </TableCell>
              <TableCell>
                {(() => {
                  const { priority, nextAction } = getLeadPriority(lead);
                  return (
                    <div className="flex flex-col gap-1">
                      <Badge variant={priorityVariant(priority)}>{priority}</Badge>
                      <span className="text-xs text-muted-foreground">{nextAction}</span>
                    </div>
                  );
                })()}
              </TableCell>
              <TableCell className="text-muted-foreground">{formatDate(lead.createdAt)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" aria-label="Lead actions">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => onEdit(lead)}>Edit</DropdownMenuItem>
                    {onConvert && lead.status === "WON" && !lead.customer && (
                      <DropdownMenuItem onSelect={() => onConvert(lead)}>
                        Convert to customer
                      </DropdownMenuItem>
                    )}
                    {onDelete && (
                      <DropdownMenuItem variant="destructive" onSelect={() => onDelete(lead)}>
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
