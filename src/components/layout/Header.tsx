import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useMusic } from '@/contexts/MusicContext';

const Header: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getTotalSongs, getUniqueArtists } = useMusic();

  return (
    <header className="glass-effect border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            Music Verse
          </h1>
          <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{getTotalSongs()} Songs</span>
            <span>•</span>
            <span>{getUniqueArtists().length} Artists</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user?.role} {isAdmin && '(Can Add/Delete)'}
              </p>
            </div>
            <div className={`w-3 h-3 rounded-full ${isAdmin ? 'bg-music-orange' : 'bg-music-blue'}`} />
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;