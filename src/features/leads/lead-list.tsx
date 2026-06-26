"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/auth.store";
import { ConvertLeadDialog } from "@/features/customers/convert-lead-dialog";
import type { ConvertLeadFormValues } from "@/features/customers/customer.validation";
import { useConvertLead } from "@/features/customers/use-customer-mutations";
import { ApiClientError } from "@/services/api";
import { DeleteLeadDialog } from "./delete-lead-dialog";
import { LeadForm } from "./lead-form";
import { UNASSIGNED, type LeadFormValues } from "./lead.validation";
import type { CreateLeadInput, Lead, LeadSource, LeadStatus, UpdateLeadInput } from "./lead.types";
import { useCreateLead, useDeleteLead, useUpdateLead } from "./use-lead-mutations";
import { useLeads } from "./use-leads";
import { LeadsFilters } from "./leads-filters";
import { LeadsPagination } from "./leads-pagination";
import { LeadsTable } from "./leads-table";

const PAGE_SIZE = 1;

export function LeadList() {
  const isAdmin = useAuthStore((state) => state.user?.role === "ADMIN");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [source, setSource] = useState<LeadSource | "all">("all");

  const [formOpen, setFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, source]);

  const { data, isLoading, isError, error } = useLeads({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch || undefined,
    status: status === "all" ? undefined : status,
    source: source === "all" ? undefined : source,
  });

  const createLead = useCreateLead();
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();
  const convertLead = useConvertLead();

  const openCreateForm = () => {
    setEditingLead(null);
    setFormOpen(true);
  };

  const openEditForm = (lead: Lead) => {
    setEditingLead(lead);
    setFormOpen(true);
  };

  const handleSubmit = (values: LeadFormValues) => {
    const base = {
      contactName: values.contactName,
      companyName: values.companyName || undefined,
      email: values.email || undefined,
      phone: values.phone || undefined,
      website: values.website || undefined,
      source: values.source,
      status: values.status,
      remarks: values.remarks || undefined,
    };

    if (editingLead) {
      const input: UpdateLeadInput = {
        ...base,
        assignedToId: values.assignedToId === UNASSIGNED ? null : values.assignedToId,
      };
      updateLead.mutate(
        { id: editingLead.id, input },
        { onSuccess: () => setFormOpen(false) },
      );
    } else {
      const input: CreateLeadInput = {
        ...base,
        assignedToId: values.assignedToId === UNASSIGNED ? undefined : values.assignedToId,
      };
      createLead.mutate(input, { onSuccess: () => setFormOpen(false) });
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingLead) return;
    deleteLead.mutate(deletingLead.id, { onSuccess: () => setDeletingLead(null) });
  };

  const handleConvert = (values: ConvertLeadFormValues) => {
    if (!convertingLead) return;
    convertLead.mutate(
      {
        leadId: convertingLead.id,
        input: {
          address: values.address || undefined,
          dealValue: values.dealValue === "" ? undefined : Number(values.dealValue),
          status: values.status,
          remarks: values.remarks || undefined,
        },
      },
      { onSuccess: () => setConvertingLead(null) },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <LeadsFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          source={source}
          onSourceChange={setSource}
        />
        {isAdmin && (
          <Button onClick={openCreateForm}>
            <Plus />
            Add lead
          </Button>
        )}
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          {error instanceof ApiClientError ? error.message : "Failed to load leads."}
        </p>
      )}

      <div className="rounded-xl border">
        <LeadsTable
          leads={data?.items ?? []}
          isLoading={isLoading}
          onEdit={openEditForm}
          onDelete={isAdmin ? setDeletingLead : undefined}
          onConvert={setConvertingLead}
        />
      </div>

      {data && data.meta.total > 0 && (
        <LeadsPagination meta={data.meta} onPageChange={setPage} />
      )}

      <LeadForm
        open={formOpen}
        onOpenChange={setFormOpen}
        lead={editingLead}
        isPending={createLead.isPending || updateLead.isPending}
        onSubmit={handleSubmit}
      />

      <DeleteLeadDialog
        lead={deletingLead}
        onOpenChange={(open) => !open && setDeletingLead(null)}
        isPending={deleteLead.isPending}
        onConfirm={handleConfirmDelete}
      />

      <ConvertLeadDialog
        lead={convertingLead}
        onOpenChange={(open) => !open && setConvertingLead(null)}
        isPending={convertLead.isPending}
        onSubmit={handleConvert}
      />
    </div>
  );
}
