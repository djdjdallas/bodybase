import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ChatLayout({ children }) {
  // Keep cookies in the JS execution context for Next.js build
  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/dashboard");
  }

  return <>{children}</>;
}
