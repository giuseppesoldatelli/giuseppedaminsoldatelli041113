import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "../card"

describe("Card", () => {
  it("deve renderizar com data-slot correto", () => {
    render(<Card data-testid="card">Conteúdo</Card>)
    const card = screen.getByTestId("card")
    expect(card).toHaveAttribute("data-slot", "card")
  })

  it("deve aceitar className customizada", () => {
    render(<Card data-testid="card" className="custom-class">Conteúdo</Card>)
    const card = screen.getByTestId("card")
    expect(card).toHaveClass("custom-class")
  })
})

describe("CardHeader", () => {
  it("deve renderizar com data-slot correto", () => {
    render(<CardHeader data-testid="header">Header</CardHeader>)
    const header = screen.getByTestId("header")
    expect(header).toHaveAttribute("data-slot", "card-header")
  })

  it("deve aceitar className customizada", () => {
    render(<CardHeader data-testid="header" className="custom-class">Header</CardHeader>)
    const header = screen.getByTestId("header")
    expect(header).toHaveClass("custom-class")
  })
})

describe("CardTitle", () => {
  it("deve renderizar conteúdo", () => {
    render(<CardTitle>Título do Card</CardTitle>)
    expect(screen.getByText("Título do Card")).toBeInTheDocument()
  })

  it("deve ter data-slot correto", () => {
    render(<CardTitle data-testid="title">Título</CardTitle>)
    const title = screen.getByTestId("title")
    expect(title).toHaveAttribute("data-slot", "card-title")
  })
})

describe("CardDescription", () => {
  it("deve renderizar conteúdo", () => {
    render(<CardDescription>Descrição do card</CardDescription>)
    expect(screen.getByText("Descrição do card")).toBeInTheDocument()
  })

  it("deve ter data-slot correto", () => {
    render(<CardDescription data-testid="desc">Descrição</CardDescription>)
    const desc = screen.getByTestId("desc")
    expect(desc).toHaveAttribute("data-slot", "card-description")
  })
})

describe("CardContent", () => {
  it("deve renderizar conteúdo", () => {
    render(<CardContent>Conteúdo principal</CardContent>)
    expect(screen.getByText("Conteúdo principal")).toBeInTheDocument()
  })

  it("deve ter data-slot correto", () => {
    render(<CardContent data-testid="content">Conteúdo</CardContent>)
    const content = screen.getByTestId("content")
    expect(content).toHaveAttribute("data-slot", "card-content")
  })
})

describe("CardFooter", () => {
  it("deve renderizar conteúdo", () => {
    render(<CardFooter>Footer do card</CardFooter>)
    expect(screen.getByText("Footer do card")).toBeInTheDocument()
  })

  it("deve ter data-slot correto", () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    const footer = screen.getByTestId("footer")
    expect(footer).toHaveAttribute("data-slot", "card-footer")
  })
})

describe("CardAction", () => {
  it("deve renderizar conteúdo", () => {
    render(<CardAction>Ação</CardAction>)
    expect(screen.getByText("Ação")).toBeInTheDocument()
  })

  it("deve ter data-slot correto", () => {
    render(<CardAction data-testid="action">Ação</CardAction>)
    const action = screen.getByTestId("action")
    expect(action).toHaveAttribute("data-slot", "card-action")
  })
})

describe("Card composto", () => {
  it("deve renderizar todos os componentes juntos", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Título</CardTitle>
          <CardDescription>Descrição</CardDescription>
          <CardAction>Ação</CardAction>
        </CardHeader>
        <CardContent>Conteúdo</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText("Título")).toBeInTheDocument()
    expect(screen.getByText("Descrição")).toBeInTheDocument()
    expect(screen.getByText("Ação")).toBeInTheDocument()
    expect(screen.getByText("Conteúdo")).toBeInTheDocument()
    expect(screen.getByText("Footer")).toBeInTheDocument()
  })
})
