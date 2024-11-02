"use client"


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Episode } from "@/app/store/types"
import { ThisEpisodeStore } from "@/app/store/EpisodeStore"


interface EditEpisodeDialogProps {
  episode: Episode | null
  isOpen: boolean
  onClose: () => void
}

export function EditEpisodeDialog({ 
  episode, 
  isOpen, 
  onClose 
}: EditEpisodeDialogProps) {
  const updateEpisode = ThisEpisodeStore(state => state.updateEpisode)
  const [formData, setFormData] = useState<Episode | null>(null)
 
  useEffect(() => {
    if (episode) {
      setFormData(episode)
    }
  }, [episode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData && episode) {
      updateEpisode(episode.id, formData)
      onClose()
    }
  }

  if (!formData) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby="" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar episodio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="species">Episodio</Label>
            <Input
              id="species"
              value={formData.episode}
              onChange={(e) => setFormData({ ...formData, episode: e.target.value })}
            />
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Editar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}