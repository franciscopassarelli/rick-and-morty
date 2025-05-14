
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CharacterCard, CharacterProps } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCharacters } from "@/services/api";
import { toast } from "@/components/ui/sonner";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterProps | null>(null);
  const isMobile = useIsMobile();

  const { 
    data, 
    isLoading, 
    isError,
    error,
    refetch 
  } = useQuery({
    queryKey: ['characters', currentPage],
    queryFn: () => fetchCharacters(currentPage),
  });

  useEffect(() => {
    if (isError && error instanceof Error) {
      toast.error("Error loading characters", {
        description: error.message,
      });
    }
  }, [isError, error]);

  const handleCharacterClick = (character: CharacterProps) => {
    setSelectedCharacter(character);
    toast.success(`Selected: ${character.name}`, {
      description: `Status: ${character.status} - Species: ${character.species}`,
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (data && data.info.next) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const filteredCharacters = data?.results.filter(character => 
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#e9e6c9]">
      <header className="relative">
        <img 
          src="https://preview.redd.it/eg7w8d3e6rhz.png?auto=webp&s=9d807b0e0813ce702c80716e77038514253dc582" 
          alt="Rick and Morty Portal" 
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <div className="max-w-md w-full px-4 mt-16">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search characters..."
                className="pl-10 pr-4 py-2 rounded-full border-2 border-[#97CE4C] bg-white/80 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex mb-4">
          <Button 
            variant="outline" 
            className={`rounded-full mr-2 ${!searchTerm ? 'bg-[#97CE4C] text-white' : 'bg-white text-gray-800'}`}
            onClick={() => setSearchTerm("")}
          >
            Todos
          </Button>
          <Button 
            variant="outline" 
            className={`rounded-full ${searchTerm ? 'bg-[#97CE4C] text-white' : 'bg-white text-gray-800'}`}
          >
            Favorites
          </Button>
          <div className="ml-auto text-[#333]">
            {filteredCharacters ? filteredCharacters.length : 0} personajes
          </div>
        </div>

        {isLoading ? (
          <div className={isMobile ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"}>
            {[...Array(isMobile ? 4 : 6)].map((_, index) => (
              <div key={index} className={`border rounded-lg overflow-hidden ${isMobile ? "" : "flex"}`}>
                <Skeleton className={isMobile ? "h-48 w-full" : "h-24 w-24 md:h-32 md:w-32 flex-shrink-0"} />
                <div className="p-4 space-y-3 flex-grow">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10">
            <h3 className="text-2xl text-gray-800 mb-4">Oops! Something went wrong.</h3>
            <Button onClick={() => refetch()}>Try Again</Button>
          </div>
        ) : (
          <>
            <div className={isMobile ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"}>
              {filteredCharacters?.map(character => (
                <CharacterCard 
                  key={character.id} 
                  character={character}
                  onClick={handleCharacterClick}
                  isMobile={isMobile}
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-8">
              <Button 
                variant="outline" 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-full"
              >
                <ChevronLeft size={16} />
                Previous
              </Button>
              <span className="px-4 py-2 rounded-full bg-white border border-gray-200">
                Page {currentPage} of {data?.info.pages || 1}
              </span>
              <Button 
                variant="outline"
                onClick={handleNextPage} 
                disabled={!data?.info.next}
                className="flex items-center gap-1 rounded-full"
              >
                Next
                <ChevronRight size={16} />
              </Button>
            </div>
          </>
        )}
      </main>

      <footer className="bg-[#333] text-white py-4 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>TM & © 2024, The Cartoon Network, Inc. All Rights Reserved</p>
          <p>Página Hecha por el mejor</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
