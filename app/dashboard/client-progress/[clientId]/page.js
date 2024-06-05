"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const ClientReport = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const clientId = pathname.split("/").pop();
  const [client, setClient] = useState(null);
  const [progress, setProgress] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(0);

  useEffect(() => {
    console.log("clientId:", clientId); // Log clientId for debugging
    if (clientId) {
      const fetchClientData = async () => {
        const { data, error } = await supabase
          .from("fitness_clients")
          .select("*")
          .eq("client_id", clientId)
          .single();
        if (error) {
          console.error("Error fetching client data: ", error);
        } else {
          console.log("Fetched client data:", data); // Log fetched client data
          setClient(data);
        }
      };

      fetchClientData();
    }
  }, [clientId]);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      if (!clientId) return;

      if (selectedWeek === 0) {
        setProgress([client]);
      } else {
        const { data, error } = await supabase
          .from("weekly_reports")
          .select("*")
          .eq("client_id", clientId)
          .eq("week", selectedWeek)
          .single();
        if (error) {
          console.error("Error fetching weekly data: ", error);
        } else {
          console.log("Fetched weekly data:", data); // Log fetched weekly data
          setProgress([data]);
        }
      }
    };

    fetchWeeklyData();
  }, [selectedWeek, client, clientId]);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6">
      <header className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/placeholder.svg" alt={client.first_name} />
          <AvatarFallback>
            {client.first_name[0]}
            {client.last_name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">
            {client.first_name} {client.last_name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Personal Training Client
          </p>
        </div>
      </header>
      <div className="mt-4 mb-4 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Week {selectedWeek === 0 ? "Starting Data" : selectedWeek}
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setSelectedWeek(0)}>
              Starting Data
            </DropdownMenuItem>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((week) => (
              <DropdownMenuItem
                key={week}
                onSelect={() => setSelectedWeek(week)}
              >
                Week {week}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-bold mb-4">Progress Metrics</h2>
          {progress.length > 0 ? (
            progress.map((report) => (
              <div
                key={report?.week || "Starting Data"}
                className="grid grid-cols-2 gap-4 mb-4"
              >
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">
                    Week {report?.week || "Starting Data"}
                  </h3>
                  <div className="text-4xl font-bold">
                    {report?.weight || client.start_weight} lbs
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">Weight</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Body Fat</h3>
                  <div className="text-4xl font-bold">
                    {report?.body_weight_percentage ||
                      client.start_body_fat_percentage}{" "}
                    %
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Body Fat Percentage
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">BMI</h3>
                  <div className="text-4xl font-bold">
                    {report?.bmi || client.start_bmi}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">BMI</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">Workouts</h3>
                  <div className="text-4xl font-bold">
                    {report?.number_of_workouts || "N/A"}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Number of Workouts
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No progress reports available.
            </p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Workout Total</h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Total Workouts</h3>
            <div className="text-4xl font-bold">
              {progress.reduce(
                (total, report) => total + (report?.number_of_workouts || 0),
                0
              )}
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Completed since start of program
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-bold mb-2">Current Streak</h3>
            <div className="text-4xl font-bold">7</div>
            <p className="text-gray-500 dark:text-gray-400">
              Consecutive workouts completed
            </p>
          </div>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Workout Recommendations</h2>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">Strength Training</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Focus on compound exercises like squats, deadlifts, and bench press
            to build overall strength and muscle mass.
          </p>
          <h3 className="text-lg font-bold mb-2">Cardio</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Incorporate 30-45 minutes of moderate-intensity cardio 3-4 times per
            week to improve cardiovascular health and aid in fat loss.
          </p>
          <h3 className="text-lg font-bold mb-2">Nutrition</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Maintain a balanced diet with a focus on lean proteins, complex
            carbohydrates, and healthy fats. Aim for a slight calorie surplus to
            support muscle growth.
          </p>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-4">Nutrition Recommendations</h2>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">Macronutrient Targets</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h4 className="text-base font-bold mb-1">Protein</h4>
              <div className="text-2xl font-bold">150g</div>
              <p className="text-gray-500 dark:text-gray-400">per day</p>
            </div>
            <div>
              <h4 className="text-base font-bold mb-1">Carbs</h4>
              <div className="text-2xl font-bold">225g</div>
              <p className="text-gray-500 dark:text-gray-400">per day</p>
            </div>
            <div>
              <h4 className="text-base font-bold mb-1">Fat</h4>
              <div className="text-2xl font-bold">65g</div>
              <p className="text-gray-500 dark:text-gray-400">per day</p>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            Focus on whole, nutrient-dense foods to meet these targets. Adjust
            as needed based on your progress and feedback.
          </p>
        </div>
      </section>
    </div>
  );
};

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default ClientReport;
