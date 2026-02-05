import type { HealthCheckResult } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://pet-manager-api.geia.vip"
const TIMEOUT_MS = 5000

export async function checkApiHealth(): Promise<HealthCheckResult> {
  const startTime = performance.now()

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

    const response = await fetch(`${API_URL}/v1/pets?size=1`, {
      method: "GET",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const latencyMs = Math.round(performance.now() - startTime)

    const isHealthy = response.status < 500

    return {
      healthy: isHealthy,
      latencyMs,
      ...(isHealthy ? {} : { error: `HTTP ${response.status}` }),
    }
  } catch (error) {
    const latencyMs = Math.round(performance.now() - startTime)

    if (error instanceof Error && error.name === "AbortError") {
      return {
        healthy: false,
        latencyMs,
        error: "Request timeout",
      }
    }

    return {
      healthy: false,
      latencyMs,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
