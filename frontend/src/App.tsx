import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import axios from 'axios';
import MovieWheel from './components/MovieWheel';
import FilterControls from './components/FilterControls';
import MovieDetails from './components/MovieDetails';
import { Movie, Genre } from './types';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(-50%);
  }
  40% {
    transform: translateY(-60%);
  }
  60% {
    transform: translateY(-55%);
  }
`;

// Import Google Fonts
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    background-color: #0a0a0a;
    background-image: 
      linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%),
      url('https://www.transparenttextures.com/patterns/dark-leather.png');
    background-attachment: fixed;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    font-weight: 400;
    position: relative;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(to right, rgba(229, 9, 20, 0.03) 0%, transparent 100%),
      linear-gradient(to bottom, rgba(245, 181, 12, 0.03) 0%, transparent 100%);
    pointer-events: none;
    z-index: -1;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
  }

  * {
    box-sizing: border-box;
  }
`;

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  color: #fff;
  min-height: 100vh;
  position: relative;
  background-color: rgba(15, 15, 15, 0.7);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-image: url('https://www.transparenttextures.com/patterns/film-grain.png');
    opacity: 0.05;
    z-index: -1;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to top, rgba(10, 10, 10, 0.3), transparent);
    z-index: -1;
    pointer-events: none;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  border-bottom: 3px solid #e50914;
  position: relative;
  background: linear-gradient(to right, rgba(26, 26, 26, 0.8), rgba(10, 10, 10, 0.8));
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 25px 30px;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
    height: 100%;
    background: linear-gradient(to left, rgba(229, 9, 20, 0.1), transparent);
    border-radius: 0 10px 10px 0;
  }
`;

const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: #e50914;
  margin: 0;
  text-shadow: 3px 3px 8px rgba(0,0,0,0.7);
  letter-spacing: 2px;
  position: relative;
  text-transform: uppercase;
  background: linear-gradient(to right, #e50914, #f5b50c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &::before {
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 20px;
    background: linear-gradient(135deg, #e50914, #f5b50c);
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 70%, 0% 100%);
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
    vertical-align: middle;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle at center, rgba(229, 9, 20, 0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
  }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 1fr) 2fr;
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieDetailsContainer = styled.div`
  margin-top: 30px;
  max-height: 80vh;
  overflow-y: auto;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(229, 9, 20, 0.5);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(229, 9, 20, 0.7);
  }
`;

const App: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [directorName, setDirectorName] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch genres when component mounts
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get<Genre[]>('/api/movies/genres');
        setGenres(response.data);
      } catch (err) {
        setError('Failed to load genres. Please try again later.');
        console.error('Error fetching genres:', err);
      }
    };

    fetchGenres();
  }, []);

  const handleSpin = async () => {
    setIsSpinning(true);
    setSelectedMovie(null);
    setError(null);

    try {
      // Build query parameters
      const params: Record<string, string> = {};
      if (selectedGenre) {
        params.genreId = selectedGenre.id.toString();
      }
      if (directorName.trim()) {
        params.director = directorName.trim();
      }

      // Simulate spinning for at least 2 seconds for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await axios.get<Movie>('/api/movies/random', { params });
      console.log('App - response.data:', response.data);
      console.log('App - poster_path:', response.data.poster_path);
      console.log('App - vote_average:', response.data.vote_average);
      console.log('App - streamingServices:', response.data.streamingServices);
      setSelectedMovie(response.data);
    } catch (err) {
      setError('No movies found with the selected criteria. Try different filters.');
      console.error('Error fetching random movie:', err);
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Title>Movie Night Wheel</Title>
        </Header>

        <MainContent>
          <ContentLayout>
            <Sidebar>
              <FilterControls 
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                directorName={directorName}
                onDirectorChange={setDirectorName}
                onSpin={handleSpin}
                isSpinning={isSpinning}
              />
            </Sidebar>

            <div>
              <MovieWheel 
                isSpinning={isSpinning} 
                selectedMovie={selectedMovie}
                error={error}
              />

              {selectedMovie && (
                <MovieDetailsContainer>
                  <MovieDetails movie={selectedMovie} />
                </MovieDetailsContainer>
              )}
            </div>
          </ContentLayout>
        </MainContent>
      </AppContainer>
    </>
  );
};

export default App;
