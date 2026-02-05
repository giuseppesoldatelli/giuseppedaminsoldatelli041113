import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { TutorCard } from "../tutor-card"
import type { ApiTutor } from "@/lib/api/types"

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe("TutorCard", () => {
  const tutorBase: ApiTutor = {
    id: 1,
    nome: "João Silva",
    telefone: "(11) 99999-9999",
  }

  it("deve renderizar o nome do tutor", () => {
    render(<TutorCard tutor={tutorBase} />)
    expect(screen.getByText("João Silva")).toBeInTheDocument()
  })

  it("deve renderizar o telefone do tutor", () => {
    render(<TutorCard tutor={tutorBase} />)
    expect(screen.getByText("(11) 99999-9999")).toBeInTheDocument()
  })

  it("deve ter link para a página de detalhes do tutor", () => {
    render(<TutorCard tutor={tutorBase} />)
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/tutores/1")
  })
})
