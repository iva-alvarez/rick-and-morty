"use client"

import { thisCharacterStore } from "@/app/store/CharacterStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateCharacter() {
  
  const router = useRouter()
  const addCharacter = thisCharacterStore(state => state.addCharacters)

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    status: "Unknown",
    
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addCharacter(formData)
      router.push("/") 
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Crea un nuevo personaje</h1>
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
            <Label htmlFor="species">Especie</Label>
            <Input
              id="species"
              value={formData.species}
              onChange={(e) => setFormData({ ...formData, species: e.target.value })}
              placeholder="Especie"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estatus</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccciona un estatus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alive">Alive</SelectItem>
                <SelectItem value="Dead">Dead</SelectItem>
                <SelectItem value="Unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
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