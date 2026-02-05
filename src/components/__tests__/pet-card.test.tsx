import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { PetCard } from "../pet-card"
import type { ApiPet } from "@/lib/api/types"

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe("PetCard", () => {
  const petBase: ApiPet = {
    id: 1,
    nome: "Rex",
    idade: 3,
  }

  it("deve renderizar o nome do pet", () => {
    render(<PetCard pet={petBase} />)
    expect(screen.getByText("Rex")).toBeInTheDocument()
  })

  it("deve renderizar a idade no singular", () => {
    render(<PetCard pet={{ ...petBase, idade: 1 }} />)
    expect(screen.getByText("1 ano")).toBeInTheDocument()
  })

  it("deve renderizar a idade no plural", () => {
    render(<PetCard pet={petBase} />)
    expect(screen.getByText("3 anos")).toBeInTheDocument()
  })

  it("deve renderizar a raça quando fornecida", () => {
    render(<PetCard pet={{ ...petBase, raca: "Labrador" }} />)
    expect(screen.getByText("Labrador")).toBeInTheDocument()
  })

  it("deve ter link para a página de detalhes do pet", () => {
    render(<PetCard pet={petBase} />)
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/pets/1")
  })
})
