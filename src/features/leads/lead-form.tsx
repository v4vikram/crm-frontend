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
  LEAD_SOURCES,
  LEAD_STATUSES,
  UNASSIGNED,
  leadFormSchema,
  type LeadFormValues,
} from "./lead.validation";
import type { Lead } from "./lead.types";

const emptyValues: LeadFormValues = {
  contactName: "",
  companyName: "",
  email: "",
  phone: "",
  website: "",
  source: "OTHER",
  status: "NEW",
  remarks: "",
  assignedToId: UNASSIGNED,
};

const toFormValues = (lead?: Lead | null): LeadFormValues =>
  lead
    ? {
        contactName: lead.contactName,
        companyName: lead.companyName ?? "",
        email: lead.email ?? "",
        phone: lead.phone ?? "",
        website: lead.website ?? "",
        source: lead.source,
        status: lead.status,
        remarks: lead.remarks ?? "",
        assignedToId: lead.assignedToId ?? UNASSIGNED,
      }
    : emptyValues;

interface LeadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead?: Lead | null;
  isPending: boolean;
  onSubmit: (values: LeadFormValues) => void;
}

export function LeadForm({ open, onOpenChange, lead, isPending, onSubmit }: LeadFormProps) {
  const { data: assignableUsers } = useAssignableUsers();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: toFormValues(lead),
  });

  useEffect(() => {
    if (open) reset(toFormValues(lead));
  }, [open, lead, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{lead ? "Edit lead" : "Add lead"}</DialogTitle>
          <DialogDescription>
            {lead ? "Update this lead's details." : "Create a new lead to start tracking it."}
          </DialogDescription>
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

            <Field data-invalid={!!errors.website}>
              <FieldLabel htmlFor="website">Website</FieldLabel>
              <Input id="website" placeholder="https://" {...register("website")} />
              <FieldError errors={[errors.website]} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="source">Source</FieldLabel>
                <Select value={watch("source")} onValueChange={(value) => setValue("source", value as LeadFormValues["source"])}>
                  <SelectTrigger id="source" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEAD_SOURCES.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Select value={watch("status")} onValueChange={(value) => setValue("status", value as LeadFormValues["status"])}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEAD_STATUSES.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value.replace(/_/g, " ")}
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
              {isPending ? "Saving..." : lead ? "Save changes" : "Create lead"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
