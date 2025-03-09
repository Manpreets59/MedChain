"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { AppointmentCard } from "./appointment-card"

interface AppointmentListProps {
  showAll?: boolean
}

export function AppointmentList({ showAll = false }: AppointmentListProps) {
  const [appointments, setAppointments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchAppointments() {
      try {
        setIsLoading(true)
        // In a real app, this would fetch from your API
        // For demo purposes, we'll use mock data
        const mockAppointments = [
          {
            id: "1",
            doctorName: "Dr. Sarah Johnson",
            specialty: "General Practitioner",
            date: new Date(Date.now() + 86400000 * 2).getTime(), // 2 days from now
            time: "10:00 AM",
            status: "confirmed",
            type: "video",
          },
          {
            id: "2",
            doctorName: "Dr. Michael Chen",
            specialty: "Cardiologist",
            date: new Date(Date.now() + 86400000 * 7).getTime(), // 7 days from now
            time: "2:30 PM",
            status: "confirmed",
            type: "video",
          },
          {
            id: "3",
            doctorName: "Dr. Emily Rodriguez",
            specialty: "Dermatologist",
            date: new Date(Date.now() - 86400000 * 3).getTime(), // 3 days ago
            time: "11:15 AM",
            status: "completed",
            type: "video",
          },
          {
            id: "4",
            doctorName: "Dr. James Wilson",
            specialty: "Neurologist",
            date: new Date(Date.now() + 86400000 * 14).getTime(), // 14 days from now
            time: "9:00 AM",
            status: "confirmed",
            type: "in-person",
          },
        ]

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setAppointments(mockAppointments)
      } catch (error) {
        console.error("Error fetching appointments:", error)
        toast({
          title: "Error",
          description: "Failed to fetch appointments",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
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

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No appointments found</p>
      </div>
    )
  }

  // Filter upcoming appointments for the dashboard
  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status !== "completed" && new Date(appointment.date) > new Date(),
  )

  // Sort by date (closest first)
  upcomingAppointments.sort((a, b) => a.date - b.date)

  // For the dashboard, show only upcoming appointments
  // For the appointments page, show all appointments sorted by date (upcoming first, then past)
  const displayAppointments = showAll
    ? appointments.sort((a, b) => {
        // First sort by status (upcoming first)
        if (a.status !== "completed" && b.status === "completed") return -1
        if (a.status === "completed" && b.status !== "completed") return 1
        // Then sort by date
        return a.date - b.date
      })
    : upcomingAppointments.slice(0, 3)

  return (
    <div className="space-y-4">
      {displayAppointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}

      {!showAll && upcomingAppointments.length > 3 && (
        <div className="text-center pt-2">
          <Button variant="link" asChild>
            <a href="/dashboard/appointments">View all appointments</a>
          </Button>
        </div>
      )}

      {showAll && displayAppointments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No upcoming appointments</p>
          <Button variant="outline" className="mt-4" asChild>
            <a href="/dashboard/appointments/new">Schedule an appointment</a>
          </Button>
        </div>
      )}
    </div>
  )
}

