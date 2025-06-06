# Movie Wheel Frontend

This is the frontend for the Movie Wheel application, built with React and TypeScript.

## Features

- Spinning wheel for random movie selection
- Filter movies by genre and director
- Display movie details including poster, title, year, rating, and overview
- Integration with TMDB API via the backend

## Project Structure

- `src/components/`: React components
  - `MovieWheel.tsx`: The spinning wheel component
  - `FilterControls.tsx`: Controls for filtering by genre and director
  - `MovieDetails.tsx`: Component for displaying movie details
- `src/types.ts`: TypeScript interfaces for Movie and Genre
- `public/`: Static assets and HTML entry point

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   The frontend development server will start on http://localhost:3000

3. Build for production:
   ```bash
   npm run build
   ```
   This will build the frontend and copy the output to `../src/main/resources/static/`

## API Integration

The frontend communicates with the backend API at `/api/movies/*`. The proxy is configured in `package.json` to forward requests to the backend during development.

## Styling

The application uses styled-components for styling. The main theme colors are:
- Background: #141414 (dark gray)
- Primary: #e50914 (red)
- Secondary: #f5b50c (gold)
- Text: #fff (white)