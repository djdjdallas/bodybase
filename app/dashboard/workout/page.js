"use client";

import React, { useState, useEffect } from "react";
import { useActions, useUIState } from "ai/rsc";
import CreateWorkoutCard from "@/components/CreateWorkoutCard";
import WorkoutsList from "@/components/WorkoutsList";
import { supabase } from "@/app/utils/supabaseClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";

const WorkoutGenerator = () => {
  const { sendMessage } = useActions();
  const [messages, setMessages] = useUIState();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);
  const [showAllWorkouts, setShowAllWorkouts] = useState(false);
  const [clients, setClients] = useState([]);

  // Fetch clients from Supabase
  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from("fitness_clients")
        .select("*");
      if (error) {
        console.error("Error fetching clients: ", error);
      } else {
        console.log("Fetched clients: ", data); // Debugging log
        setClients(data);
      }
    };

    fetchClients();
  }, []);

  const handleCommand = async (command) => {
    const newMessage = { id: Date.now(), role: "user", display: command };
    setMessages([...messages, newMessage]);

    setLoading(true);

    try {
      const response = await sendMessage(command);
      const formattedResponse = formatWorkoutPlan(response.text); // Extract text property
      setMessages([
        ...messages,
        newMessage,
        { id: Date.now(), role: "assistant", display: formattedResponse },
      ]);
    } catch (error) {
      console.error("Error handling command:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleCommand(input);
    setInput(""); // Clear the input after sending the message
  };

  const formatWorkoutPlan = (text) => {
    if (typeof text !== "string") {
      console.error("Expected a string response but got:", text);
      return "Error: Expected a string response";
    }

    const days = text
      .split("**")
      .map((day) => day.trim())
      .filter((day) => day);

    return days.map((day, index) => {
      const dayParts = day
        .split(/\d\./)
        .map((part) => part.trim())
        .filter((part) => part);
      const dayTitle = dayParts[0];
      const exercises = dayParts.slice(1);

      return (
        <div key={index}>
          <strong>{dayTitle}</strong>
          <ul>
            {exercises.map((exercise, idx) => (
              <li key={idx}>{exercise}</li>
            ))}
          </ul>
        </div>
      );
    });
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full justify-center items-center bg-gray-100">
        <div className="flex flex-col w-full max-w-4xl h-full border rounded-lg overflow-hidden bg-white">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">Workout Generator</h1>
          </header>
          <main className="flex-1 flex flex-col overflow-hidden p-4">
            <div className="flex-1 flex flex-col overflow-auto p-4 rounded-xl bg-muted/50">
              <Badge variant="outline" className="absolute right-3 top-3">
                Output
              </Badge>
              <div className="flex-1 overflow-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-2 border-b border-gray-200">
                    <strong>
                      {msg.role === "user" ? "You: " : "Assistant: "}
                    </strong>
                    <span>{msg.display}</span>
                  </div>
                ))}
                {loading && (
                  <div className="p-2 border-b border-gray-200">
                    <strong>Assistant: </strong>
                    <span>Thinking...</span>
                  </div>
                )}
              </div>
              {showCreateWorkout && (
                <div className="p-3 mt-4 border rounded bg-white">
                  <CreateWorkoutCard clients={clients} />
                </div>
              )}
              {showAllWorkouts && (
                <div className="p-3 mt-4 border rounded bg-white">
                  <WorkoutsList />
                </div>
              )}
              <div className="flex space-x-4 my-4">
                <Button
                  onClick={() => {
                    setShowCreateWorkout(!showCreateWorkout);
                    setShowAllWorkouts(false);
                  }}
                >
                  Create Workout Plan
                </Button>
                <Button
                  onClick={() => {
                    setShowAllWorkouts(!showAllWorkouts);
                    setShowCreateWorkout(false);
                  }}
                >
                  View All Workouts
                </Button>
              </div>
              <form
                onSubmit={handleSubmit}
                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              >
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Enter command here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="flex items-center p-3 pt-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                  <Button type="submit" size="sm" className="ml-auto gap-1.5">
                    Send Command
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default WorkoutGenerator;
