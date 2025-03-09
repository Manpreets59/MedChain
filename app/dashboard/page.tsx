import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MedicalRecordList } from "@/components/dashboard/medical-record-list"
import { AppointmentList } from "@/components/dashboard/appointment-list"
import { HealthSummary } from "@/components/dashboard/health-summary"
import { Button } from "@/components/ui/button"
import { PlusCircle, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your secure healthcare dashboard</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/symptom-checker">
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Symptom Checker
            </Button>
          </Link>
          <Link href="/dashboard/appointments/new">
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </Link>
        </div>
      </div>

      <HealthSummary />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled telemedicine appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentList />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Medical Records</CardTitle>
            <CardDescription>Your blockchain-secured medical history</CardDescription>
          </CardHeader>
          <CardContent>
            <MedicalRecordList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

