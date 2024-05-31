// app/dashboard/thinktank/page.js
"use client";

import { useState } from "react";
import {
  Bot,
  Code2,
  CornerDownLeft,
  Mic,
  Paperclip,
  Rabbit,
  Turtle,
} from "lucide-react";

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

const ThinkTank = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const exampleQuestions = [
    "What are some effective workout routines for building muscle?",
    "How can I improve my diet to support my fitness goals?",
    "Can you suggest a fitness challenge for a group of beginners?",
  ];

  const handleExampleQuestionClick = (question) => {
    setMessage(question);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.message.trim());
      } else {
        setResponse("Error: " + data.error);
      }
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[56px]">
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">Think Tank</h1>
          </header>
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative hidden flex-col items-start gap-8 md:flex">
              <div className="grid w-full items-start gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Instructions
                </legend>
                <p>BodyGPT Chatbot</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    <strong>Interactive Brainstorming:</strong> Use BodyGPT to
                    facilitate brainstorming sessions. You can input ideas and
                    get suggestions, refinements, or completely new concepts.
                  </li>
                  <li>
                    <strong>Fitness Challenge Creation:</strong> BodyGPT can
                    help generate fitness challenges based on the input from the
                    trainers, offering customized routines or competitive tasks.
                  </li>
                  <li>
                    <strong>Q&A:</strong> You can ask BodyGPT questions about
                    fitness, nutrition, workout plans, etc., and get detailed
                    responses.
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
              <Badge variant="outline" className="absolute right-3 top-3">
                Output
              </Badge>
              <div className="flex-1 p-3">
                <div className="flex flex-col gap-2 mb-4">
                  <p className="text-sm font-medium">Example Questions:</p>
                  {exampleQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleExampleQuestionClick(question)}
                      className="text-left"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  response && (
                    <div className="p-3 mt-4 border rounded bg-white">
                      <p>{response}</p>
                    </div>
                  )
                )}
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
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
                    Send Message
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

export default ThinkTank;
