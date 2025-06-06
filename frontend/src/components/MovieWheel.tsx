import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Movie } from '../types';

interface MovieWheelProps {
  isSpinning: boolean;
  selectedMovie: Movie | null;
  error: string | null;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const spinFast = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  5% {
    transform: rotate(18deg) scale(1.005);
  }
  10% {
    transform: rotate(36deg) scale(1.01);
  }
  15% {
    transform: rotate(54deg) scale(1.015);
  }
  20% {
    transform: rotate(72deg) scale(1.02);
  }
  25% {
    transform: rotate(90deg) scale(1.025);
  }
  30% {
    transform: rotate(108deg) scale(1.03);
  }
  35% {
    transform: rotate(126deg) scale(1.035);
  }
  40% {
    transform: rotate(144deg) scale(1.04);
  }
  45% {
    transform: rotate(162deg) scale(1.045);
  }
  50% {
    transform: rotate(180deg) scale(1.05);
  }
  55% {
    transform: rotate(198deg) scale(1.045);
  }
  60% {
    transform: rotate(216deg) scale(1.04);
  }
  65% {
    transform: rotate(234deg) scale(1.035);
  }
  70% {
    transform: rotate(252deg) scale(1.03);
  }
  75% {
    transform: rotate(270deg) scale(1.025);
  }
  80% {
    transform: rotate(288deg) scale(1.02);
  }
  85% {
    transform: rotate(306deg) scale(1.015);
  }
  90% {
    transform: rotate(324deg) scale(1.01);
  }
  95% {
    transform: rotate(342deg) scale(1.005);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 30px rgba(229, 9, 20, 0.5), 0 0 60px rgba(0, 0, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 50px rgba(229, 9, 20, 0.8), 0 0 80px rgba(245, 181, 12, 0.5);
  }
  100% {
    box-shadow: 0 0 30px rgba(229, 9, 20, 0.5), 0 0 60px rgba(0, 0, 0, 0.3);
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

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: #1a1a1a;
  background-image: url('https://www.transparenttextures.com/patterns/movie-film.png');
  border-radius: 20px;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.6),
    0 0 15px rgba(229, 9, 20, 0.3);
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(229, 9, 20, 0.3);
  z-index: 10;
  height: auto;
  margin-bottom: 30px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #e50914, #f5b50c, #e50914);
    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite linear;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #e50914, #f5b50c, #e50914);
    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite linear;
  }
`;

const WheelContainer = styled.div`
  position: relative;
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 5px;
    background: linear-gradient(90deg, transparent, #e50914, transparent);
    border-radius: 5px;
    z-index: 10;
  }
`;

const Wheel = styled.div<{ isSpinning: boolean }>`
  position: relative;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: conic-gradient(
    #e50914 0deg 45deg,
    #f5b50c 45deg 90deg,
    #2196f3 90deg 135deg,
    #4caf50 135deg 180deg,
    #9c27b0 180deg 225deg,
    #ff5722 225deg 270deg,
    #795548 270deg 315deg,
    #607d8b 315deg 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  animation: 
    ${props => props.isSpinning ? spinFast : spin} 
    ${props => props.isSpinning ? '1.5s' : '15s'} 
    ${props => props.isSpinning ? 'cubic-bezier(0.25, 0.1, 0.25, 1) infinite' : 'ease-in-out infinite'}, 
    ${props => props.isSpinning ? glow : 'none'} 3s ease-in-out infinite;
  box-shadow: 
    0 0 30px rgba(229, 9, 20, 0.5),
    0 0 60px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(0, 0, 0, 0.5);
  border: 5px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  transform-origin: center center;

  &::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: #e50914;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    filter: drop-shadow(0 0 10px rgba(229, 9, 20, 0.8));
    z-index: 5;
  }
`;

const InnerCircle = styled.div`
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, #1e1e1e, #0a0a0a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  box-shadow: 
    inset 0 0 30px rgba(0, 0, 0, 0.9),
    0 0 15px rgba(255, 255, 255, 0.15);
  font-family: 'Roboto', sans-serif;
  font-size: 1.6rem;
  letter-spacing: 1px;
  position: relative;
  border: 3px solid rgba(229, 9, 20, 0.5);
  text-transform: uppercase;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(229, 9, 20, 0.7);

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    width: 30px;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(229, 9, 20, 0.7), transparent);
    border-radius: 3px;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
  }
`;

const Message = styled.div`
  margin-top: 35px;
  text-align: center;
  font-size: 1.5rem;
  color: #f5b50c;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  text-shadow: 0 0 10px rgba(245, 181, 12, 0.7);
  padding: 15px 25px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  border: 2px solid rgba(245, 181, 12, 0.4);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 90%;
  letter-spacing: 0.5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ErrorMessage = styled.div`
  margin-top: 35px;
  text-align: center;
  font-size: 1.4rem;
  color: #e50914;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  text-shadow: 0 0 10px rgba(229, 9, 20, 0.7);
  padding: 15px 25px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  border: 2px solid rgba(229, 9, 20, 0.6);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 90%;
  letter-spacing: 0.5px;
`;

const MovieWheel: React.FC<MovieWheelProps> = ({ isSpinning, selectedMovie, error }) => {
  return (
    <Container>
      <WheelContainer>
        <Wheel isSpinning={isSpinning}>
          <InnerCircle>
            {isSpinning ? 'Spinning...' : 'Spin Me!'}
          </InnerCircle>
        </Wheel>
      </WheelContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!isSpinning && selectedMovie && !error && (
        <Message>
          Selected: {selectedMovie.title}
        </Message>
      )}

      {!isSpinning && !selectedMovie && !error && (
        <Message>
          Click "Spin" to find a random movie!
        </Message>
      )}
    </Container>
  );
};

export default MovieWheel;
