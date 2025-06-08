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
    box-shadow: 0 0 0 0 rgba(216, 31, 38, 0.3);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(216, 31, 38, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(216, 31, 38, 0);
  }
`;

const Container = styled.div`
  background-color: #1a1a1a;
  background-image: url('https://www.transparenttextures.com/patterns/subtle-dark-vertical.png');
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: #d81f26;
    border-radius: 8px 8px 0 0;
  }
`;

const Title = styled.h2`
  color: #e6b91e;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: #d81f26;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
  color: #e6b91e;
  font-size: 1rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: rgba(40, 40, 40, 0.7);
  color: white;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #d81f26;
    box-shadow: 0 0 5px rgba(216, 31, 38, 0.3);
  }

  option {
    background-color: #222;
    color: white;
    padding: 8px;
  }
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: rgba(40, 40, 40, 0.7);
  color: white;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #d81f26;
    box-shadow: 0 0 5px rgba(216, 31, 38, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Button = styled.button<{ isSpinning: boolean }>`
  padding: 12px 16px;
  border-radius: 4px;
  border: none;
  background: ${props => props.isSpinning ? 
    '#555' : 
    '#d81f26'};
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.5px;
  cursor: ${props => props.isSpinning ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  animation: ${props => props.isSpinning ? 'none' : pulse} 3s infinite;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.isSpinning ? 
      '#555' : 
      '#c41a20'};
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(216, 31, 38, 0.3);
  }

  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transition: all 0.2s ease;
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
