
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Phone, Mail } from 'lucide-react';

interface Hotel {
  id_hotel: number;
  nome: string;
  endereco: string;
  avaliacao_media: number | string;
  descricao: string;
  telefone: string;
  email: string;
  imagem_url?: string;
}

interface HotelCardProps {
  hotel: Hotel;
  onClick: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onClick }) => {
  // Definindo uma imagem padrão para quando a URL da imagem estiver ausente ou falhar
  const defaultImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80";

  // Função para tratar erros de carregamento de imagem
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log("Erro ao carregar imagem:", hotel.imagem_url);
    (e.target as HTMLImageElement).src = defaultImage;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={hotel.imagem_url || defaultImage}
          alt={hotel.nome} 
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{hotel.nome}</span>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 mr-1 fill-current" />
            <span>{hotel.avaliacao_media}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-600">{hotel.endereco}</p>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600">{hotel.telefone}</p>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600 truncate">{hotel.email}</p>
          </div>
          <p className="text-sm line-clamp-2 mt-2">{hotel.descricao}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick} className="w-full">Ver detalhes</Button>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
