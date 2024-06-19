"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CreateWorkoutCard({ onCreate, clients }) {
  const [clientId, setClientId] = useState("");
  const [date, setDate] = useState(new Date());
  const [inProgress, setInProgress] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [exercise, setExercise] = useState({
    name: "",
    reps: 0,
    sets: 0,
    weight: null,
  });

  useEffect(() => {
    console.log("CreateWorkoutCard received clients: ", clients); // Debugging log
  }, [clients]);

  const addExercise = () => {
    setExercises([...exercises, exercise]);
    setExercise({ name: "", reps: 0, sets: 0, weight: null });
  };

  const handleSubmit = () => {
    const selectedClient = clients.find(
      (client) => client.client_id === clientId
    );
    const clientName = selectedClient
      ? `${selectedClient.first_name} ${selectedClient.last_name}`
      : "";
    onCreate({ name: clientName, date, inProgress, exercises });
    setClientId("");
    setDate(new Date());
    setExercises([]);
  };

  return (
    <Card key="1">
      <CardHeader>
        <CardTitle>Create New Workout</CardTitle>
        <CardDescription>
          Enter the details of your new workout.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="client">Client</Label>
            <select
              id="client"
              required
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client.client_id} value={client.client_id}>
                  {client.first_name} {client.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(data) => {
                    if (data) {
                      setDate(data);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center space-x-4">
            <Label className="text-base" htmlFor="in-progress">
              In Progress
            </Label>
            <Checkbox
              id="in-progress"
              checked={inProgress}
              onCheckedChange={(checked) => setInProgress(!!checked)}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Exercises</Label>
          {exercises.map((ex, index) => (
            <div key={index} className="flex space-x-2">
              <Input
                type="text"
                value={ex.name}
                readOnly
                placeholder="Exercise Name"
              />
              <Input
                type="number"
                value={ex.reps}
                readOnly
                placeholder="Reps"
              />
              <Input
                type="number"
                value={ex.sets}
                readOnly
                placeholder="Sets"
              />
              <Input
                type="number"
                value={ex.weight || ""}
                readOnly
                placeholder="Weight (optional)"
              />
            </div>
          ))}
          <div className="flex space-x-2">
            <Input
              type="text"
              value={exercise.name}
              onChange={(e) =>
                setExercise({ ...exercise, name: e.target.value })
              }
              placeholder="Exercise Name"
            />
            <Input
              type="number"
              value={exercise.reps}
              onChange={(e) =>
                setExercise({ ...exercise, reps: e.target.value })
              }
              placeholder="Reps"
            />
            <Input
              type="number"
              value={exercise.sets}
              onChange={(e) =>
                setExercise({ ...exercise, sets: e.target.value })
              }
              placeholder="Sets"
            />
            <Input
              type="number"
              value={exercise.weight || ""}
              onChange={(e) =>
                setExercise({ ...exercise, weight: e.target.value })
              }
              placeholder="Weight (optional)"
            />
          </div>
          <Button onClick={addExercise}>Add Exercise</Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="button" onClick={handleSubmit}>
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
