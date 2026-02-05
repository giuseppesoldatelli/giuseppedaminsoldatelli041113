import { describe, it, expect, beforeAll } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../tooltip"

beforeAll(() => {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  global.ResizeObserver = ResizeObserverMock
})

describe("TooltipProvider", () => {
  it("deve renderizar children", () => {
    render(
      <TooltipProvider>
        <span>Conteúdo filho</span>
      </TooltipProvider>
    )
    expect(screen.getByText("Conteúdo filho")).toBeInTheDocument()
  })
})

describe("Tooltip", () => {
  it("deve renderizar o trigger", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    )
    expect(screen.getByText("Hover me")).toBeInTheDocument()
  })

  it("deve ter data-slot no trigger", () => {
    render(
      <Tooltip>
        <TooltipTrigger data-testid="trigger">Trigger</TooltipTrigger>
        <TooltipContent>Content</TooltipContent>
      </Tooltip>
    )

    const trigger = screen.getByTestId("trigger")
    expect(trigger).toHaveAttribute("data-slot", "tooltip-trigger")
  })

  it("trigger deve ter data-state closed por padrão", () => {
    render(
      <Tooltip>
        <TooltipTrigger data-testid="trigger">Trigger</TooltipTrigger>
        <TooltipContent>Content</TooltipContent>
      </Tooltip>
    )

    const trigger = screen.getByTestId("trigger")
    expect(trigger).toHaveAttribute("data-state", "closed")
  })

  it("trigger deve renderizar com asChild", () => {
    render(
      <Tooltip>
        <TooltipTrigger asChild>
          <button>Custom Button</button>
        </TooltipTrigger>
        <TooltipContent>Content</TooltipContent>
      </Tooltip>
    )

    const button = screen.getByRole("button", { name: "Custom Button" })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("data-slot", "tooltip-trigger")
  })

  it("deve renderizar conteúdo quando open é true", () => {
    render(
      <Tooltip open>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent data-testid="tooltip-content">Visible content</TooltipContent>
      </Tooltip>
    )

    const content = screen.getByTestId("tooltip-content")
    expect(content).toBeInTheDocument()
    expect(content).toHaveTextContent("Visible content")
  })

  it("TooltipContent deve ter data-slot correto quando visível", () => {
    render(
      <Tooltip open>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent data-testid="content">Content</TooltipContent>
      </Tooltip>
    )

    const content = screen.getByTestId("content")
    expect(content).toHaveAttribute("data-slot", "tooltip-content")
  })

  it("TooltipContent deve aceitar className customizada", () => {
    render(
      <Tooltip open>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent data-testid="content" className="my-custom-class">Content</TooltipContent>
      </Tooltip>
    )

    const content = screen.getByTestId("content")
    expect(content).toHaveClass("my-custom-class")
  })
})
