"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { nanoid } from "nanoid"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface UseChatOptions {
  api?: string
  initialMessages?: Message[]
  onResponse?: (response: any) => void
  onError?: (error: Error) => void
}

export function useChat({ api = "/api/chat", initialMessages = [], onResponse, onError }: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault()

      if (!input.trim()) {
        return
      }

      setIsLoading(true)

      // Add user message to the chat
      const userMessage: Message = {
        id: nanoid(),
        role: "user",
        content: input,
      }

      setMessages((messages) => [...messages, userMessage])
      setInput("")

      try {
        // Send the message to the API
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Add assistant message to the chat
        const assistantMessage: Message = {
          id: nanoid(),
          role: "assistant",
          content: data.content,
        }

        setMessages((messages) => [...messages, assistantMessage])

        // Call the onResponse callback if provided
        onResponse?.(data)
      } catch (error) {
        console.error("Error sending message:", error)
        onError?.(error as Error)
      } finally {
        setIsLoading(false)
      }
    },
    [api, input, messages, onResponse, onError],
  )

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  }
}

