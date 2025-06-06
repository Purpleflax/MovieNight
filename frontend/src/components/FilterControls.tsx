import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Genre } from '../types';

interface FilterControlsProps {
  genres: Genre[];
  selectedGenre: Genre | null;
  onGenreChange: (genre: Genre | null) => void;
  directorName: string;
  onDirectorChange: (name: string) => void;
  onSpin: () => void;
  isSpinning: boolean;
}

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(229, 9, 20, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(229, 9, 20, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(229, 9, 20, 0);
  }
`;

const Container = styled.div`
  background-color: #1a1a1a;
  background-image: url('https://www.transparenttextures.com/patterns/asfalt-dark.png');
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.4),
    0 0 10px rgba(229, 9, 20, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;

  &::before {
    content: '🎟️';
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 1.5rem;
  }
`;

const Title = styled.h2`
  color: #f5b50c;
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 1.8rem;
  font-family: 'Bebas Neue', cursive;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #e50914, transparent);
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 1.2rem;
  }

  &:nth-child(1)::before {
    content: '🎭';
    top: -2px;
    left: -25px;
  }

  &:nth-child(2)::before {
    content: '🎬';
    top: -2px;
    left: -25px;
  }
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  color: #f5b50c;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const Select = styled.select`
  padding: 12px 15px;
  border-radius: 8px;
  border: 2px solid #333;
  background-color: rgba(44, 44, 44, 0.8);
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e50914;
    box-shadow: 0 0 10px rgba(229, 9, 20, 0.3);
  }

  option {
    background-color: #1a1a1a;
    color: white;
    padding: 10px;
  }
`;

const Input = styled.input`
  padding: 12px 15px;
  border-radius: 8px;
  border: 2px solid #333;
  background-color: rgba(44, 44, 44, 0.8);
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e50914;
    box-shadow: 0 0 10px rgba(229, 9, 20, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button<{ isSpinning: boolean }>`
  grid-column: 1 / -1;
  padding: 18px;
  border-radius: 10px;
  border: none;
  background: ${props => props.isSpinning ? 
    '#555' : 
    'linear-gradient(45deg, #e50914, #ff3b30)'};
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  font-family: 'Bebas Neue', cursive;
  letter-spacing: 1px;
  cursor: ${props => props.isSpinning ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  margin-top: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: ${props => props.isSpinning ? 'none' : pulse} 2s infinite;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${props => props.isSpinning ? 
      '#555' : 
      'linear-gradient(45deg, #c4070f, #e52d20)'};
    transform: ${props => props.isSpinning ? 'none' : 'translateY(-3px)'};
  }

  &:active {
    transform: ${props => props.isSpinning ? 'none' : 'translateY(1px)'};
  }

  &:focus {
    outline: none;
  }

  &::before {
    content: '🎬';
    margin-right: 10px;
  }

  &::after {
    content: '🍿';
    margin-left: 10px;
  }
`;

const FilterControls: React.FC<FilterControlsProps> = ({
  genres,
  selectedGenre,
  onGenreChange,
  directorName,
  onDirectorChange,
  onSpin,
  isSpinning
}) => {
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = parseInt(e.target.value);
    if (genreId === -1) {
      onGenreChange(null);
    } else {
      const genre = genres.find(g => g.id === genreId) || null;
      onGenreChange(genre);
    }
  };

  const handleDirectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDirectorChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSpin();
  };

  return (
    <Container>
      <Title>Filter Options</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="genre">Genre</Label>
          <Select 
            id="genre" 
            value={selectedGenre?.id || -1}
            onChange={handleGenreChange}
            disabled={isSpinning}
          >
            <option value={-1}>Any Genre</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="director">Director</Label>
          <Input 
            id="director" 
            type="text" 
            placeholder="e.g. Christopher Nolan"
            value={directorName}
            onChange={handleDirectorChange}
            disabled={isSpinning}
          />
        </FormGroup>

        <Button type="submit" isSpinning={isSpinning}>
          {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
        </Button>
      </Form>
    </Container>
  );
};

export default FilterControls;
