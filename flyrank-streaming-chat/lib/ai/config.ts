import { createOpenRouter } from "@openrouter/ai-sdk-provider";

/**
 * Central AI configuration for the FlyRank streaming chat.
 *
 * The API key is read only on the server from .env.local.
 * Never expose this key in client-side code.
 */
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

/**
 * Free OpenRouter model used for the internship demo.
 */
export const chatModel = openrouter("openrouter/free");

/**
 * System prompt controlling the assistant behaviour.
 */
export const systemPrompt = `
You are a helpful AI assistant inside a streaming chat application.

Give clear, concise, and friendly answers.
Answer the user's question directly.
Use simple formatting when useful.
`;
