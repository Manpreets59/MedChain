"use client"

import { useState, useRef, useEffect } from "react"
import { AiAssistantButton } from "./ai-assistant-button"
import { AiAssistantDialog } from "./ai-assistant-dialog"
import { useChat } from "@/lib/use-chat"
import { useToast } from "@/hooks/use-toast"

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/assistant",
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content:
          "Hello! I'm your MedChain AI assistant. How can I help you today? You can ask me about your health records, appointments, or general medical questions.",
      },
    ],
    onError: (error) => {
      console.error("AI Assistant error:", error)
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      })
    },
  })

  // Close the dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 1) {
      // Don't save if it's just the welcome message
      localStorage.setItem("aiAssistantChat", JSON.stringify(messages))
    }
  }, [messages])

  // Load chat history from localStorage
  useEffect(() => {
    const savedChat = localStorage.getItem("aiAssistantChat")
    if (savedChat) {
      try {
        const parsedChat = JSON.parse(savedChat)
        setMessages(parsedChat)
      } catch (error) {
        console.error("Failed to parse saved chat:", error)
      }
    }
  }, [setMessages])

  return (
    <>
      <AiAssistantButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      <AiAssistantDialog
        ref={dialogRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  )
}

