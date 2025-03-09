import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Get the OpenAI API key from environment variables
const openaiApiKey = process.env.OPENAI_API_KEY

export async function POST(req: Request) {
  try {
    if (!openaiApiKey) {
      return Response.json({ error: "OpenAI API key is not configured" }, { status: 500 })
    }

    const { messages } = await req.json()

    // Get the last user message
    const lastUserMessage = messages.filter((message: any) => message.role === "user").pop()

    if (!lastUserMessage) {
      return Response.json({ error: "No user message found" }, { status: 400 })
    }

    // Create a system prompt for the AI
    const systemPrompt = `
      You are an AI healthcare assistant for the MedChain platform, a blockchain-secured telemedicine service.
      
      Your capabilities:
      1. Answer questions about the platform features (appointments, medical records, symptom checker)
      2. Provide general health information and wellness tips
      3. Help users navigate the platform
      4. Explain medical terms in simple language
      5. Suggest when users should consult with a healthcare professional
      
      Guidelines:
      - Be friendly, helpful, and concise
      - Always clarify that you're an AI assistant, not a medical professional
      - For specific medical advice, recommend consulting with a doctor
      - If asked about specific user data (like "what's my blood pressure?"), explain that you don't have access to their specific medical records
      - If asked about blockchain, explain that MedChain uses blockchain technology to securely store medical records
      
      IMPORTANT: Never provide specific medical diagnoses or treatment recommendations. Always suggest consulting with a healthcare professional for medical concerns.
    `

    // Generate the AI response
    const { text } = await generateText({
      model: openai("gpt-4o", { apiKey: openaiApiKey }),
      system: systemPrompt,
      prompt: lastUserMessage.content,
    })

    // Return the AI response
    return Response.json({
      role: "assistant",
      content: text,
    })
  } catch (error) {
    console.error("Error in AI assistant:", error)
    return Response.json({ error: "Failed to process your request" }, { status: 500 })
  }
}

