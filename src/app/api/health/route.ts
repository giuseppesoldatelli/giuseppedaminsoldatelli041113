import { NextResponse } from "next/server"
import { checkApiHealth } from "@/lib/health/check-api"
import type { HealthResponse } from "@/lib/health/types"

export async function GET() {
  const apiCheck = await checkApiHealth()

  const response: HealthResponse = {
    status: apiCheck.healthy ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    checks: {
      api: apiCheck,
    },
  }

  return NextResponse.json(response, {
    status: apiCheck.healthy ? 200 : 503,
  })
}
