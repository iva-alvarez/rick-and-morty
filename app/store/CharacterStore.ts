import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CharacterStore } from './types';
import { apiService } from '../services/Api';

export const thisCharacterStore = create<CharacterStore>()(
  persist(
    (set ) => ({
      characters: [],
      isLoading: false,
      error: null,

      fetchCharacters: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await apiService.fetchCharacters();
          set({ characters: data, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      addCharacters: (characterData) => {
        set((state: any ) => ({
          characters: [
            ...state.characters,
            {
              ...characterData,
              id: Math.max(...state.characters.map((c: { id: any; }) => c.id), 0) + 1
            }
          ]
        }));
      },

      updateCharacter: (id, characterData) => {
        set((state) => ({
          characters: state.characters.map(char =>
            char.id === id ? { ...char, ...characterData } : char
          )
        }));
      },

      deleteCharacter: (id) => {
        set((state) => ({
          characters: state.characters.filter(char => char.id !== id)
        }));
      },

    }),
    {
      name: 'character-storage'
    }
  )
);