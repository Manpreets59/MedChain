"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Activity, Heart, Thermometer, Weight } from "lucide-react"

export function HealthSummary() {
  const [healthData, setHealthData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchHealthData() {
      try {
        setIsLoading(true)
        // In a real app, this would fetch from your API
        // For demo purposes, we'll use mock data
        const mockHealthData = {
          vitals: {
            bloodPressure: "120/80",
            heartRate: "72 bpm",
            temperature: "98.6°F",
            weight: "165 lbs",
            height: "5'10\"",
            bmi: "23.7",
          },
          medications: [
            { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
            { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime" },
          ],
          allergies: ["Penicillin", "Peanuts"],
          conditions: ["Hypertension", "Seasonal allergies"],
        }

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1200))

        setHealthData(mockHealthData)
      } catch (error) {
        console.error("Error fetching health data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHealthData()
  }, [])

  return (
    <Card>
      <CardContent className="p-0">
        <Tabs defaultValue="vitals">
          <TabsList className="w-full grid grid-cols-4 rounded-none border-b">
            <TabsTrigger
              value="vitals"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Vitals
            </TabsTrigger>
            <TabsTrigger
              value="medications"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Medications
            </TabsTrigger>
            <TabsTrigger
              value="allergies"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Allergies
            </TabsTrigger>
            <TabsTrigger
              value="conditions"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Conditions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vitals" className="p-4">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center">
                  <Heart className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Blood Pressure</p>
                  <p className="text-lg font-medium">{healthData.vitals.bloodPressure}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Activity className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                  <p className="text-lg font-medium">{healthData.vitals.heartRate}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Thermometer className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="text-lg font-medium">{healthData.vitals.temperature}</p>
                </div>
                <div className="flex flex-col items-center">
                  <Weight className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">BMI</p>
                  <p className="text-lg font-medium">{healthData.vitals.bmi}</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="medications" className="p-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {healthData.medications.length > 0 ? (
                  healthData.medications.map((med: any, index: number) => (
                    <div key={index} className="space-y-1">
                      <p className="font-medium">
                        {med.name} ({med.dosage})
                      </p>
                      <p className="text-sm text-muted-foreground">{med.frequency}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No medications</p>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="allergies" className="p-4">
            {isLoading ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {healthData.allergies.length > 0 ? (
                  healthData.allergies.map((allergy: string, index: number) => (
                    <div key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {allergy}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No known allergies</p>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="conditions" className="p-4">
            {isLoading ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-8 w-32 rounded-full" />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {healthData.conditions.length > 0 ? (
                  healthData.conditions.map((condition: string, index: number) => (
                    <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {condition}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No known conditions</p>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

