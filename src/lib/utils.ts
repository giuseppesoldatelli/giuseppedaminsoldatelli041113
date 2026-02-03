import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPaginationItems(pagina: number, totalPages: number) {
  const items: (number | "ellipsis")[] = []
  const siblingsCount = 1

  items.push(1)

  const leftSibling = Math.max(pagina - siblingsCount, 2)
  const rightSibling = Math.min(pagina + siblingsCount, totalPages - 1)

  if (leftSibling > 2) {
    items.push("ellipsis")
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== totalPages) {
      items.push(i)
    }
  }

  if (rightSibling < totalPages - 1) {
    items.push("ellipsis")
  }

  if (totalPages > 1) {
    items.push(totalPages)
  }

  return items
}
