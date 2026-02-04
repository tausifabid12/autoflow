import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import InfluencerDashboardProvider from "./(components)/InfluencerDashboardProvider";


export default async function InfluencerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {


  return <InfluencerDashboardProvider>{children}</InfluencerDashboardProvider>;
}
