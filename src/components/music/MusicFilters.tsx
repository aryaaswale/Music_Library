import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMusic } from '@/contexts/MusicContext';
import { MusicFilters as FilterType } from '@/types/music';

const MusicFilters: React.FC = () => {
  const { filters, updateFilters, getUniqueGenres } = useMusic();

  const handleFilterChange = (key: keyof FilterType, value: string) => {
    updateFilters({ [key]: value });
  };

  const toggleSortOrder = () => {
    updateFilters({ 
      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
    });
  };

  const clearFilters = () => {
    updateFilters({
      search: '',
      sortBy: 'title',
      sortOrder: 'asc',
      groupBy: 'none',
      genre: ''
    });
  };

  return (
    <Card className="music-card p-4 mb-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters & Search</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
          >
            Clear All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <Input
              placeholder="Search songs, artists, albums..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange('sortBy', value as FilterType['sortBy'])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="album">Album</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Group By */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Group By</label>
            <Select
              value={filters.groupBy}
              onValueChange={(value) => handleFilterChange('groupBy', value as FilterType['groupBy'])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Grouping</SelectItem>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="album">Album</SelectItem>
                <SelectItem value="genre">Genre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Genre Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Genre</label>
            <Select
              value={filters.genre}
              onValueChange={(value) => handleFilterChange('genre', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {getUniqueGenres().map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MusicFilters;