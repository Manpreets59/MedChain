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
      You are an AI medical assistant designed to provide preliminary symptom analysis.
      
      Guidelines:
      1. Analyze the symptoms described by the user.
      2. Provide possible causes but avoid definitive diagnoses.
      3. Suggest general care recommendations.
      4. ALWAYS include a disclaimer that this is not medical advice and the user should consult a healthcare professional.
      5. Ask follow-up questions if the symptoms are vague.
      6. If the symptoms sound serious or life-threatening, emphasize the importance of seeking immediate medical attention.
      
      Format your response in a clear, structured manner with sections for:
      - Symptom Analysis
      - Possible Causes
      - Recommendations
      - Important Notes
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
    console.error("Error in symptom checker:", error)
    return Response.json({ error: "Failed to analyze symptoms" }, { status: 500 })
  }
}

