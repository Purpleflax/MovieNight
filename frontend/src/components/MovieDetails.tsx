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
  padding-top: 150%; /* 2:3 aspect ratio for movie posters */
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
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
    content: '🎬';
    font-size: 3rem;
    margin-bottom: 15px;
  }
`;

const Details = styled.div`
  padding: 25px;
  position: relative;
  background: linear-gradient(to bottom, #1a1a1a, #0a0a0a);

  &::before {
    content: '🍿';
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 1.5rem;
  }
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
  color: #fff;
  font-size: 2rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Year = styled.div`
  color: #f5b50c;
  font-size: 1.3rem;
  margin-bottom: 15px;
  font-weight: bold;
  display: inline-block;
  padding: 3px 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const Rating = styled.div`
  color: #f5b50c;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  &::before {
    content: '⭐';
    margin-right: 8px;
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

  return (
    <Container>
      <PosterContainer>
        {movie.posterPath ? (
          <Poster 
            src={`${imageBaseUrl}${movie.posterPath}`} 
            alt={`${movie.title} poster`} 
          />
        ) : (
          <NoPoster>No poster available</NoPoster>
        )}
      </PosterContainer>

      <Details>
        <Title>{movie.title}</Title>
        <Year>{movie.year}</Year>
        <Rating>{movie.voteAverage !== undefined ? movie.voteAverage.toFixed(1) : 'N/A'}</Rating>

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
                <StreamingServiceItem key={service.providerId}>
                  {service.logoPath ? (
                    <StreamingLogo 
                      src={`https://image.tmdb.org/t/p/original${service.logoPath}`} 
                      alt={service.providerName} 
                      title={service.providerName}
                    />
                  ) : (
                    service.providerName
                  )}
                </StreamingServiceItem>
              ))}
            </StreamingServicesList>
          </InfoItem>
        )}

        {movie.overview && (
          <>
            <InfoItem>
              <strong>Overview:</strong>
            </InfoItem>
            <Overview>{movie.overview}</Overview>
          </>
        )}
      </Details>
    </Container>
  );
};

export default MovieDetails;
