import { ChangePasswordForm } from "@/features/profile/change-password-form";
import { ProfileInfoForm } from "@/features/profile/profile-info-form";

export default function ProfilePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your account settings.</p>
      </div>
      <ProfileInfoForm />
      <ChangePasswordForm />
    </div>
  );
}
