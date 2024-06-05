"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { supabase } from "@/app/utils/supabaseClient";

const AddWeeklyReport = () => {
  const router = useRouter();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [formData, setFormData] = useState({
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    bmi: "",
    bodyWeightPercentage: "",
    workouts: "",
  });

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from("fitness_clients")
        .select("client_id, first_name, last_name");
      if (error) {
        console.error("Error fetching clients: ", error);
      } else {
        setClients(data);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.from("weekly_reports").insert([
        {
          client_id: selectedClientId,
          week: selectedWeek,
          weight: formData.weight,
          chest: formData.chest,
          waist: formData.waist,
          hips: formData.hips,
          bmi: formData.bmi,
          body_weight_percentage: formData.bodyWeightPercentage,
          workouts: formData.workouts,
        },
      ]);

      if (error) {
        console.error("Error submitting weekly report: ", error);
      } else {
        console.log("Weekly report submitted successfully: ", data);
        router.push(`/dashboard/client-progress/${selectedClientId}`);
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Fitness Check-In</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Week {selectedWeek}
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((week) => (
                  <DropdownMenuItem
                    key={week}
                    onSelect={() => setSelectedWeek(week)}
                    className={
                      selectedWeek === week
                        ? "bg-gray-100 dark:bg-gray-800"
                        : ""
                    }
                  >
                    Week {week}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription>
            Track your progress and log your workouts for the week.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="client">Client Name</Label>
            <Select
              id="client"
              value={selectedClientId}
              onValueChange={setSelectedClientId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {clients.map((client) => (
                    <SelectItem key={client.client_id} value={client.client_id}>
                      {client.first_name} {client.last_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter your weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="chest">Chest (in)</Label>
              <Input
                id="chest"
                type="number"
                placeholder="Chest measurement"
                value={formData.chest}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="waist">Waist (in)</Label>
              <Input
                id="waist"
                type="number"
                placeholder="Waist measurement"
                value={formData.waist}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hips">Hips (in)</Label>
              <Input
                id="hips"
                type="number"
                placeholder="Hips measurement"
                value={formData.hips}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="bmi">BMI</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="bmi"
                  type="number"
                  placeholder="Calculate your BMI"
                  value={formData.bmi}
                  onChange={handleChange}
                />
                <Button variant="outline" size="icon">
                  <CalculatorIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bodyWeightPercentage">
                Body Weight Percentage
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="bodyWeightPercentage"
                  type="number"
                  placeholder="Calculate your body weight percentage"
                  value={formData.bodyWeightPercentage}
                  onChange={handleChange}
                />
                <Button variant="outline" size="icon">
                  <CalculatorIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="workouts">Weekly Workouts</Label>
            <Textarea
              id="workouts"
              placeholder="Log your workouts and activities for the week."
              className="min-h-[150px]"
              value={formData.workouts}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

function CalculatorIcon(props) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  );
}

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

export default AddWeeklyReport;
