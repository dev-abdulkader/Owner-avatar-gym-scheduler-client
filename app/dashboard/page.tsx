import { redirect } from "next/navigation";

export default function DashboardPage() {
  // This page is used only for redirecting based on role
  redirect("/dashboard/user"); // Default fallback
}
