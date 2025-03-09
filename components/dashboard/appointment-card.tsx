import { Calendar, Clock, Video, MapPin, MoreVertical } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AppointmentCardProps {
  appointment: {
    id: string
    doctorName: string
    specialty: string
    date: number
    time: string
    status: string
    type: string
  }
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const isUpcoming = new Date(appointment.date) > new Date()

  const getStatusBadge = () => {
    switch (appointment.status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
            Pending
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-200 text-gray-500">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500">
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
        <div>
          <h3 className="font-medium">{appointment.doctorName}</h3>
          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
        </div>
        {getStatusBadge()}
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-1 text-sm">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{new Date(appointment.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center">
            {appointment.type === "video" ? (
              <Video className="mr-2 h-4 w-4 text-muted-foreground" />
            ) : (
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span className="capitalize">{appointment.type} Consultation</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        {isUpcoming && appointment.status === "confirmed" && (
          <Button size="sm" variant="default">
            {appointment.type === "video" ? "Join Call" : "Get Directions"}
          </Button>
        )}
        {!isUpcoming && appointment.status === "completed" && (
          <Button size="sm" variant="outline">
            View Summary
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isUpcoming && (
              <>
                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Cancel</DropdownMenuItem>
              </>
            )}
            {!isUpcoming && appointment.status === "completed" && (
              <>
                <DropdownMenuItem>View Medical Record</DropdownMenuItem>
                <DropdownMenuItem>Download Summary</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}

