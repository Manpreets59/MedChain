"use client"

import { useState, useEffect } from "react"
import { useWeb3 } from "@/lib/web3-context"
import { MedicalRecordCard } from "./medical-record-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface MedicalRecordListProps {
  showAll?: boolean
}

export function MedicalRecordList({ showAll = false }: MedicalRecordListProps) {
  const [records, setRecords] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { web3, contract, account } = useWeb3()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchMedicalRecords() {
      try {
        setIsLoading(true)
        // In a real app, this would fetch from your blockchain contract
        // For demo purposes, we'll use mock data
        const mockRecords = [
          {
            id: "1",
            diagnosis: "Common Cold",
            description: "Patient presented with runny nose, sore throat, and mild fever.",
            treatment: "Rest, fluids, and over-the-counter cold medicine.",
            date: new Date("2023-12-15").getTime(),
            doctor: "Dr. Sarah Johnson",
            transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          },
          {
            id: "2",
            diagnosis: "Hypertension",
            description: "Routine checkup revealed elevated blood pressure (145/95).",
            treatment: "Prescribed lisinopril 10mg daily. Recommended dietary changes and exercise.",
            date: new Date("2023-11-02").getTime(),
            doctor: "Dr. Michael Chen",
            transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          },
          {
            id: "3",
            diagnosis: "Sprained Ankle",
            description: "Patient injured right ankle while jogging. Moderate swelling and pain.",
            treatment: "RICE protocol (Rest, Ice, Compression, Elevation). Prescribed ibuprofen for pain.",
            date: new Date("2023-09-18").getTime(),
            doctor: "Dr. Emily Rodriguez",
            transactionHash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
          },
        ]

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setRecords(mockRecords)
      } catch (error) {
        console.error("Error fetching medical records:", error)
        toast({
          title: "Error",
          description: "Failed to fetch medical records from blockchain",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchMedicalRecords()
  }, [toast])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    )
  }

  if (records.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No medical records found</p>
      </div>
    )
  }

  const displayRecords = showAll ? records : records.slice(0, 3)

  return (
    <div className="space-y-4">
      {displayRecords.map((record) => (
        <MedicalRecordCard key={record.id} record={record} />
      ))}

      {!showAll && records.length > 3 && (
        <div className="text-center pt-2">
          <Button variant="link" asChild>
            <a href="/dashboard/medical-records">View all records</a>
          </Button>
        </div>
      )}
    </div>
  )
}

