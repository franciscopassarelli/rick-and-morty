
// Interfaces
export interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// API base URL
const API_BASE_URL = "https://rickandmortyapi.com/api";

// Fetch characters with optional page parameter
export const fetchCharacters = async (page = 1): Promise<ApiResponse<Character>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/character?page=${page}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

// Fetch a single character by ID
export const fetchCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await fetch(`${API_BASE_URL}/character/${id}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching character with ID ${id}:`, error);
    throw error;
  }
};
