import { create } from "zustand";
import type { Album } from "@/interface";
import { getAlbum } from "@/request";

interface AlbumState {
  list: Album[];
  refreshAlbum: () => Promise<void>;
}

export const useAlbumStore = create<AlbumState>((set) => {
  const fetchAlbum = async () => {
    const result = await getAlbum<Album[]>();
    set({ list: result });
  };

  if (window.__LOGIN__) {
    window.__USER_INFO__.then(fetchAlbum);
  }

  return {
    list: [],
    refreshAlbum: fetchAlbum,
  };
});
