"use client"

import { useRef, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface SymptomCheckerChatProps {
  messages: Message[]
  isLoading: boolean
}

export function SymptomCheckerChat({ messages, isLoading }: SymptomCheckerChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Bot className="h-12 w-12 text-primary mb-4" />
        <h3 className="text-lg font-medium">AI Symptom Checker</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Describe your symptoms in detail, and our AI will provide an initial assessment. Remember, this is not a
          replacement for professional medical advice.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto p-1">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex items-start gap-3 rounded-lg p-3",
            message.role === "user" ? "bg-muted/50" : "bg-primary/5",
          )}
        >
          <Avatar className={message.role === "assistant" ? "bg-primary" : "bg-muted"}>
            <AvatarFallback>
              {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <div className="prose prose-sm dark:prose-invert">{message.content}</div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex items-start gap-3 rounded-lg p-3 bg-primary/5">
          <Avatar className="bg-primary">
            <AvatarFallback>
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 w-full max-w-md">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

