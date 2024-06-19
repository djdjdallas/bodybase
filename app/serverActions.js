"use server";

import { getAIState, getMutableAIState } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { generateText, streamText } from "ai";

export async function sendMessage(message) {
  const history = getMutableAIState();
  history.update([...history.get(), { role: "user", content: message }]);

  const result = await streamText({
    model: openai("gpt-4"),
    maxTokens: 1024,
    system: "You are a helpful chatbot.",
    messages: history.get(),
  });

  let streamedResponse = "";
  for await (const textPart of result.textStream) {
    streamedResponse += textPart;
  }

  history.done([
    ...history.get(),
    { role: "assistant", content: streamedResponse },
  ]);

  // Return the entire streamed response as a plain object
  return { text: streamedResponse };
}
