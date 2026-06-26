"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAssignableUsers } from "@/features/users/use-assignable-users";
import {
  CUSTOMER_STATUSES,
  UNASSIGNED,
  customerFormSchema,
  type CustomerFormValues,
} from "./customer.validation";
import type { Customer } from "./customer.types";

const toFormValues = (customer?: Customer | null): CustomerFormValues =>
  customer
    ? {
        contactName: customer.contactName,
        companyName: customer.companyName ?? "",
        email: customer.email ?? "",
        phone: customer.phone ?? "",
        address: customer.address ?? "",
        dealValue: customer.dealValue !== null ? String(customer.dealValue) : "",
        status: customer.status,
        remarks: customer.remarks ?? "",
        assignedToId: customer.assignedToId ?? UNASSIGNED,
      }
    : {
        contactName: "",
        companyName: "",
        email: "",
        phone: "",
        address: "",
        dealValue: "",
        status: "ACTIVE",
        remarks: "",
        assignedToId: UNASSIGNED,
      };

interface CustomerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
  isPending: boolean;
  onSubmit: (values: CustomerFormValues) => void;
}

export function CustomerForm({ open, onOpenChange, customer, isPending, onSubmit }: CustomerFormProps) {
  const { data: assignableUsers } = useAssignableUsers();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: toFormValues(customer),
  });

  useEffect(() => {
    if (open) reset(toFormValues(customer));
  }, [open, customer, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit customer</DialogTitle>
          <DialogDescription>Update this customer&apos;s details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.contactName}>
                <FieldLabel htmlFor="contactName">Contact name</FieldLabel>
                <Input id="contactName" {...register("contactName")} />
                <FieldError errors={[errors.contactName]} />
              </Field>

              <Field data-invalid={!!errors.companyName}>
                <FieldLabel htmlFor="companyName">Company</FieldLabel>
                <Input id="companyName" {...register("companyName")} />
                <FieldError errors={[errors.companyName]} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" {...register("email")} />
                <FieldError errors={[errors.email]} />
              </Field>

              <Field data-invalid={!!errors.phone}>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input id="phone" {...register("phone")} />
                <FieldError errors={[errors.phone]} />
              </Field>
            </div>

            <Field data-invalid={!!errors.address}>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input id="address" {...register("address")} />
              <FieldError errors={[errors.address]} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.dealValue}>
                <FieldLabel htmlFor="dealValue">Deal value</FieldLabel>
                <Input id="dealValue" type="number" min={0} step="0.01" {...register("dealValue")} />
                <FieldError errors={[errors.dealValue]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Select
                  value={watch("status")}
                  onValueChange={(value) => setValue("status", value as CustomerFormValues["status"])}
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CUSTOMER_STATUSES.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="assignedToId">Assigned to</FieldLabel>
              <Select
                value={watch("assignedToId")}
                onValueChange={(value) => setValue("assignedToId", value)}
              >
                <SelectTrigger id="assignedToId" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
                  {assignableUsers?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field data-invalid={!!errors.remarks}>
              <FieldLabel htmlFor="remarks">Remarks</FieldLabel>
              <Textarea id="remarks" rows={3} {...register("remarks")} />
              <FieldError errors={[errors.remarks]} />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
