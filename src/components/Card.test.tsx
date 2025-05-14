
import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard, CharacterProps } from './Card';
import '@testing-library/jest-dom';

// Mock character data for testing
const mockCharacter: CharacterProps = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1"
  },
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/3"
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: ["https://rickandmortyapi.com/api/episode/1", "https://rickandmortyapi.com/api/episode/2"],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z"
};

describe('CharacterCard Component', () => {
  test('renders character information correctly in mobile view', () => {
    render(<CharacterCard character={mockCharacter} isMobile={true} />);
    
    // Check if character name is displayed
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    
    // Check if species is displayed
    expect(screen.getByText('Human')).toBeInTheDocument();
    
    // Check if location information is displayed
    expect(screen.getByText('Last known location:')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    
    // Check if first seen information is displayed
    expect(screen.getByText('First seen in:')).toBeInTheDocument();
    expect(screen.getByText('Never Ricking Morty')).toBeInTheDocument();
    
    // Check if status badge is displayed
    expect(screen.getByText('Vivo')).toBeInTheDocument();
  });

  test('renders character information correctly in desktop view', () => {
    render(<CharacterCard character={mockCharacter} isMobile={false} />);
    
    // Check if character name is displayed
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    
    // Check if species is displayed
    expect(screen.getByText('Human')).toBeInTheDocument();
    
    // Check if location information is displayed
    expect(screen.getByText('Last known location:')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    
    // Check if first seen information is displayed
    expect(screen.getByText('First seen in:')).toBeInTheDocument();
    expect(screen.getByText('Never Ricking Morty')).toBeInTheDocument();
    
    // Check if status badge is displayed
    expect(screen.getByText('Vivo')).toBeInTheDocument();
  });

  test('handles click events correctly', () => {
    const mockOnClick = jest.fn();
    render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    
    // Click on the card
    fireEvent.click(screen.getByText('Rick Sanchez'));
    
    // Check if onClick handler was called with the character data
    expect(mockOnClick).toHaveBeenCalledWith(mockCharacter);
  });

  test('toggles favorite status when heart button is clicked', () => {
    render(<CharacterCard character={mockCharacter} />);
    
    // Get the heart button
    const heartButton = screen.getByRole('button', { name: /add to favorites/i });
    
    // Initially, the heart should not be filled
    expect(heartButton.querySelector('svg')).not.toHaveClass('fill-current');
    
    // Click the heart button
    fireEvent.click(heartButton);
    
    // After clicking, the heart should be filled
    expect(heartButton.querySelector('svg')).toHaveClass('fill-current');
    
    // Click the heart button again
    fireEvent.click(heartButton);
    
    // After clicking again, the heart should not be filled
    expect(heartButton.querySelector('svg')).not.toHaveClass('fill-current');
  });
});
