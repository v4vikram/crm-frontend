"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/features/auth/auth.store";
import { ApiClientError } from "@/services/api";
import { useUpdateProfile } from "./use-profile";
import { updateProfileSchema, type UpdateProfileFormValues } from "./profile.validation";

export function ProfileInfoForm() {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "" },
  });

  useEffect(() => {
    if (user) reset({ name: user.name, email: user.email });
  }, [user, reset]);

  const onSubmit = (values: UpdateProfileFormValues) => {
    updateProfile.mutate(values, {
      onSuccess: (updatedUser) => reset({ name: updatedUser.name, email: updatedUser.email }),
    });
  };

  const serverError =
    updateProfile.error instanceof ApiClientError ? updateProfile.error.message : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile information</CardTitle>
        <CardDescription>Update your name and email address.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="profile-name">Name</FieldLabel>
              <Input id="profile-name" aria-invalid={!!errors.name} {...register("name")} />
              <FieldError errors={[errors.name]} />
            </Field>

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="profile-email">Email</FieldLabel>
              <Input
                id="profile-email"
                type="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              <FieldError errors={[errors.email]} />
            </Field>

            {updateProfile.isSuccess && !isDirty && (
              <p className="text-sm text-muted-foreground">Profile updated successfully.</p>
            )}
            {serverError && <FieldError>{serverError}</FieldError>}

            <Field orientation="horizontal">
              <Button type="submit" disabled={updateProfile.isPending || !isDirty}>
                {updateProfile.isPending ? "Saving..." : "Save changes"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
