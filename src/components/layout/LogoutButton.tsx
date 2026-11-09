"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button type="button" variant="outline" className="h-11 px-4">
      <LogOut aria-hidden="true" />
      Logout
    </Button>
  );
}