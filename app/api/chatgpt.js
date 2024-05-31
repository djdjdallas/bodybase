// pages/api/chatgpt.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await openai.createCompletion({
      model: "gpt-4-turbo",
      prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    res.status(200).json({ message: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: "Error fetching response from OpenAI" });
  }
}
