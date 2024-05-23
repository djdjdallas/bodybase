// utils/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://luxyzqmfootheigylpzm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1eHl6cW1mb290aGVpZ3lscHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MzA4NTksImV4cCI6MjAzMDQwNjg1OX0.AqQmDvmXsIss1P-r0QAFf9VB_mOV271Quklw4SLU6Gw";

export const supabase = createClient(supabaseUrl, supabaseKey);
