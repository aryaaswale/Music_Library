# Music Verse - Frontend Developer Assignment

A modern music library application demonstrating **Micro Frontend Architecture**, **Role-Based Authentication**, and advanced **JavaScript array methods** (map, filter, reduce).

## 🎯 Project Overview

This application fulfills all requirements from the frontend developer assignment:

- ✅ **Micro Frontend Architecture** - Split into Main App (container) and Music Library (dynamic module)
- ✅ **Music Library UI** - Clean interface with filter, sort, and group functionality
- ✅ **Authentication & Role Management** - JWT-based with admin/user roles
- ✅ **JavaScript Built-in Methods** - Extensive use of map, filter, reduce
- ✅ **Beautiful Design** - Modern music streaming interface with dark theme

## 🚀 Live Demo

- **Main Application**: [Live Demo Link](https://lovable.dev/projects/33e1166c-886c-41e1-a9e2-8353153411f4)
- **Micro Frontend**: Integrated within the main app using lazy loading

## 🔑 Demo Credentials

### Admin User (Can Add/Delete Songs)
- **Email**: `admin@musicverse.com`
- **Password**: `admin123`

### Regular User (View/Filter Only)
- **Email**: `user@musicverse.com`
- **Password**: `user123`

## 🏃‍♂️ How to Run Locally

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd music-verse-frontend-fusion

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:8080
```

## 🏗️ Architecture Explanation

### Micro Frontend Implementation

The application is split into two logical parts:

1. **Main App (Container)**: 
   - `src/components/MainApp.tsx` - Acts as the container
   - Handles routing, authentication, and micro frontend loading
   - Uses React.lazy() for dynamic loading

2. **Music Library (Micro Frontend)**:
   - `src/components/music/MusicLibrary.tsx` - The micro frontend module
   - Loaded dynamically via React Suspense
   - Contains all music-related functionality

**Note**: In a production environment, the Music Library would be:
- Built as a separate application
- Deployed independently 
- Loaded via Webpack Module Federation or similar technology
- For this demo, it's simulated using React.lazy() within the same codebase

### Authentication & Role Management

- **JWT Implementation**: Simple in-memory approach using localStorage
- **Mock Authentication**: No backend required - credentials validated against hardcoded users
- **Role-Based UI**: Admin users see add/delete controls, regular users see view-only interface
- **Token Management**: Automatic token validation and expiration handling

## 🎵 Core Features

### Music Library UI
- **Clean Interface**: Modern card-based layout with hover effects
- **Search**: Real-time search across song title, artist, and album
- **Filtering**: Filter by genre with dropdown selection
- **Sorting**: Sort by title, artist, album, or year (ascending/descending)
- **Grouping**: Group songs by artist, album, genre, or view all

### JavaScript Built-in Methods Usage

The application extensively uses JavaScript's built-in array methods:

**Filter Method**:
```javascript
songs.filter(song => {
  const searchMatch = song.title.toLowerCase().includes(search.toLowerCase());
  const genreMatch = filters.genre === '' || song.genre === filters.genre;
  return searchMatch && genreMatch;
})
```

**Map Method**:
```javascript
songs.map(song => song.artist)
  .filter((artist, index, array) => array.indexOf(artist) === index)
```

**Reduce Method**:
```javascript
filteredSongs.reduce((groups, song) => {
  const key = song[groupBy];
  if (!groups[key]) groups[key] = [];
  groups[key].push(song);
  return groups;
}, {})
```

### Role-Based Features

**Admin Capabilities**:
- Add new songs to the library
- Delete existing songs
- Full access to all features

**User Capabilities**:
- View music library
- Search and filter songs
- Sort and group songs
- Read-only access

## 🎨 Design System

- **Theme**: Dark mode with vibrant music-themed colors
- **Colors**: Purple, blue, pink gradients for visual appeal
- **Components**: Custom shadcn/ui components with music variants
- **Animations**: Smooth transitions and hover effects
- **Typography**: Clean, modern font hierarchy

## 🛠️ Technologies Used

- **React 18** - Functional components with hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Context** - State management for auth and music data
- **React Query** - Server state management (ready for API integration)

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Header, etc.)
│   ├── music/          # Music Library micro frontend
│   └── ui/            # shadcn/ui components
├── contexts/          # React Context providers
├── types/             # TypeScript type definitions
├── hooks/             # Custom React hooks
└── pages/             # Page components
```

## 🚀 Deployment Strategy

For production deployment:

1. **Main App**: Deploy to Netlify/Vercel as primary application
2. **Music Library Micro Frontend**: Deploy as separate application
3. **Module Federation**: Configure Webpack Module Federation to load micro frontend dynamically
4. **Environment Variables**: Configure URLs for micro frontend endpoints

## 📈 Future Enhancements

- Real backend integration with Node.js/Express
- Actual Module Federation with separate deployments
- Database persistence (PostgreSQL/MongoDB)
- Real-time updates with WebSockets
- Audio playback functionality
- Playlist management
- User preferences and favorites

## 🏆 Assignment Compliance

This project fulfills all assignment requirements:

- ✅ **Music Library UI** with clean design
- ✅ **Filter, Sort, Group** functionality using map, filter, reduce
- ✅ **Micro Frontend Architecture** with container and module
- ✅ **Authentication** with in-memory JWT approach
- ✅ **Role Management** (admin/user) with appropriate UI controls
- ✅ **React** functional components with hooks
- ✅ **Modern styling** with Tailwind CSS
- ✅ **State management** using Context API
- ✅ **Deployment ready** for production

---

**Built for Frontend Developer Evaluation** 🎯
