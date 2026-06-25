"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
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
import { buildEmployeeFormSchema, type EmployeeFormValues } from "./user.validation";
import type { User } from "./user.types";

const emptyValues: EmployeeFormValues = {
  name: "",
  email: "",
  password: "",
  role: "MEMBER",
};

const toFormValues = (user?: User | null): EmployeeFormValues =>
  user
    ? { name: user.name, email: user.email, password: "", role: user.role }
    : emptyValues;

interface EmployeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  isPending: boolean;
  onSubmit: (values: EmployeeFormValues) => void;
}

export function EmployeeForm({ open, onOpenChange, user, isPending, onSubmit }: EmployeeFormProps) {
  const isEditing = !!user;
  const schema = useMemo(() => buildEmployeeFormSchema(isEditing), [isEditing]);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: toFormValues(user),
  });

  useEffect(() => {
    if (open) reset(toFormValues(user));
  }, [open, user, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit employee" : "Add employee"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update this employee's details."
              : "Create an account for a new employee. Share the password with them securely."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
              <FieldError errors={[errors.name]} />
            </Field>

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              <FieldError errors={[errors.email]} />
            </Field>

            {!isEditing && (
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
                <FieldError errors={[errors.password]} />
              </Field>
            )}

            <Field>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <Select
                value={watch("role")}
                onValueChange={(value) => setValue("role", value as EmployeeFormValues["role"])}
              >
                <SelectTrigger id="role" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MEMBER">Member</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : isEditing ? "Save changes" : "Create employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
