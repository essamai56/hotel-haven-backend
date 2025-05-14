
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

const ReservationConfirmation = () => {
  const location = useLocation();
  const reservation = location.state?.reservation;

  if (!reservation) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Reserva não encontrada</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6">Não foi possível encontrar os detalhes da sua reserva.</p>
              <Link to="/">
                <Button className="w-full">
                  <Home className="mr-2 h-4 w-4" /> Voltar para a página inicial
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-3xl">Reserva Confirmada!</CardTitle>
            <p className="text-muted-foreground mt-2">
              Sua reserva foi realizada com sucesso. Enviamos os detalhes para o seu e-mail.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Detalhes da reserva</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Número da reserva:</span> {reservation.id_reserva}</p>
                  <p><span className="font-medium">Check-in:</span> {new Date(reservation.data_checkin).toLocaleDateString()}</p>
                  <p><span className="font-medium">Check-out:</span> {new Date(reservation.data_checkout).toLocaleDateString()}</p>
                  <p><span className="font-medium">Adultos:</span> {reservation.numero_adultos}</p>
                  <p><span className="font-medium">Crianças:</span> {reservation.numero_criancas}</p>
                  <p><span className="font-medium">Total:</span> R$ {reservation.preco_total.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Informações do quarto</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Hotel:</span> {reservation.hotel?.nome}</p>
                  <p><span className="font-medium">Tipo de quarto:</span> {reservation.quarto?.tipo}</p>
                  <p><span className="font-medium">Endereço:</span> {reservation.hotel?.endereco}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 text-center">
              <Link to="/">
                <Button>
                  <Home className="mr-2 h-4 w-4" /> Voltar para a página inicial
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReservationConfirmation;
