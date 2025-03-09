"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { SymptomCheckerChat } from "@/components/dashboard/symptom-checker-chat"
import { useChat } from "@/lib/use-chat"

export default function SymptomCheckerPage() {
  const { toast } = useToast()
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/symptom-checker",
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to analyze symptoms. Please try again.",
        variant: "destructive",
      })
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Symptom Checker</h1>
        <p className="text-muted-foreground">Describe your symptoms for an AI-powered initial assessment</p>
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Symptom Analysis</CardTitle>
          <CardDescription>
            This is not a replacement for professional medical advice. Always consult with a healthcare provider for
            proper diagnosis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SymptomCheckerChat messages={messages} isLoading={isLoading} />
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Textarea
              placeholder="Describe your symptoms in detail..."
              value={input}
              onChange={handleInputChange}
              className="flex-1 min-h-24 resize-none"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? "Analyzing..." : "Analyze"}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

