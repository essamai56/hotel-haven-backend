
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import HotelCard from '@/components/HotelCard';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
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
  
  const { data: hotels, isLoading, isError } = useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      try {
        const response = await fetch('http://localhost:3001/api/hotels');
        if (!response.ok) {
          throw new Error('Erro ao carregar hotéis');
        }
        return response.json();
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

  const filteredHotels = hotels?.filter((hotel: Hotel) => 
    hotel.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const viewHotelDetails = (id: number) => {
    navigate(`/hotel/${id}`);
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
              placeholder="Pesquisar por nome ou localização..."
              className="pl-10 py-6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Hotéis disponíveis</h2>

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
            <p className="mt-2 text-gray-500">Tente modificar sua pesquisa</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
