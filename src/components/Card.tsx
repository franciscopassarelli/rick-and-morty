
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface CharacterProps {
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

interface CardProps {
  character: CharacterProps;
  onClick?: (character: CharacterProps) => void;
  isMobile?: boolean;
}

export const CharacterCard = ({ character, onClick, isMobile = false }: CardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-[#97CE4C]";
      case "dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  if (isMobile) {
    // Mobile view (vertical card)
    return (
      <Card 
        className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer border-2 border-gray-200 hover:border-[#97CE4C] bg-white"
        onClick={() => onClick && onClick(character)}
      >
        <div className="relative">
          <AspectRatio ratio={1/1} className="bg-gray-100">
            <img 
              src={character.image} 
              alt={character.name} 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          <Button 
            variant="outline" 
            size="icon" 
            className={`absolute top-2 right-2 rounded-full ${isFavorite ? 'bg-[#97CE4C] text-white border-[#97CE4C]' : 'bg-white text-gray-800'}`}
            onClick={handleFavoriteClick}
          >
            <Heart className={isFavorite ? "fill-current" : ""} size={16} />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
        
        <CardHeader className="pb-2 pt-3">
          <CardTitle className="text-base line-clamp-1" title={character.name}>
            {character.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <CardDescription className="text-xs text-gray-700 font-medium">
              {character.species}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="pb-2 space-y-1 pt-0">
          <div>
            <p className="text-xs text-gray-600 font-medium">Last known location:</p>
            <p className="text-xs font-medium truncate text-gray-900">{character.location.name}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-600 font-medium">First seen in:</p>
            <p className="text-xs font-medium truncate text-gray-900">Never Ricking Morty</p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end pt-1 pb-2">
          <Badge className={`${getStatusColor(character.status)} text-white text-xs`}>
            Vivo
          </Badge>
        </CardFooter>
      </Card>
    );
  }

  // Desktop view (horizontal card)
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer border-2 border-gray-200 hover:border-[#97CE4C] flex bg-white"
      onClick={() => onClick && onClick(character)}
    >
      <div className="relative flex-shrink-0">
        <div className="h-full w-24 md:w-32 bg-gray-100">
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className={`absolute top-2 left-2 rounded-full w-6 h-6 p-0 ${isFavorite ? 'bg-[#97CE4C] text-white border-[#97CE4C]' : 'bg-white text-gray-800'}`}
          onClick={handleFavoriteClick}
        >
          <Heart className={isFavorite ? "fill-current" : ""} size={14} />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>
      
      <div className="flex flex-col flex-grow p-3">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-base line-clamp-1" title={character.name}>
            {character.name}
          </CardTitle>
          <Badge className={`${getStatusColor(character.status)} text-white text-xs ml-2`}>
            Vivo
          </Badge>
        </div>
        
        <CardDescription className="text-xs text-gray-700 font-medium mb-2">
          {character.species}
        </CardDescription>
        
        <div className="flex flex-col space-y-1 mt-auto">
          <div>
            <p className="text-xs text-gray-600 font-medium">Last known location:</p>
            <p className="text-xs font-medium truncate text-gray-900">{character.location.name}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-600 font-medium">First seen in:</p>
            <p className="text-xs font-medium truncate text-gray-900">Never Ricking Morty</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
