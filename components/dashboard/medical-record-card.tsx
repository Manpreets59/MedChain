"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExternalLink, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MedicalRecord {
  id: string
  diagnosis: string
  description: string
  treatment: string
  date: number
  doctor: string
  transactionHash: string
}

interface MedicalRecordCardProps {
  record: MedicalRecord
}

export function MedicalRecordCard({ record }: MedicalRecordCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="bg-white p-0 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">{record.diagnosis}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(record.date).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Verified
          </Badge>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="p-4 pt-0">
          <div className="space-y-3 mt-2 text-sm">
            <div>
              <div className="font-medium">Description</div>
              <p className="text-muted-foreground">{record.description}</p>
            </div>
            <div>
              <div className="font-medium">Treatment</div>
              <p className="text-muted-foreground">{record.treatment}</p>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="h-3.5 w-3.5" />
              <span>{record.doctor}</span>
            </div>
          </div>
        </CardContent>
      )}

      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <a
          href={`https://etherscan.io/tx/${record.transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm flex items-center hover:underline"
        >
          View on Blockchain
          <ExternalLink className="ml-1 h-3.5 w-3.5" />
        </a>

        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="p-0 h-8 w-8">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span className="sr-only">{expanded ? "Show less" : "Show more"}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

