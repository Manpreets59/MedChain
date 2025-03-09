"use client"

import type React from "react"

import { forwardRef, type FormEvent } from "react"
import { Bot, Send, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface AiAssistantDialogProps {
  isOpen: boolean
  onClose: () => void
  messages: Message[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: FormEvent) => void
  isLoading: boolean
}

export const AiAssistantDialog = forwardRef<HTMLDivElement, AiAssistantDialogProps>(
  ({ isOpen, onClose, messages, input, handleInputChange, handleSubmit, isLoading }, ref) => {
    if (!isOpen) return null

    return (
      <Card
        ref={ref}
        className="fixed bottom-20 right-4 w-[90vw] max-w-md h-[70vh] max-h-[600px] z-50 shadow-xl flex flex-col overflow-hidden"
      >
        <CardHeader className="bg-primary text-primary-foreground py-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5" />
            MedChain AI Assistant
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex gap-3 max-w-[80%]", message.role === "user" ? "ml-auto" : "")}>
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "rounded-lg p-3",
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                {message.content}
              </div>

              {message.role === "user" && (
                <Avatar className="h-8 w-8 bg-muted">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 max-w-[80%]">
              <Avatar className="h-8 w-8 bg-primary">
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2 rounded-lg bg-muted p-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-3 border-t">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              placeholder="Ask me anything..."
              value={input}
              onChange={handleInputChange}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    )
  },
)

AiAssistantDialog.displayName = "AiAssistantDialog"

