export interface HealthCheckResult {
  healthy: boolean
  latencyMs: number
  error?: string
}

export interface HealthResponse {
  status: "healthy" | "unhealthy"
  timestamp: string
  checks: {
    api: HealthCheckResult
  }
}
