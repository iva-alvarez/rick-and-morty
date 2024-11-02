export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type:string;
  gender:string; 
  image: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export interface CharacterStore {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  fetchCharacters: () => Promise<void>;
  addCharacters: (Character: Omit<Character , 'id' | 'image'| 'type' | 'gender'>) => void;
  updateCharacter: (id: number, character: Partial<Character>) => void;
  deleteCharacter: (id: number) => void;
}

export interface EpisodeStore {
  episodes: Episode[];
  isLoading: boolean;
  error: string | null;
  fetchEpisode: () => Promise<void>;
  addEpisode: (Character: Omit<Episode , 'id' | 'air_date'>) => void;
  updateEpisode: (id: number, character: Partial<Episode>) => void;
  deleteEpisode: (id: number) => void;
}
