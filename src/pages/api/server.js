
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabaseUrl = "https://gdgqpcedobedkyhjbuku.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZ3FwY2Vkb2JlZGt5aGpidWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4ODgxODUsImV4cCI6MjA1OTQ2NDE4NX0.vC7T9OVRydDdjaDHOJ26uPKwesDM86MPh-jVeOg_yt4";
const supabase = createClient(supabaseUrl, supabaseKey);

// Rota para buscar todos os hotéis com opção de pesquisa
app.get('/api/hotels', async (req, res) => {
  try {
    let query = supabase.from('Hotel').select('*');
    
    // Se houver um parâmetro de pesquisa, filtra os resultados
    const { search } = req.query;
    if (search) {
      console.log(`Pesquisando por: ${search}`);
      
      // Pesquisa em vários campos usando o operador ilike (case insensitive)
      query = query.or(
        `nome.ilike.%${search}%,` +
        `endereco.ilike.%${search}%,` +
        `descricao.ilike.%${search}%`
      );
    }
    
    const { data: hotels, error } = await query;
    
    if (error) throw error;
    
    console.log(`Encontrados ${hotels?.length || 0} hotéis`);
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Erro ao buscar hotéis:', error);
    res.status(500).json({ error: 'Erro ao buscar hotéis' });
  }
});

// Rota para buscar um hotel específico por ID
app.get('/api/hotels/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Busca informações do hotel
    const { data: hotel, error: hotelError } = await supabase
      .from('Hotel')
      .select('*')
      .eq('id_hotel', id)
      .single();
    
    if (hotelError) throw hotelError;
    
    // Busca quartos do hotel
    const { data: rooms, error: roomsError } = await supabase
      .from('Quarto')
      .select('*')
      .eq('id_hotel', id);
    
    if (roomsError) throw roomsError;
    
    // Busca comodidades do hotel
    const { data: amenities, error: amenitiesError } = await supabase
      .from('Tabela de Ligação Hotel-Comodidade')
      .select(`
        id_comodidade,
        Comodidade (*)
      `)
      .eq('id_hotel', id);
    
    if (amenitiesError) throw amenitiesError;
    
    res.status(200).json({
      ...hotel,
      quartos: rooms,
      comodidades: amenities.map(item => item.Comodidade)
    });
  } catch (error) {
    console.error('Erro ao buscar hotel específico:', error);
    res.status(500).json({ error: 'Erro ao buscar hotel específico' });
  }
});

// Rota para buscar detalhes de um quarto específico
app.get('/api/rooms/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Busca informações do quarto
    const { data: room, error: roomError } = await supabase
      .from('Quarto')
      .select('*')
      .eq('id_quarto', id)
      .single();
    
    if (roomError) throw roomError;
    
    // Busca detalhes adicionais do quarto
    const { data: details, error: detailsError } = await supabase
      .from('Detalhe Quarto')
      .select('*')
      .eq('id_quarto', id);
    
    if (detailsError) throw detailsError;
    
    res.status(200).json({
      ...room,
      detalhes: details
    });
  } catch (error) {
    console.error('Erro ao buscar detalhes do quarto:', error);
    res.status(500).json({ error: 'Erro ao buscar detalhes do quarto' });
  }
});

// Rota para criar uma nova reserva
app.post('/api/reservations', async (req, res) => {
  const { 
    id_cliente, 
    id_quarto, 
    data_checkin, 
    data_checkout, 
    numero_adultos, 
    numero_criancas, 
    preco_total,
    observacoes,
    pedido_especial 
  } = req.body;
  
  try {
    // Verificar disponibilidade do quarto
    const { data: existingReservations, error: checkError } = await supabase
      .from('Reserva')
      .select('*')
      .eq('id_quarto', id_quarto)
      .not('status', 'eq', 'Cancelada')
      .or(`data_checkin.gte.${data_checkin},data_checkout.lte.${data_checkout}`);
    
    if (checkError) throw checkError;
    
    // Se já existirem reservas para este período, retorna erro
    if (existingReservations && existingReservations.length > 0) {
      return res.status(400).json({ error: 'Quarto não disponível para o período selecionado' });
    }
    
    // Criar a reserva
    const { data, error } = await supabase
      .from('Reserva')
      .insert([
        { 
          id_cliente, 
          id_quarto, 
          data_checkin, 
          data_checkout, 
          numero_adultos, 
          numero_criancas, 
          preco_total,
          status: 'Confirmada',
          observacoes,
          pedido_especial,
          data_criacao: new Date().toISOString()
        }
      ])
      .select();
    
    if (error) throw error;
    
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ error: 'Erro ao criar reserva' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
