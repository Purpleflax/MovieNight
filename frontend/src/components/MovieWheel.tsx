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
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(720deg);
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 15px rgba(229, 9, 20, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 0 25px rgba(229, 9, 20, 0.5), 0 0 40px rgba(245, 181, 12, 0.3);
  }
  100% {
    box-shadow: 0 0 15px rgba(229, 9, 20, 0.3), 0 0 30px rgba(0, 0, 0, 0.2);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
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
  padding: 25px;
  background-color: #1a1a1a;
  background-image: url('https://www.transparenttextures.com/patterns/subtle-dark-vertical.png');
  border-radius: 12px;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.4),
    0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
  height: auto;
  margin-bottom: 25px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #d81f26, #e6b91e, #d81f26);
    background-size: 200% 100%;
    animation: ${shimmer} 5s infinite linear;
  }
`;

const WheelContainer = styled.div`
  position: relative;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wheel = styled.div<{ isSpinning: boolean }>`
  position: relative;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: conic-gradient(
    #d81f26 0deg 45deg,
    #e6b91e 45deg 90deg,
    #1976d2 90deg 135deg,
    #388e3c 135deg 180deg,
    #7b1fa2 180deg 225deg,
    #e64a19 225deg 270deg,
    #5d4037 270deg 315deg,
    #455a64 315deg 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  animation: 
    ${props => props.isSpinning ? spinFast : 'none'} 
    ${props => props.isSpinning ? '2s' : '0s'} 
    ${props => props.isSpinning ? 'cubic-bezier(0.25, 0.1, 0.25, 1)' : 'ease-in-out'} 
    ${props => props.isSpinning ? 'infinite' : 'none'}, 
    ${props => props.isSpinning ? glow : 'none'} 3s ease-in-out infinite;
  box-shadow: 
    0 0 20px rgba(0, 0, 0, 0.3),
    inset 0 0 10px rgba(0, 0, 0, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  transform-origin: center center;

  &:hover {
    transform: ${props => props.isSpinning ? 'none' : 'rotate(5deg)'};
  }

  &::before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: #d81f26;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.3));
    z-index: 5;
  }
`;

const InnerCircle = styled.div`
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, #2a2a2a, #1a1a1a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  text-align: center;
  z-index: 1;
  box-shadow: 
    inset 0 0 20px rgba(0, 0, 0, 0.7),
    0 0 10px rgba(255, 255, 255, 0.1);
  font-family: 'Roboto', sans-serif;
  font-size: 1.4rem;
  letter-spacing: 0.5px;
  position: relative;
  border: 2px solid rgba(229, 9, 20, 0.3);
  text-transform: uppercase;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  padding: 10px;

  &:hover {
    border-color: rgba(229, 9, 20, 0.5);
  }
`;

const Message = styled.div`
  margin-top: 25px;
  text-align: center;
  font-size: 1.2rem;
  color: #e6b91e;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  padding: 12px 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(230, 185, 30, 0.3);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    border-color: rgba(230, 185, 30, 0.4);
  }
`;

const ErrorMessage = styled.div`
  margin-top: 25px;
  text-align: center;
  font-size: 1.2rem;
  color: #d81f26;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  padding: 12px 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(216, 31, 38, 0.3);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
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
