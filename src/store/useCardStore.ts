import api from '@/api';
import { create } from 'zustand';

type StoreState = {
  pokemonCards: any[];
  searchPage: number;
  pageSize: number;
  page: number;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  resetGames: () => void;
  setSearchPage: (page: number) => void;
  setPokemonCards: (games: any[]) => void;
  searchGames: () => Promise<void>;
};

export const useCardStore = create<StoreState>((set, get) => ({
  pokemonCards: [],
  searchPage: 1,
  pageSize: 10,
  page: 1,
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  resetGames: () => set({ pokemonCards: [], page: 1 }),
  setSearchPage: (page: number) => set({ page }),
  setPokemonCards: (games: any[]) => {
    const existingCards = get().pokemonCards;
    set({ pokemonCards: [...existingCards, ...games] });
  },
  searchGames: async () => {
    const { page, pageSize, setPokemonCards, setSearchPage, setIsLoading } = get();
    setIsLoading(true);
    if (page === 0) {
      return;
    }
    try {
      const response = await api.searchCards(page, pageSize);
      const { data } = response;
      if (data?.data.length > 0) {
        if (page === 1) {
          set({ pokemonCards: data.data });
        } else {
          setPokemonCards(data.data);
        }
        setSearchPage(page + 1);
      } else {
        setSearchPage(0);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error searching games:', error);
    }
    setIsLoading(false);
  },
}));
