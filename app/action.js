// app/action.js
"use server";

import { generateText } from "ai";
import { createStreamableUI } from "ai/rsc";
export async function generateWorkoutPlan() {
  const uiStream = createStreamableUI();

  const result = await generateText({
    model: "openai/gpt-4o",
    prompt: "Generate a workout plan",
    stream: uiStream,
  });

  uiStream.done(result);

  return uiStream.value;
}

export async function addWorkout(muscleGroup) {
  const uiStream = createStreamableUI();

  const result = await generateText({
    model: "openai/gpt-4o",
    prompt: `Add a ${muscleGroup} workout to the workout plan`,
    stream: uiStream,
  });

  uiStream.done(result);

  return uiStream.value;
}
