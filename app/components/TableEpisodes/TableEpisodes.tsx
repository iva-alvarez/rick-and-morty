"use client"

import { Character, Episode } from "@/app/store/types"
import { useEffect, useState } from "react"
import {  DataTableEpisodes } from "./DataTableEpisodes"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ThisEpisodeStore } from "@/app/store/EpisodeStore"
import { EditEpisodeDialog } from "./EditEpisode"
import { columnsEpisodes } from "./ColumnsEpisodes"


export function TableEpisodes() {
  const { episodes, fetchEpisode, isLoading, error } = ThisEpisodeStore()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null)
  const router = useRouter()
  
  useEffect(() => {
    fetchEpisode()
  }, [fetchEpisode])

  
  
  const handleEdit = (episode: Episode) => {
    setSelectedEpisode(episode)
    setIsEditModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsEditModalOpen(false)
    setSelectedEpisode(null)
  }


  const columns = columnsEpisodes({
    onEdit: handleEdit
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto py-10">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Episodios</h1>
      <Button 
        onClick={() => router.push('/episodes/create')}
        className="flex items-center gap-2"
        variant="outline" 
      >
        <Plus className="h-4 w-4" /> Crear Episodios
      </Button>
    </div>

    <DataTableEpisodes 
      columns={columns} 
      data={episodes} 
    />
    
    <EditEpisodeDialog
      episode={selectedEpisode}
      isOpen={isEditModalOpen}
      onClose={handleCloseModal}
    />
  </div>
  )
}