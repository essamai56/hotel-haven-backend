import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Wifi, Pool, Restaurant, Star, MapPin, Coffee, Check, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import RoomCard from '@/components/RoomCard';
import MainLayout from '@/layouts/MainLayout';

interface Hotel {
  id_hotel: number;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  website: string;
  descricao: string;
  avaliacao_media: number | string;
  imagem_url?: string;
}

interface Room {
  id_quarto: number;
  tipo: string;
  descricao: string;
  capacidade_adultos: number;
  capacidade_criancas: number;
  preco_base: number;
  disponibilidade: boolean;
  imagem_url?: string;
}

interface Amenity {
  id_comodidade: number;
  nome: string;
  descricao: string;
}

interface Policy {
  horario_checkin_inicio: string;
  horario_checkin_fim: string;
  horario_checkout: string;
  permite_pets: boolean;
  aceita_dinheiro: boolean;
}

interface HotelDetails {
  hotel: Hotel;
  quartos: Room[];
  comodidades: Amenity[];
  politicas?: Policy;
}

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("info");
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['hotel', id],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/hotels/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar detalhes do hotel');
        }
        return response.json() as Promise<HotelDetails>;
      } catch (error) {
        console.error('Erro ao buscar detalhes do hotel:', error);
        toast({
          title: "Erro!",
          description: "Não foi possível carregar os detalhes do hotel.",
          variant: "destructive"
        });
        throw error;
      }
    }
  });

  const getAmenityIcon = (nome: string) => {
    if (nome.includes('Wi-Fi')) return <Wifi className="h-5 w-5" />;
    if (nome.includes('Piscina')) return <Pool className="h-5 w-5" />;
    if (nome.includes('Restaurante')) return <Restaurant className="h-5 w-5" />;
    if (nome.includes('café')) return <Coffee className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Carregando dados do hotel...</h1>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isError || !data) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar</h1>
            <p className="mb-4">Não foi possível carregar os dados do hotel.</p>
            <Link to="/">
              <Button>Voltar para a página inicial</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const { hotel, quartos, comodidades, politicas } = data;
  const defaultImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80";

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar para a lista de hotéis
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="h-64 md:h-96 relative">
            <img 
              src={hotel.imagem_url || defaultImage} 
              alt={hotel.nome} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultImage;
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{hotel.nome}</h1>
                <div className="flex items-center bg-yellow-400 px-2 py-1 rounded-md">
                  <Star className="h-5 w-5 mr-1 fill-current" />
                  <span className="font-bold">{hotel.avaliacao_media}</span>
                </div>
              </div>
              <div className="flex items-center text-white mt-2">
                <MapPin className="h-5 w-5 mr-2" />
                <p>{hotel.endereco}</p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="rooms">Quartos</TabsTrigger>
              <TabsTrigger value="policies">Políticas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-semibold mb-4">Sobre o hotel</h2>
                  <p className="mb-6">{hotel.descricao}</p>
                  
                  <h3 className="text-xl font-semibold mb-4">Contato</h3>
                  <div className="space-y-2 mb-6">
                    <p><span className="font-medium">Telefone:</span> {hotel.telefone}</p>
                    <p><span className="font-medium">E-mail:</span> {hotel.email}</p>
                    {hotel.website && <p><span className="font-medium">Website:</span> {hotel.website}</p>}
                  </div>
                </div>

                <div>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">Comodidades</h3>
                      <div className="space-y-3">
                        {comodidades && comodidades.length > 0 ? (
                          comodidades.map((amenity) => (
                            <div key={amenity.id_comodidade} className="flex items-center">
                              {getAmenityIcon(amenity.nome)}
                              <span className="ml-3">{amenity.nome}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">Sem informações de comodidades disponíveis.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rooms">
              <h2 className="text-2xl font-semibold mb-6">Quartos disponíveis</h2>
              <div className="space-y-6">
                {quartos && quartos.length > 0 ? (
                  quartos.map((room) => (
                    <RoomCard key={room.id_quarto} room={room} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-xl font-medium text-gray-600">Nenhum quarto disponível</h3>
                    <p className="mt-2 text-gray-500">Não há quartos cadastrados para este hotel.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="policies">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Horários</h3>
                    {politicas ? (
                      <div className="space-y-3">
                        <p><span className="font-medium">Check-in:</span> {politicas.horario_checkin_inicio} às {politicas.horario_checkin_fim}</p>
                        <p><span className="font-medium">Check-out:</span> até {politicas.horario_checkout}</p>
                      </div>
                    ) : (
                      <p className="text-gray-500">Sem informações de horários disponíveis.</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Outras políticas</h3>
                    {politicas ? (
                      <div className="space-y-3">
                        <div className="flex items-center">
                          {politicas.permite_pets ? (
                            <>
                              <Check className="h-5 w-5 text-green-500 mr-2" />
                              <span>Aceita pets</span>
                            </>
                          ) : (
                            <>
                              <X className="h-5 w-5 text-red-500 mr-2" />
                              <span>Não aceita pets</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center">
                          {politicas.aceita_dinheiro ? (
                            <>
                              <Check className="h-5 w-5 text-green-500 mr-2" />
                              <span>Aceita pagamento em dinheiro</span>
                            </>
                          ) : (
                            <>
                              <X className="h-5 w-5 text-red-500 mr-2" />
                              <span>Não aceita pagamento em dinheiro</span>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">Sem informações de políticas disponíveis.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default HotelDetail;
