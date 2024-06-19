import { createAI } from "ai/rsc"; // Ensure this is the correct import path
import { sendMessage } from "./serverActions"; // Adjust path as needed

export const AI = createAI({
  initialAIState: [],
  initialUIState: [],
  actions: {
    sendMessage,
  },
});
