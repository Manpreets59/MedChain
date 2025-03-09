"use client"

import { Bot, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AiAssistantButtonProps {
  isOpen: boolean
  onClick: () => void
}

export function AiAssistantButton({ isOpen, onClick }: AiAssistantButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={cn(
        "fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50 transition-all duration-300",
        isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90",
      )}
    >
      {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      <span className="sr-only">{isOpen ? "Close AI Assistant" : "Open AI Assistant"}</span>
    </Button>
  )
}

