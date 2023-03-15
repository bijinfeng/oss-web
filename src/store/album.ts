import { create } from "zustand";
import type { Album } from "@/interface";
import { getAlbum } from "@/request";

interface AlbumState {
  list: Album[];
  fetchAlbum: () => Promise<Album[]>;
}

export const useAlbumStore = create<AlbumState>((set) => {
  return {
    list: [],
    fetchAlbum: async (params = {}) => {
      const result = await getAlbum<Album[]>(params);
      set({ list: result });
      return result;
    },
  };
});
