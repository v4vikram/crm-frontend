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
import type { Lead } from "@/features/leads/lead.types";
import {
  CUSTOMER_STATUSES,
  convertLeadSchema,
  type ConvertLeadFormValues,
} from "./customer.validation";

const emptyValues: ConvertLeadFormValues = {
  address: "",
  dealValue: "",
  status: "ACTIVE",
  remarks: "",
};

interface ConvertLeadDialogProps {
  lead: Lead | null;
  onOpenChange: (open: boolean) => void;
  isPending: boolean;
  onSubmit: (values: ConvertLeadFormValues) => void;
}

export function ConvertLeadDialog({ lead, onOpenChange, isPending, onSubmit }: ConvertLeadDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ConvertLeadFormValues>({
    resolver: zodResolver(convertLeadSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (lead) reset(emptyValues);
  }, [lead, reset]);

  return (
    <Dialog open={!!lead} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Convert to customer</DialogTitle>
          <DialogDescription>
            {lead?.contactName} will become a customer. Contact details carry over from the lead.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
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
                  onValueChange={(value) => setValue("status", value as ConvertLeadFormValues["status"])}
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
              {isPending ? "Converting..." : "Convert"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
