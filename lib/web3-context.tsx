"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import Web3 from "web3"

interface Web3ContextType {
  web3: Web3 | null
  account: string | null
  contract: any
  isConnected: boolean
  connectWallet: () => Promise<void>
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [contract, setContract] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Check if MetaMask is installed
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
          // Create a new web3 instance
          const web3Instance = new Web3(window.ethereum)
          setWeb3(web3Instance)

          // Try to get the connected accounts
          const accounts = await web3Instance.eth.getAccounts()
          if (accounts.length > 0) {
            setAccount(accounts[0])
            setIsConnected(true)

            // In a real app, you would initialize your contract here
            // const contractABI = [...];
            // const contractAddress = "0x...";
            // const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
            // setContract(contractInstance);
          }
        }
      } catch (error) {
        console.error("Error initializing Web3:", error)
      }
    }

    initWeb3()
  }, [])

  const connectWallet = async () => {
    try {
      if (web3) {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAccount(accounts[0])
        setIsConnected(true)
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  return (
    <Web3Context.Provider
      value={{
        web3,
        account,
        contract,
        isConnected,
        connectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider")
  }
  return context
}

