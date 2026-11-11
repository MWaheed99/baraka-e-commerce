import { Settings } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import FormCard from "@/components/shared/FormCard";
import ChangePasswordForm from "@/components/settings/ChangePasswordForm";
import ForgotPasswordForm from "@/components/settings/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Baraka",
  description: "Browse all products",
};
export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage your password and account security"
        icon={Settings}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Settings" }]}
      />

      <div className="container grid items-start gap-6 pt-6 md:pt-10 lg:grid-cols-2 lg:gap-8">
        <FormCard
          title="Change password"
          description="Set a new password for your account."
        >
          <ChangePasswordForm />
        </FormCard>

        <FormCard
          title="Forgot password"
          description="Enter your email and we will send you a reset code."
        >
          <ForgotPasswordForm />
        </FormCard>
      </div>
    </>
  );
}