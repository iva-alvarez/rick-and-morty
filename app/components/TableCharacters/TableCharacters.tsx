"use client"

import { thisCharacterStore } from "@/app/store/CharacterStore"
import { Character } from "@/app/store/types"
import { useEffect, useState } from "react"
import { EditCharacterDialog } from "./EditCharacter"
import { columnsCharacter } from "./ColumnsCharacters"
import { DataTableCharacters } from "./DataTableCharacters"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"


export function TableCharacters() {
  const { characters, fetchCharacters, isLoading, error } = thisCharacterStore()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const router = useRouter()
  
  useEffect(() => {
    fetchCharacters()
  }, [fetchCharacters])

  
 
 
  
  const handleEdit = (character: Character) => {
    setSelectedCharacter(character)
    setIsEditModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsEditModalOpen(false)
    setSelectedCharacter(null)
  }


  const columns = columnsCharacter({
    onEdit: handleEdit
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto py-10">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Personajes</h1>
      <Button 
        onClick={() => router.push('/characters/create')}
        className="flex items-center gap-2"
        variant="outline" 
      >
        <Plus className="h-4 w-4" /> Crear Personaje
      </Button>
    </div>

    <DataTableCharacters 
      columns={columns} 
      data={characters} 
    />
    
    <EditCharacterDialog
      character={selectedCharacter}
      isOpen={isEditModalOpen}
      onClose={handleCloseModal}
    />
  </div>
  )
}