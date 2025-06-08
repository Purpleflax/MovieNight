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
  background-image: url('https://www.transparenttextures.com/patterns/subtle-dark-vertical.png');
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
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
    height: 3px;
    background: #d81f26;
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
  padding: 16px;
  position: relative;
  background: #1a1a1a;

  @media (min-width: 768px) {
    flex: 1;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    align-items: start;
    max-height: 500px;
  }
`;

const TitleSection = styled.div`
  grid-column: 1 / -1;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 8px;
  color: #fff;
  font-size: 1.6rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const Year = styled.div`
  color: #e6b91e;
  font-size: 0.95rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
`;

const Rating = styled.div`
  color: #e6b91e;
  font-size: 0.95rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;

  &::before {
    content: '★';
    display: inline-block;
    margin-right: 5px;
    font-size: 1rem;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 12px;
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  border-left: 2px solid #d81f26;

  strong {
    color: #e6b91e;
    margin-right: 6px;
    font-size: 0.95rem;
    font-weight: 600;
  }
`;

const Overview = styled.p`
  color: #ddd;
  line-height: 1.6;
  margin-top: 12px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  position: relative;
  font-size: 0.95rem;
`;

const StreamingServicesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const StreamingServiceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222;
  border-radius: 3px;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const StreamingLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 3px;
  object-fit: contain;
`;

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';


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
