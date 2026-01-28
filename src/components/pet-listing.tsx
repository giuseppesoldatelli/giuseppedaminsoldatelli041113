"use client"

import { useState, useMemo } from "react"
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { pets, type Pet } from "@/data/pets"
import { PetCard } from "@/components/pet-card"
import { PetDetailDialog } from "@/components/pet-detail-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const PER_PAGE = 10

export function PetListing() {
  const [busca, setBusca] = useState("")
  const [pagina, setPagina] = useState(1)
  const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null)

  const filtrados = useMemo(
    () => pets.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase())),
    [busca]
  )

  const totalPages = Math.ceil(filtrados.length / PER_PAGE)
  const paginados = filtrados.slice((pagina - 1) * PER_PAGE, pagina * PER_PAGE)

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
          <Button className="rounded-xl h-12 gap-2">
            <Plus className="size-5" />
            Adicionar Pet
          </Button>
        </div>

        {paginados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {paginados.map((pet) => (
              <PetCard key={pet.id} pet={pet} onClick={() => setPetSelecionado(pet)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Search className="size-12 mb-4" />
            <p className="text-lg font-medium">Nenhum pet encontrado</p>
            <p className="text-sm">Tente buscar por outro nome</p>
          </div>
        )}

        {totalPages > 1 && (
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <Button
                key={num}
                variant={num === pagina ? "default" : "outline"}
                size="icon"
                className="rounded-full"
                onClick={() => setPagina(num)}
              >
                {num}
              </Button>
            ))}

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

      <PetDetailDialog
        pet={petSelecionado}
        open={petSelecionado !== null}
        onOpenChange={(open) => { if (!open) setPetSelecionado(null) }}
      />
    </div>
  )
}
