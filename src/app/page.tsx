"use client"

import { useAuth } from "@/lib/auth/context"
import { PetListing } from "@/components/pet-listing"
import { LandingPage } from "@/components/landing-page"
import { Loader2 } from "lucide-react"

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return isAuthenticated ? <PetListing /> : <LandingPage />
}
