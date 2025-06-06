import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Movie } from '../types';

interface MovieDetailsProps {
  movie: Movie;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Container = styled.div`
  background-color: #1a1a1a;
  background-image: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(229, 9, 20, 0.3);
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.5s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  max-width: 100%;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    max-height: 500px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #e50914, #f5b50c, #e50914);
    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite linear;
  }
`;

const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 120%; /* Slightly shorter aspect ratio */
  overflow: hidden;

  @media (min-width: 768px) {
    width: 300px;
    min-width: 300px;
    height: 100%;
    padding-top: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to top, rgba(26, 26, 26, 1), transparent);
    z-index: 1;
  }
`;

const Poster = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  @media (min-width: 768px) {
    position: static;
    display: block;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const NoPoster = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2c2c2c;
  color: #aaa;
  font-size: 1.2rem;
  text-align: center;
  padding: 20px;

  &::before {
    content: '';
    display: block;
    width: 60px;
    height: 40px;
    margin: 0 auto 15px;
    background: linear-gradient(135deg, #2c2c2c, #444);
    border: 2px solid #aaa;
    border-radius: 5px;
    position: relative;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    border: 2px solid #aaa;
    border-radius: 50%;
  }
`;

const Details = styled.div`
  padding: 20px;
  position: relative;
  background: linear-gradient(to bottom, #1a1a1a, #0a0a0a);

  @media (min-width: 768px) {
    flex: 1;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    align-items: start;
    max-height: 500px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    width: 15px;
    height: 15px;
    background: linear-gradient(135deg, #e50914, #f5b50c);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(229, 9, 20, 0.5);
  }

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

const TitleSection = styled.div`
  grid-column: 1 / -1;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
  color: #fff;
  font-size: 1.8rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
`;

const Year = styled.div`
  color: #f5b50c;
  font-size: 1.1rem;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const Rating = styled.div`
  color: #f5b50c;
  font-size: 1.1rem;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;

  &::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 8px;
    background: linear-gradient(135deg, #f5b50c, #ffd700);
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  }
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border-left: 3px solid #e50914;

  strong {
    color: #f5b50c;
    margin-right: 8px;
    font-size: 1.1rem;
  }
`;

const Overview = styled.p`
  color: #ddd;
  line-height: 1.8;
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: 0;
    left: 5px;
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.1);
  }

  &::after {
    content: '"';
    position: absolute;
    bottom: -10px;
    right: 5px;
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.1);
  }
`;

const StreamingServicesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const StreamingServiceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2a2a2a;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const StreamingLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  object-fit: contain;
`;

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  // Debug logging
  console.log('MovieDetails - movie:', movie);
  console.log('MovieDetails - poster_path:', movie.poster_path);
  console.log('MovieDetails - vote_average:', movie.vote_average);
  console.log('MovieDetails - streamingServices:', movie.streamingServices);

  return (
    <Container>
      <PosterContainer>
        {movie.poster_path ? (
          <Poster 
            src={`${imageBaseUrl}${movie.poster_path}`} 
            alt={`${movie.title} poster`} 
          />
        ) : (
          <NoPoster>No poster available</NoPoster>
        )}
      </PosterContainer>

      <Details>
        <TitleSection>
          <Title>{movie.title}</Title>
          <MetaInfo>
            <Year>{movie.year}</Year>
            <Rating>{movie.vote_average != null ? movie.vote_average.toFixed(1) : 'N/A'}</Rating>
          </MetaInfo>
        </TitleSection>

        <InfoItem>
          <strong>Genre:</strong> {movie.primaryGenre}
        </InfoItem>

        {movie.director && (
          <InfoItem>
            <strong>Director:</strong> {movie.director}
          </InfoItem>
        )}

        {movie.streamingServices && movie.streamingServices.length > 0 && (
          <InfoItem>
            <strong>Available on:</strong>
            <StreamingServicesList>
              {movie.streamingServices.map(service => (
                <StreamingServiceItem key={service.provider_id}>
                  {service.logo_path ? (
                    <StreamingLogo 
                      src={`https://image.tmdb.org/t/p/original${service.logo_path}`} 
                      alt={service.provider_name} 
                      title={service.provider_name}
                    />
                  ) : (
                    service.provider_name
                  )}
                </StreamingServiceItem>
              ))}
            </StreamingServicesList>
          </InfoItem>
        )}

        {movie.overview && (
          <InfoItem style={{ gridColumn: '1 / -1' }}>
            <strong>Overview:</strong>
            <Overview>{movie.overview}</Overview>
          </InfoItem>
        )}
      </Details>
    </Container>
  );
};

export default MovieDetails;
