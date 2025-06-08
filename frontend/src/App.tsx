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
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    background-color: #121212;
    background-image: linear-gradient(135deg, rgba(25, 25, 25, 0.95) 0%, rgba(15, 15, 15, 0.97) 100%);
    background-attachment: fixed;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    line-height: 1.6;
    font-weight: 400;
    position: relative;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    margin-top: 0;
  }

  * {
    box-sizing: border-box;
  }

  /* Improve focus styles for accessibility */
  :focus {
    outline: 2px solid #d81f26;
    outline-offset: 2px;
  }

  /* Improve scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(216, 31, 38, 0.4);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(216, 31, 38, 0.6);
  }
`;

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px;
  color: #fff;
  min-height: 100vh;
  position: relative;
  background-color: rgba(20, 20, 20, 0.8);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #d81f26;
  position: relative;
  background-color: rgba(25, 25, 25, 0.7);
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  padding: 20px 25px;
`;

const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 2.8rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  letter-spacing: 1px;
  position: relative;

  span {
    color: #d81f26;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 2fr;
  gap: 25px;
  margin-top: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieDetailsContainer = styled.div`
  margin-top: 25px;
  max-height: 75vh;
  overflow-y: auto;
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
          <Title>Movie <span>Night</span> Wheel</Title>
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
