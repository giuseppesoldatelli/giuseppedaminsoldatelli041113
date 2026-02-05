import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { checkApiHealth } from "../check-api"

describe("checkApiHealth", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("deve retornar healthy quando a API responde com sucesso", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ content: [] }), { status: 200 })
    )

    const result = await checkApiHealth()

    expect(result.healthy).toBe(true)
    expect(result.latencyMs).toBeGreaterThanOrEqual(0)
    expect(result.error).toBeUndefined()
  })

  it("deve retornar healthy mesmo quando a API responde com 401", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response("Unauthorized", { status: 401 })
    )

    const result = await checkApiHealth()

    expect(result.healthy).toBe(true)
    expect(result.latencyMs).toBeGreaterThanOrEqual(0)
  })

  it("deve retornar unhealthy quando a requisição falha", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"))

    const result = await checkApiHealth()

    expect(result.healthy).toBe(false)
    expect(result.error).toBe("Network error")
  })

  it("deve retornar unhealthy com mensagem de timeout quando aborta", async () => {
    const abortError = new Error("Aborted")
    abortError.name = "AbortError"
    vi.mocked(fetch).mockRejectedValueOnce(abortError)

    const result = await checkApiHealth()

    expect(result.healthy).toBe(false)
    expect(result.error).toBe("Request timeout")
  })

  it("deve chamar a URL correta da API", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ content: [] }), { status: 200 })
    )

    await checkApiHealth()

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/v1/pets?size=1"),
      expect.objectContaining({ method: "GET" })
    )
  })
})
