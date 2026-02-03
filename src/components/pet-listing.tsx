"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Search, ChevronLeft, ChevronRight, Plus, Loader2 } from "lucide-react"
import { getPets } from "@/lib/api/pets"
import { getPaginationItems } from "@/lib/utils"
import type { ApiPet } from "@/lib/api/types"
import { PetCard } from "@/components/pet-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const PER_PAGE = 10

export function PetListing() {
  const [busca, setBusca] = useState("")
  const [pagina, setPagina] = useState(1)
  const [pets, setPets] = useState<ApiPet[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getPets({
        page: pagina - 1,
        size: PER_PAGE,
        nome: busca || undefined,
      })
      setPets(response.content)
      setTotalPages(response.pageCount)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar pets")
    } finally {
      setLoading(false)
    }
  }, [pagina, busca])

  useEffect(() => {
    fetchPets()
  }, [fetchPets])

  function handleBusca(valor: string) {
    setBusca(valor)
    setPagina(1)
  }

  return (
    <div className="mt-16 w-full pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1 rounded-xl shadow-lg bg-card dark:bg-card">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground z-10" />
            <Input
              placeholder="Buscar pet por nome..."
              value={busca}
              onChange={(e) => handleBusca(e.target.value)}
              className="rounded-xl border-0 pl-11 h-12 bg-transparent shadow-none"
            />
          </div>
          <Link href="/pets/new">
            <Button className="rounded-xl h-12 gap-2">
              <Plus className="size-5" />
              Adicionar Pet
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="size-12 mb-4 animate-spin" />
            <p className="text-lg font-medium">Carregando pets...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-destructive">
            <p className="text-lg font-medium">Erro ao carregar</p>
            <p className="text-sm">{error}</p>
            <Button variant="outline" className="mt-4" onClick={fetchPets}>
              Tentar novamente
            </Button>
          </div>
        ) : pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Search className="size-12 mb-4" />
            <p className="text-lg font-medium">Nenhum pet encontrado</p>
            <p className="text-sm">Tente buscar por outro nome</p>
          </div>
        )}

        {totalPages > 1 && !loading && !error && pets.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={pagina === 1}
              onClick={() => setPagina((p) => p - 1)}
            >
              <ChevronLeft />
            </Button>

            {getPaginationItems(pagina, totalPages).map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="text-muted-foreground"
                >
                  ...
                </span>
              ) : (
                <Button
                  key={item}
                  variant={item === pagina ? "default" : "outline"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => setPagina(item)}
                >
                  {item}
                </Button>
              )
            )}

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={pagina === totalPages}
              onClick={() => setPagina((p) => p + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
