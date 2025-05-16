import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import HotelCard from '@/components/HotelCard';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SearchX } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

interface Hotel {
  id_hotel: number;
  nome: string;
  endereco: string;
  avaliacao_media: number;
  descricao: string;
  telefone: string;
  email: string;
  imagem_url?: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  
  // Debounce para o termo de pesquisa
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Aguarda 500ms para atualizar o termo de pesquisa

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);
  
  // Consulta que inclui o termo de pesquisa
  const { data: hotels, isLoading, isError } = useQuery({
    queryKey: ['hotels', debouncedSearchTerm],
    queryFn: async () => {
      try {
        const baseUrl = 'http://localhost:3001/api/hotels';
        const url = debouncedSearchTerm 
          ? `${baseUrl}?search=${encodeURIComponent(debouncedSearchTerm)}` 
          : baseUrl;
          
        console.log('Fazendo requisição para:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Erro ao carregar hotéis');
        }
        
        const data = await response.json();
        console.log('Hotéis recebidos:', data);
        return data;
      } catch (error) {
        console.error('Erro ao buscar hotéis:', error);
        toast({
          title: "Erro!",
          description: "Não foi possível carregar os hotéis. Verifique se o servidor está rodando.",
          variant: "destructive"
        });
        throw error;
      }
    }
  });

  // Atualiza os hotéis filtrados quando os dados forem carregados
  useEffect(() => {
    if (hotels) {
      console.log('Atualizando hotéis filtrados:', hotels);
      setFilteredHotels(hotels);
    }
  }, [hotels]);

  const viewHotelDetails = (id: number) => {
    navigate(`/hotel/${id}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Carregando hotéis...</h1>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar</h1>
            <p className="mb-4">Não foi possível conectar com o servidor. Por favor, verifique se o backend está rodando na porta 3001.</p>
            <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="bg-primary/10 rounded-lg p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-primary">Encontre o hotel perfeito</h1>
          <p className="text-xl text-gray-600 mb-6">Compare preços, veja avaliações e reserve com facilidade</p>
          
          <div className="relative max-w-md mx-auto">
            <Input
              placeholder="Pesquisar por nome, localização ou descrição..."
              className="pl-10 py-6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={clearSearch}
                aria-label="Limpar pesquisa"
              >
                <SearchX className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Hotéis disponíveis {filteredHotels?.length > 0 ? `(${filteredHotels.length})` : ''}</h2>

        {filteredHotels && filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel: Hotel) => (
              <HotelCard 
                key={hotel.id_hotel} 
                hotel={hotel} 
                onClick={() => viewHotelDetails(hotel.id_hotel)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-600">Nenhum hotel encontrado</h2>
            <p className="mt-2 text-gray-500">Tente modificar sua pesquisa ou {hotels?.length > 0 && <Button variant="link" onClick={clearSearch}>limpar a pesquisa</Button>}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
