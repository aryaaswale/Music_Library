import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { Song, MusicFilters, GroupedSongs } from '@/types/music';

interface MusicContextType {
  songs: Song[];
  filters: MusicFilters;
  filteredSongs: Song[];
  groupedSongs: GroupedSongs;
  addSong: (song: Omit<Song, 'id'>) => void;
  deleteSong: (id: string) => void;
  updateFilters: (filters: Partial<MusicFilters>) => void;
  getTotalSongs: () => number;
  getUniqueArtists: () => string[];
  getUniqueAlbums: () => string[];
  getUniqueGenres: () => string[];
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Mock music data with various genres and artists for demonstration
const INITIAL_SONGS: Song[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: '5:55',
    genre: 'Rock',
    year: 1975,
    coverUrl: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    duration: '6:30',
    genre: 'Rock',
    year: 1976,
    coverUrl: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    duration: '3:07',
    genre: 'Pop',
    year: 1971,
    coverUrl: '/placeholder.svg'
  },
  {
    id: '4',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    duration: '4:54',
    genre: 'Pop',
    year: 1983,
    coverUrl: '/placeholder.svg'
  },
  {
    id: '5',
    title: 'Like a Rolling Stone',
    artist: 'Bob Dylan',
    album: 'Highway 61 Revisited',
    duration: '6:13',
    genre: 'Folk Rock',
    year: 1965,
    coverUrl: '/placeholder.svg'
  },
  {
    id: '6',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    duration: '5:01',
    genre: 'Grunge',
    year: 1991,
    coverUrl: '/placeholder.svg'
  },
  {
    id: '7',
    title: 'What\'s Going On',
    artist: 'Marvin Gaye',
    album: 'What\'s Going On',
    duration: '3:53',
    genre: 'Soul',
    year: 1971,
    coverUrl: '/placeholder.svg'
  },
  {
    id: '8',
    title: 'Purple Haze',
    artist: 'Jimi Hendrix',
    album: 'Are You Experienced',
    duration: '2:51',
    genre: 'Rock',
    year: 1967,
    coverUrl: '/placeholder.svg'
  },
  {
    id: '9',
    title: 'Good Vibrations',
    artist: 'The Beach Boys',
    album: 'Pet Sounds',
    duration: '3:39',
    genre: 'Pop',
    year: 1966,
    coverUrl: '/placeholder.svg'
  },
  {
    id: '10',
    title: 'Lose Yourself',
    artist: 'Eminem',
    album: '8 Mile Soundtrack',
    duration: '5:26',
    genre: 'Hip Hop',
    year: 2002,
    coverUrl: '/placeholder.svg'
  }
];

const INITIAL_FILTERS: MusicFilters = {
  search: '',
  sortBy: 'title',
  sortOrder: 'asc',
  groupBy: 'none',
  genre: ''
};

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [filters, setFilters] = useState<MusicFilters>(INITIAL_FILTERS);

  const addSong = useCallback((newSong: Omit<Song, 'id'>) => {
    const song: Song = {
      ...newSong,
      id: Date.now().toString()
    };
    setSongs(prev => [...prev, song]);
  }, []);

  const deleteSong = useCallback((id: string) => {
    setSongs(prev => prev.filter(song => song.id !== id));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<MusicFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Filter and sort songs using JavaScript built-in methods (map, filter, reduce)
  const filteredSongs = useMemo(() => {
    return songs
      .filter(song => {
        // Search filter
        const searchMatch = filters.search === '' || 
          song.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          song.artist.toLowerCase().includes(filters.search.toLowerCase()) ||
          song.album.toLowerCase().includes(filters.search.toLowerCase());
        
        // Genre filter
        const genreMatch = filters.genre === '' || filters.genre === 'all' || song.genre === filters.genre;
        
        return searchMatch && genreMatch;
      })
      .sort((a, b) => {
        const direction = filters.sortOrder === 'asc' ? 1 : -1;
        
        switch (filters.sortBy) {
          case 'title':
            return a.title.localeCompare(b.title) * direction;
          case 'artist':
            return a.artist.localeCompare(b.artist) * direction;
          case 'album':
            return a.album.localeCompare(b.album) * direction;
          case 'year':
            return (a.year - b.year) * direction;
          default:
            return 0;
        }
      });
  }, [songs, filters]);

  // Group songs using reduce method
  const groupedSongs = useMemo((): GroupedSongs => {
    if (filters.groupBy === 'none') {
      return { 'All Songs': filteredSongs };
    }

    return filteredSongs.reduce((groups: GroupedSongs, song) => {
      let key: string;
      
      switch (filters.groupBy) {
        case 'artist':
          key = song.artist;
          break;
        case 'album':
          key = song.album;
          break;
        case 'genre':
          key = song.genre;
          break;
        default:
          key = 'All Songs';
      }
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(song);
      
      return groups;
    }, {});
  }, [filteredSongs, filters.groupBy]);

  // Utility functions using JavaScript built-in methods
  const getTotalSongs = useCallback(() => songs.length, [songs]);

  const getUniqueArtists = useCallback(() => {
    return songs
      .map(song => song.artist)
      .filter((artist, index, array) => array.indexOf(artist) === index)
      .sort();
  }, [songs]);

  const getUniqueAlbums = useCallback(() => {
    return songs
      .map(song => song.album)
      .filter((album, index, array) => array.indexOf(album) === index)
      .sort();
  }, [songs]);

  const getUniqueGenres = useCallback(() => {
    return songs
      .map(song => song.genre)
      .filter((genre, index, array) => array.indexOf(genre) === index)
      .sort();
  }, [songs]);

  return (
    <MusicContext.Provider value={{
      songs,
      filters,
      filteredSongs,
      groupedSongs,
      addSong,
      deleteSong,
      updateFilters,
      getTotalSongs,
      getUniqueArtists,
      getUniqueAlbums,
      getUniqueGenres
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};