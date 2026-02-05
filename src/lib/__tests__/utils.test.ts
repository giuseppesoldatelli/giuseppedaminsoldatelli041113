import { describe, it, expect } from "vitest"
import { cn, getPaginationItems } from "../utils"

describe("cn", () => {
  it("deve mesclar nomes de classes", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("deve lidar com classes condicionais", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz")
  })

  it("deve mesclar classes tailwind corretamente", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4")
  })
})

describe("getPaginationItems", () => {
  it("deve retornar [1] para página única", () => {
    expect(getPaginationItems(1, 1)).toEqual([1])
  })

  it("deve retornar [1, 2] para duas páginas", () => {
    expect(getPaginationItems(1, 2)).toEqual([1, 2])
  })

  it("deve retornar [1, 2, 3] para três páginas", () => {
    expect(getPaginationItems(2, 3)).toEqual([1, 2, 3])
  })

  it("deve mostrar reticências para muitas páginas quando na primeira página", () => {
    const result = getPaginationItems(1, 10)
    expect(result).toEqual([1, 2, "ellipsis", 10])
  })

  it("deve mostrar reticências para muitas páginas quando na última página", () => {
    const result = getPaginationItems(10, 10)
    expect(result).toEqual([1, "ellipsis", 9, 10])
  })

  it("deve mostrar reticências em ambos os lados quando no meio", () => {
    const result = getPaginationItems(5, 10)
    expect(result).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 10])
  })

  it("não deve mostrar reticências à esquerda quando próximo do início", () => {
    const result = getPaginationItems(3, 10)
    expect(result).toEqual([1, 2, 3, 4, "ellipsis", 10])
  })

  it("não deve mostrar reticências à direita quando próximo do fim", () => {
    const result = getPaginationItems(8, 10)
    expect(result).toEqual([1, "ellipsis", 7, 8, 9, 10])
  })
})
