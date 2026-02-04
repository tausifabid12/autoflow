import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminDashboardProvider from "./(components)/AdminDashboardProvider";


export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {


  return <AdminDashboardProvider>{children}</AdminDashboardProvider>;
}
