"use client";

import { useEffect, useState } from "react";
import { ApiClientError } from "@/services/api";
import { CustomerForm } from "./customer-form";
import { CustomersFilters } from "./customers-filters";
import { CustomersPagination } from "./customers-pagination";
import { CustomersTable } from "./customers-table";
import { DeleteCustomerDialog } from "./delete-customer-dialog";
import { UNASSIGNED, type CustomerFormValues } from "./customer.validation";
import type { Customer, CustomerStatus, UpdateCustomerInput } from "./customer.types";
import { useDeleteCustomer, useUpdateCustomer } from "./use-customer-mutations";
import { useCustomers } from "./use-customers";

const PAGE_SIZE = 10;

export function CustomerList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<CustomerStatus | "all">("all");

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  const { data, isLoading, isError, error } = useCustomers({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch || undefined,
    status: status === "all" ? undefined : status,
  });

  const updateCustomer = useUpdateCustomer();
  const deleteCustomer = useDeleteCustomer();

  const handleSubmit = (values: CustomerFormValues) => {
    if (!editingCustomer) return;

    const input: UpdateCustomerInput = {
      contactName: values.contactName,
      companyName: values.companyName || undefined,
      email: values.email || undefined,
      phone: values.phone || undefined,
      address: values.address || undefined,
      dealValue: values.dealValue === "" ? null : Number(values.dealValue),
      status: values.status,
      remarks: values.remarks || undefined,
      assignedToId: values.assignedToId === UNASSIGNED ? null : values.assignedToId,
    };

    updateCustomer.mutate(
      { id: editingCustomer.id, input },
      { onSuccess: () => setEditingCustomer(null) },
    );
  };

  const handleConfirmDelete = () => {
    if (!deletingCustomer) return;
    deleteCustomer.mutate(deletingCustomer.id, { onSuccess: () => setDeletingCustomer(null) });
  };

  return (
    <div className="flex flex-col gap-4">
      <CustomersFilters search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus} />

      {isError && (
        <p className="text-sm text-destructive">
          {error instanceof ApiClientError ? error.message : "Failed to load customers."}
        </p>
      )}

      <div className="rounded-xl border">
        <CustomersTable
          customers={data?.items ?? []}
          isLoading={isLoading}
          onEdit={setEditingCustomer}
          onDelete={setDeletingCustomer}
        />
      </div>

      {data && data.meta.total > 0 && (
        <CustomersPagination meta={data.meta} onPageChange={setPage} />
      )}

      <CustomerForm
        open={!!editingCustomer}
        onOpenChange={(open) => !open && setEditingCustomer(null)}
        customer={editingCustomer}
        isPending={updateCustomer.isPending}
        onSubmit={handleSubmit}
      />

      <DeleteCustomerDialog
        customer={deletingCustomer}
        onOpenChange={(open) => !open && setDeletingCustomer(null)}
        isPending={deleteCustomer.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
