"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash } from "lucide-react" 
import {  Episode } from "@/app/store/types"
import { useEpisodeStore } from "@/app/store/EpisodeStore"

interface ColumnsProps {
  onEdit: (episode: Episode) => void

}


export const columnsEpisodes = ({ onEdit }: ColumnsProps): ColumnDef<Episode>[] => [
  
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "episode",
    header: "Episodio",
  },
  {
    accessorKey: "air_date",
    header: "Fecha al aire",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const episode = row.original
      const { deleteEpisode } = useEpisodeStore()
 
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
              onClick={() => onEdit(episode)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Pencil className="h-4 w-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => deleteEpisode(episode.id)}
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