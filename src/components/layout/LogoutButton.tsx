"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  function handleLogout() {
    signOut({
      callbackUrl: "/login",
    });
  }
  return (
    <Button type="button" onClick={handleLogout} variant="outline" className="h-11 px-4">
      <LogOut aria-hidden="true" />
      Logout
    </Button>
  );
}