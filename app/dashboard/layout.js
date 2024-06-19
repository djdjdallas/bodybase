import { redirect } from "next/navigation";
import config from "@/config";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Sidebar from "@/components/Sidebar";
import Providers from "../lib/providers";
import { AI } from "../actions"; // Adjust path as needed

export default async function LayoutPrivate({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  return (
    <Providers session={session}>
      <AI>
        {" "}
        {/* Wrap the layout with the AI provider */}
        <div className="flex">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </AI>
    </Providers>
  );
}
