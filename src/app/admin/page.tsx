import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getAdminUsernameFromCookies } from "@/src/lib/admin/guards";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminIndexPage() {
  const username = await getAdminUsernameFromCookies();
  redirect(username ? "/admin/products" : "/admin/login");
}
