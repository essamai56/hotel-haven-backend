
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Users, BabyIcon, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ReservationForm from './ReservationForm';

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

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  
  const defaultImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80";

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!room.disponibilidade) {
    return null;
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-48 md:h-full overflow-hidden">
            <img 
              src={room.imagem_url || defaultImage} 
              alt={room.tipo} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultImage;
              }}
            />
          </div>
          <div className="p-4 md:col-span-2">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{room.tipo}</h3>
              <div className="text-lg font-bold text-primary">{formatCurrency(room.preco_base)}<span className="text-sm font-normal text-gray-500">/noite</span></div>
            </div>
            <p className="text-gray-700 mb-4">{room.descricao}</p>
            
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>{room.capacidade_adultos} adultos</span>
              </div>
              {room.capacidade_criancas > 0 && (
                <div className="flex items-center">
                  <BabyIcon className="h-5 w-5 mr-2" />
                  <span>{room.capacidade_criancas} crianças</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Dialog open={isReservationModalOpen} onOpenChange={setIsReservationModalOpen}>
                <DialogTrigger asChild>
                  <Button>Reservar Agora</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Reservar {room.tipo}</DialogTitle>
                  </DialogHeader>
                  <ReservationForm room={room} onSuccess={() => setIsReservationModalOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default RoomCard;
