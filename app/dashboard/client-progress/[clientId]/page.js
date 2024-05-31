"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClientProgressReport = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (clientId) {
      const fetchClient = async () => {
        const { data, error } = await supabase
          .from("new_clients")
          .select("*")
          .eq("client_id", clientId)
          .single();
        if (error) {
          console.error("Error fetching client: ", error);
        } else {
          setClient(data);
        }
      };

      fetchClient();
    }
  }, [clientId]);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {client.first_name} {client.last_name}'s Progress Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Render client progress data here */}
        <div>Start Weight: {client.start_weight} lbs</div>
        <div>Current Weight: {client.current_weight} lbs</div>
        <div>Body Fat Percentage: {client.body_fat_percentage} %</div>
        <div>BMI: {client.bmi}</div>
        <div>Number of Workouts: {client.number_of_workouts}</div>
        <div>Notes: {client.notes}</div>
      </CardContent>
    </Card>
  );
};

export default ClientProgressReport;
