
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Room {
  id_quarto: number;
  tipo: string;
  preco_base: number;
}

interface ReservationFormProps {
  room: Room;
  onSuccess: () => void;
}

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  numeroAdultos: number;
  numeroCriancas: number;
  observacoes?: string;
  pedidoEspecial?: string;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ room, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = checkOutDate.getTime() - checkInDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };
  
  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * room.preco_base;
  };

  const onSubmit = async (data: FormData) => {
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Erro!",
        description: "Por favor, selecione as datas de check-in e check-out.",
        variant: "destructive"
      });
      return;
    }

    if (checkInDate >= checkOutDate) {
      toast({
        title: "Erro!",
        description: "A data de check-out deve ser posterior à data de check-in.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Primeiro, criar/obter o cliente
    try {
      const clienteResponse = await fetch('http://localhost:3001/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          endereco: data.endereco
        }),
      });

      if (!clienteResponse.ok) {
        throw new Error('Erro ao registrar cliente');
      }

      const clienteData = await clienteResponse.json();

      // Depois, criar a reserva
      const reservaResponse = await fetch('http://localhost:3001/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_cliente: clienteData.id_cliente,
          id_quarto: room.id_quarto,
          data_checkin: format(checkInDate, 'yyyy-MM-dd'),
          data_checkout: format(checkOutDate, 'yyyy-MM-dd'),
          numero_adultos: data.numeroAdultos,
          numero_criancas: data.numeroCriancas || 0,
          preco_total: calculateTotal(),
          observacoes: data.observacoes || '',
          pedido_especial: data.pedidoEspecial || '',
          status: 'Confirmada'
        }),
      });

      if (!reservaResponse.ok) {
        throw new Error('Erro ao fazer reserva');
      }

      toast({
        title: "Sucesso!",
        description: "Sua reserva foi realizada com sucesso.",
      });
      
      onSuccess();
    } catch (error) {
      console.error('Erro ao processar reserva:', error);
      toast({
        title: "Erro!",
        description: "Não foi possível concluir sua reserva. Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="checkin">Check-in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkInDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkInDate ? format(checkInDate, "PPP", { locale: ptBR }) : <span>Selecionar data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="checkout">Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkOutDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOutDate ? format(checkOutDate, "PPP", { locale: ptBR }) : <span>Selecionar data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                disabled={(date) => date < new Date() || (checkInDate ? date <= checkInDate : false)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="numeroAdultos">Adultos</Label>
          <Input
            id="numeroAdultos"
            type="number"
            min={1}
            max={room.tipo.includes('Família') ? 4 : 2}
            defaultValue={1}
            {...register('numeroAdultos', { 
              required: 'Número de adultos é obrigatório',
              min: { value: 1, message: 'Mínimo de 1 adulto' },
            })}
          />
          {errors.numeroAdultos && (
            <p className="text-sm text-red-500">{errors.numeroAdultos.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="numeroCriancas">Crianças</Label>
          <Input
            id="numeroCriancas"
            type="number"
            min={0}
            max={room.tipo.includes('Família') ? 3 : 2}
            defaultValue={0}
            {...register('numeroCriancas')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nome">Nome completo</Label>
        <Input
          id="nome"
          {...register('nome', { required: 'Nome é obrigatório' })}
        />
        {errors.nome && (
          <p className="text-sm text-red-500">{errors.nome.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { 
            required: 'E-mail é obrigatório',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: 'E-mail inválido'
            }
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone</Label>
        <Input
          id="telefone"
          {...register('telefone', { required: 'Telefone é obrigatório' })}
        />
        {errors.telefone && (
          <p className="text-sm text-red-500">{errors.telefone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="endereco">Endereço</Label>
        <Input
          id="endereco"
          {...register('endereco', { required: 'Endereço é obrigatório' })}
        />
        {errors.endereco && (
          <p className="text-sm text-red-500">{errors.endereco.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pedidoEspecial">Pedidos especiais</Label>
        <Textarea
          id="pedidoEspecial"
          placeholder="Ex: Quarto em andar alto, cama extra, berço para bebê, etc."
          {...register('pedidoEspecial')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          placeholder="Observações adicionais para sua reserva"
          {...register('observacoes')}
        />
      </div>

      {checkInDate && checkOutDate && (
        <div className="bg-muted p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="font-medium">Número de noites:</span>
            <span>{calculateNights()} noites</span>
          </div>
          <div className="flex justify-between items-center font-bold mt-2">
            <span>Total:</span>
            <span>R$ {calculateTotal().toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Processando..." : "Confirmar Reserva"}
      </Button>
    </form>
  );
};

export default ReservationForm;
