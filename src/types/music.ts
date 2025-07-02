export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  genre: string;
  year: number;
  coverUrl?: string;
}

export interface MusicFilters {
  search: string;
  sortBy: 'title' | 'artist' | 'album' | 'year';
  sortOrder: 'asc' | 'desc';
  groupBy: 'none' | 'artist' | 'album' | 'genre';
  genre: string;
}

export interface GroupedSongs {
  [key: string]: Song[];
}