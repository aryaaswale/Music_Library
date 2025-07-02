import React, { Suspense } from 'react';
import Header from './layout/Header';
import { Card } from './ui/card';

// Lazy load the Music Library to simulate Module Federation
// In a real micro frontend setup, this would be loaded from a separate deployment
const MusicLibrary = React.lazy(() => import('./music/MusicLibrary'));

const MainApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-6">
        {/* Main App Container - Acts as the container for micro frontends */}
        <div className="space-y-6">
          {/* Micro Frontend Loading Indicator */}
          

          {/* Micro Frontend Container */}
          <Suspense 
            fallback={
              <Card className="music-card p-8">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-8 h-8 border-4 border-music-purple border-t-transparent rounded-full animate-spin" />
                  <div className="text-lg">Loading Music Library Module...</div>
                </div>
              </Card>
            }
          >
            <MusicLibrary />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default MainApp;