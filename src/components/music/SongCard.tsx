import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Song } from '@/types/music';
import { useAuth } from '@/contexts/AuthContext';
import { useMusic } from '@/contexts/MusicContext';
import { useToast } from '@/hooks/use-toast';

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { isAdmin } = useAuth();
  const { deleteSong } = useMusic();
  const { toast } = useToast();

  const handleDelete = () => {
    deleteSong(song.id);
    toast({
      title: "Song Deleted",
      description: `"${song.title}" has been removed from the library.`,
    });
  };

  return (
    <Card className="music-card hover:scale-105 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          {/* Album Cover */}
          <div className="w-16 h-16 bg-gradient-to-br from-music-purple/20 to-music-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <div className="w-8 h-8 bg-music-purple/30 rounded-full" />
          </div>
          
          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{song.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
            <p className="text-xs text-muted-foreground truncate">{song.album}</p>
            
            <div className="flex items-center space-x-2 mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-music-purple/20 text-music-purple">
                {song.genre}
              </span>
              <span className="text-xs text-muted-foreground">{song.year}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{song.duration}</span>
            </div>
          </div>
          
          {/* Admin Actions */}
          {isAdmin && (
            <div className="flex flex-col space-y-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="h-8 px-3"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SongCard;