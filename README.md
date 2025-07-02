# Music Verse - Frontend Developer Assignment

A modern music library application demonstrating **Micro Frontend Architecture**, **Role-Based Authentication**, and advanced **JavaScript array methods** (map, filter, reduce).

##  Project Overview
This application fulfills all requirements from the frontend developer assignment:

-  **Micro Frontend Architecture** - Split into Main App (container) and Music Library (dynamic module)
-  **Music Library UI** - Clean interface with filter, sort, and group functionality
-  **Authentication & Role Management** - JWT-based with admin/user roles
-  **JavaScript Built-in Methods** - Extensive use of map, filter, reduce

## Live Demo

- **Main Application**: [Live Demo Link](https://aryaaswalemusicverse.netlify.app/)
- **Micro Frontend**: Integrated within the main app using lazy loading


## How to Run Locally

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd Music_Library

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:8080
```

How It Was Deployed:

The project is deployed using Netlify:
   Connected GitHub repo to Netlify.

Set the following build settings:
   Build Command: npm run build
   Publish Directory: dist
   Netlify auto-builds and hosts the app.

🔗 Live Site: https://aryaaswalemusicverse.netlify.app/

Demo Credentials

Admin User (Can Add/Delete Songs)
- **Email: `admin@musicverse.com`
- **Password**: `admin123`

Regular User (View/Filter Only)
- Email: `user@musicverse.com`
- **Password**: `user123`

Architecture Explanation

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


- Built as a separate application
- Deployed independently 
- Loaded via Webpack Module Federation or similar technology
- For this demo, it's simulated using React.lazy() within the same codebase

### Authentication & Role Management

- **JWT Implementation**: Simple in-memory approach using localStorage
- **Mock Authentication**: No backend required - credentials validated against hardcoded users
- **Role-Based UI**: Admin users see add/delete controls, regular users see view-only interface
- **Token Management**: Automatic token validation and expiration handling

## Project Structure

```
src/
─ components/
─ auth/             Authentication components
─ layout/           Layout components (Header, etc.)
─ music/            Music Library micro frontend
 	─ ui/              shadcn/ui components
─ contexts/            React Context providers
─ types/               TypeScript type definitions
─ hooks/               Custom React hooks
─ pages/               Page components
```

    Role-Based Features


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

