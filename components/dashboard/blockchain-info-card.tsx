"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useWeb3 } from "@/lib/web3-context"
import { Database, Shield, FileCheck } from "lucide-react"

export function BlockchainInfoCard() {
  const [blockchainInfo, setBlockchainInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { web3, account } = useWeb3()

  useEffect(() => {
    async function fetchBlockchainInfo() {
      try {
        setIsLoading(true)
        // In a real app, this would fetch actual blockchain data
        // For demo purposes, we'll use mock data

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setBlockchainInfo({
          network: "Ethereum Mainnet",
          recordsCount: 12,
          lastUpdated: new Date().getTime(),
          walletAddress: account || "0x1234...5678",
        })
      } catch (error) {
        console.error("Error fetching blockchain info:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlockchainInfo()
  }, [account])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blockchain Security</CardTitle>
        <CardDescription>Your medical records are securely stored on the blockchain</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <div className="text-center">
                <p className="text-sm font-medium">Network</p>
                <p className="text-lg">{blockchainInfo.network}</p>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
              <FileCheck className="h-8 w-8 text-primary mb-2" />
              <div className="text-center">
                <p className="text-sm font-medium">Records</p>
                <p className="text-lg">{blockchainInfo.recordsCount} Verified</p>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
              <Database className="h-8 w-8 text-primary mb-2" />
              <div className="text-center">
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-lg">{new Date(blockchainInfo.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

