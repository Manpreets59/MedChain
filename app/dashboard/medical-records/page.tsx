import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MedicalRecordList } from "@/components/dashboard/medical-record-list"
import { BlockchainInfoCard } from "@/components/dashboard/blockchain-info-card"

export default function MedicalRecordsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
        <p className="text-muted-foreground">Your complete medical history secured on the blockchain</p>
      </div>

      <BlockchainInfoCard />

      <Card>
        <CardHeader>
          <CardTitle>All Medical Records</CardTitle>
          <CardDescription>Complete history of your diagnoses and treatments</CardDescription>
        </CardHeader>
        <CardContent>
          <MedicalRecordList showAll />
        </CardContent>
      </Card>
    </div>
  )
}

