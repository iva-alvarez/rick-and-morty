import { Character, Episode } from "../store/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const apiService = {
    async fetchCharacters(): Promise<Character[]> {
      try {
        const response = await fetch(`${BASE_URL}/character`);
        if (!response.ok) throw new Error('Error fetching characters');
        const data = await response.json();
        return data.results;
      } catch (error) {
        throw error;
      }
    },
  
    async fetchEpisodes(): Promise<Episode[]> {
      try {
        const response = await fetch(`${BASE_URL}/episode`);
        if (!response.ok) throw new Error('Error fetching episodes');
        const data = await response.json();
        return data.results;
      } catch (error) {
        throw error;
      }
    }
  };