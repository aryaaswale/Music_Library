import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useMusic } from '@/contexts/MusicContext';
import MusicFilters from './MusicFilters';
import SongCard from './SongCard';
import AddSongForm from './AddSongForm';

// This component represents the "Music Library" micro frontend
// In a real micro frontend setup, this would be a separate app loaded via Module Federation
const MusicLibrary: React.FC = () => {
  const { isAdmin } = useAuth();
  const { groupedSongs, filteredSongs, filters } = useMusic();
  const [showAddForm, setShowAddForm] = useState(false);

  // Statistics using JavaScript built-in methods as required
  const stats = useMemo(() => {
    const totalSongs = filteredSongs.length;
    const uniqueArtists = filteredSongs
      .map(song => song.artist)
      .filter((artist, index, array) => array.indexOf(artist) === index).length;
    
    const genreDistribution = filteredSongs
      .reduce((acc, song) => {
        acc[song.genre] = (acc[song.genre] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const mostPopularGenre = Object.entries(genreDistribution)
      .reduce((a, b) => a[1] > b[1] ? a : b, ['None', 0])[0];

    return {
      totalSongs,
      uniqueArtists,
      mostPopularGenre,
      genreDistribution
    };
  }, [filteredSongs]);

  const toggleAddForm = () => setShowAddForm(!showAddForm);

  return (
    <div className="space-y-6">
      {/* Music Library Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Music Library</h2>
          <p className="text-muted-foreground">
            {filters.groupBy === 'none' ? 'All Songs' : `Grouped by ${filters.groupBy}`}
          </p>
        </div>
        
        {isAdmin && (
          <Button
            variant="admin"
            onClick={toggleAddForm}
          >
            {showAddForm ? 'Cancel' : 'Add Song'}
          </Button>
        )}
      </div>

      {/* Statistics Card */}
      <Card className="music-card">
        <CardHeader>
          <CardTitle>Library Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-music-purple">{stats.totalSongs}</div>
              <div className="text-sm text-muted-foreground">Total Songs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-music-blue">{stats.uniqueArtists}</div>
              <div className="text-sm text-muted-foreground">Artists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-music-pink">{Object.keys(stats.genreDistribution).length}</div>
              <div className="text-sm text-muted-foreground">Genres</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-music-green">{stats.mostPopularGenre}</div>
              <div className="text-sm text-muted-foreground">Popular Genre</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <MusicFilters />

      {/* Add Song Form (Admin Only) */}
      {showAddForm && isAdmin && (
        <AddSongForm onCancel={() => setShowAddForm(false)} />
      )}

      {/* Songs Display */}
      <div className="space-y-6">
        {Object.entries(groupedSongs).map(([groupName, songs]) => (
          <div key={groupName}>
            {filters.groupBy !== 'none' && (
              <div className="flex items-center space-x-4 mb-4">
                <h3 className="text-xl font-semibold">{groupName}</h3>
                <span className="text-sm text-muted-foreground">
                  {songs.length} song{songs.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {songs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        ))}

        {filteredSongs.length === 0 && (
          <Card className="music-card">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold mb-2">No Songs Found</h3>
              <p className="text-muted-foreground mb-4">
                {filters.search || filters.genre ? 
                  'Try adjusting your filters to see more results.' :
                  'The music library is empty. Add some songs to get started!'
                }
              </p>
              {isAdmin && (
                <Button variant="music" onClick={() => setShowAddForm(true)}>
                  Add First Song
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MusicLibrary;