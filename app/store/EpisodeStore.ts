import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EpisodeStore } from './types';
import { apiService } from '../services/Api';

export const ThisEpisodeStore = create<EpisodeStore>()(
  
  persist(
    (set ) => ({
      episodes: [],
      isLoading: false,
      error: null,

      fetchEpisode: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await apiService.fetchEpisodes();
          set({ episodes: data, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      addEpisode: (episodeData) => {
        set((state: any) => ({
          episodes: [
            ...state.episodes,
            {
              ...episodeData,
              id: Math.max(...state.episodes.map((e: { id: any; }) => e.id), 0) + 1
            }
          ]
        }));
      },

      updateEpisode: (id, episodeData) => {
        set((state) => ({
          episodes: state.episodes.map(ep =>
            ep.id === id ? { ...ep, ...episodeData } : ep
          )
        }));
      },

      deleteEpisode: (id) => {
        set((state) => ({
          episodes: state.episodes.filter(ep => ep.id !== id)
        }));
      },

    }),
    {
      name: 'episode-storage'
    }
  )
);