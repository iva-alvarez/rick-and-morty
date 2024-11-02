"use client"

import { ThisEpisodeStore } from "@/app/store/EpisodeStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateEpisode() {
  
  const router = useRouter()
  const addEpisodes = ThisEpisodeStore(state => state.addEpisode)

  const [formData, setFormData] = useState({
    name: "",
    episode: "",
    
    
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addEpisodes(formData)
      router.push("/episodes") 
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Crea un nuevo episodio</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nombre"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="species">Episodio</Label>
            <Input
              id="species"
              value={formData.episode}
              onChange={(e) => setFormData({ ...formData, episode: e.target.value })}
              placeholder="Especie"
              required
            />
          </div>
          <div className="flex gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit">Crear</Button>
          </div>
        </form>
      </div>
    </div>
  )
}