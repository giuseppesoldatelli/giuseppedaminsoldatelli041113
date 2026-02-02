"use client"

import { useRef, useState, useEffect } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface TruncatedTextProps {
  text: string
  className?: string
  as?: "span" | "badge"
}

export function TruncatedText({ text, className, as = "span" }: TruncatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (el) {
      setIsTruncated(el.scrollWidth > el.clientWidth)
    }
  }, [text])

  const content = as === "badge" ? (
    <Badge
      ref={ref}
      variant="secondary"
      className={`overflow-hidden text-ellipsis whitespace-nowrap block ${className ?? ""}`}
    >
      {text}
    </Badge>
  ) : (
    <span
      ref={ref}
      className={`overflow-hidden text-ellipsis whitespace-nowrap block ${className ?? ""}`}
    >
      {text}
    </span>
  )

  if (!isTruncated) {
    return content
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {content}
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  )
}
