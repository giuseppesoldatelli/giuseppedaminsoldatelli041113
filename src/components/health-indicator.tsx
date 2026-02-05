"use client"

import { useEffect, useState } from "react"
import { Circle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { HealthResponse } from "@/lib/health/types"

type HealthStatus = "loading" | "healthy" | "unhealthy"

export function HealthIndicator() {
  const [status, setStatus] = useState<HealthStatus>("loading")
  const [latencyMs, setLatencyMs] = useState<number | null>(null)

  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await fetch("/api/health")
        const data: HealthResponse = await response.json()
        setStatus(data.status)
        setLatencyMs(data.checks.api.latencyMs)
      } catch {
        setStatus("unhealthy")
        setLatencyMs(null)
      }
    }

    checkHealth()
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  const statusConfig = {
    loading: {
      color: "text-muted-foreground",
      fill: "fill-muted-foreground",
      label: "Verificando...",
    },
    healthy: {
      color: "text-green-500",
      fill: "fill-green-500",
      label: "API Online",
    },
    unhealthy: {
      color: "text-red-500",
      fill: "fill-red-500",
      label: "API Offline",
    },
  }

  const config = statusConfig[status]

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-card shadow-sm border border-border hover:border-primary/50 dark:bg-card/90 dark:border-border/60"
          aria-label={config.label}
        >
          <Circle className={`w-2.5 h-2.5 ${config.color} ${config.fill}`} />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{config.label}</p>
        {latencyMs !== null && status === "healthy" && (
          <p className="text-muted-foreground">{latencyMs}ms</p>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
