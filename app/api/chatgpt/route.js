import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const POST = async (req, res) => {
  const { messages } = await req.json();

  try {
    const result = await streamText({
      model: openai("gpt-4o"),
      messages,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching response from OpenAI" });
  }
};
