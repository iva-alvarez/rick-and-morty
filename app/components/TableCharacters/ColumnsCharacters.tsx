"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash } from "lucide-react" 
import { Character } from "@/app/store/types"
import { useCharacterStore } from "@/app/store/CharacterStore"

interface ColumnsProps {
  onEdit: (character: Character) => void

}


export const columnsCharacter = ({ onEdit }: ColumnsProps): ColumnDef<Character>[] => [
  {
    accessorKey: "image",
    header: "Imagen",
    cell: ({ row }) => (
      <img 
        src={row.original.image} 
        alt={row.original.name}
        className="w-12 h-12 rounded-full"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  
  {
    accessorKey: "species",
    header: "Especies",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <div>
          {type ? type : 'No tiene'}
        </div>
      )
    }
  },
  {
    accessorKey: "gender",
    header: "Género",
    
  },
  {
    accessorKey: "status",
    header: "Estatus",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${status === 'Alive' ? ' text-green-600' : 
            status === 'Dead' ? ' text-red-800' : 
            ' text-blue-600'}
        `}>
          {status}
        </div>
      )
    }
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const character = row.original
      const { deleteCharacter } = useCharacterStore()
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => onEdit(character)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Pencil className="h-4 w-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => deleteCharacter(character.id)}
              className="flex items-center gap-2 text-red-600 cursor-pointer"
            >
              <Trash className="h-4 w-4" /> Borrar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  
]