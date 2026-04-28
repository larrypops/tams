import { redirect } from "next/navigation";
import { getAdminUsernameFromCookies } from "@/src/lib/admin/guards";

export default async function AdminIndexPage() {
  const username = await getAdminUsernameFromCookies();
  redirect(username ? "/admin/products" : "/admin/login");
}

