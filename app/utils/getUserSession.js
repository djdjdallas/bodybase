import { supabase } from "@/app/utils/supabaseClient";

export const getUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error("Error fetching session: " + error.message);
  }
  return data.session;
};
