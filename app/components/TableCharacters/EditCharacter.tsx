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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Character } from "@/app/store/types"
import { thisCharacterStore } from "@/app/store/CharacterStore"

interface EditCharacterDialogProps {
  character: Character | null
  isOpen: boolean
  onClose: () => void
}

export function EditCharacterDialog({ 
  character, 
  isOpen, 
  onClose 
}: EditCharacterDialogProps) {
  const updateCharacter = thisCharacterStore(state => state.updateCharacter)
  const [formData, setFormData] = useState<Character | null>(null)
 
  useEffect(() => {
    if (character) {
      setFormData(character)
    }
  }, [character])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData && character) {
      updateCharacter(character.id, formData)
      onClose()
    }
  }

  if (!formData) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby="" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar personaje</DialogTitle>
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
            <Label htmlFor="species">Especies</Label>
            <Input
              id="species"
              value={formData.species}
              onChange={(e) => setFormData({ ...formData, species: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Estatus</Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el estatus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alive">Alive</SelectItem>
                <SelectItem value="Dead">Dead</SelectItem>
                <SelectItem value="Unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
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