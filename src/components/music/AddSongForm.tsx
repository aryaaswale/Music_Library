import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMusic } from '@/contexts/MusicContext';
import { useToast } from '@/hooks/use-toast';

interface AddSongFormProps {
  onCancel?: () => void;
}

const AddSongForm: React.FC<AddSongFormProps> = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    duration: '',
    genre: '',
    year: new Date().getFullYear()
  });

  const { addSong, getUniqueGenres } = useMusic();
  const { toast } = useToast();

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.artist || !formData.album || !formData.duration || !formData.genre) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addSong(formData);
    
    toast({
      title: "Song Added Successfully!",
      description: `"${formData.title}" by ${formData.artist} has been added to the library.`,
    });

    // Reset form
    setFormData({
      title: '',
      artist: '',
      album: '',
      duration: '',
      genre: '',
      year: new Date().getFullYear()
    });

    onCancel?.();
  };

  const genres = ['Rock', 'Pop', 'Hip Hop', 'Jazz', 'Classical', 'Electronic', 'Folk', 'R&B', 'Country', 'Blues', 'Reggae', 'Metal', 'Punk', 'Soul', 'Funk', 'Grunge', 'Folk Rock', ...getUniqueGenres()];
  const uniqueGenres = [...new Set(genres)].sort();

  return (
    <Card className="music-card">
      <CardHeader>
        <CardTitle className="text-xl">Add New Song</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Song Title *</Label>
              <Input
                id="title"
                placeholder="Enter song title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist">Artist *</Label>
              <Input
                id="artist"
                placeholder="Enter artist name"
                value={formData.artist}
                onChange={(e) => handleChange('artist', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="album">Album *</Label>
              <Input
                id="album"
                placeholder="Enter album name"
                value={formData.album}
                onChange={(e) => handleChange('album', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                placeholder="e.g., 3:45"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre *</Label>
              <Select
                value={formData.genre}
                onValueChange={(value) => handleChange('genre', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                min="1900"
                max="2030"
                value={formData.year}
                onChange={(e) => handleChange('year', parseInt(e.target.value) || new Date().getFullYear())}
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="submit" variant="music" className="flex-1">
              Add Song
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSongForm;