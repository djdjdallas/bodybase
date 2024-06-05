// app/dashboard/calendar/layout.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientLayout from "@/components/LayoutClient";

export default async function CalendarLayout({ children }) {
  const session = await getServerSession(authOptions);

  return <ClientLayout session={session}>{children}</ClientLayout>;
}
