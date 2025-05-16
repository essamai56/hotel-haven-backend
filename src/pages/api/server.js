
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
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Dados padrão para uso caso o banco de dados esteja vazio
const defaultHotels = [
  {
    id_hotel: 1,
    nome: "Hotel Oiticica",
    endereco: "Rua Pinto Madeira, 425 - Centro, Fortaleza-CE",
    avaliacao_media: 4.5,
    descricao: "O preço que cabe no seu bolso. Excelente localização no centro de Fortaleza.",
    telefone: "+55 (85) 99662-9907",
    email: "hoteloiticica@hotmail.com",
    imagem_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
  },
  {
    id_hotel: 2,
    nome: "Grand Plaza Hotel",
    endereco: "Avenida Beira Mar, 1020 - Meireles, Fortaleza-CE",
    avaliacao_media: 4.8,
    descricao: "Hotel de luxo com vista para o mar. Quartos amplos e confortáveis.",
    telefone: "+55 (85) 3242-1000",
    email: "contato@grandplaza.com.br",
    imagem_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id_hotel: 3,
    nome: "Pousada Beiramar",
    endereco: "Rua dos Tabajaras, 250 - Praia de Iracema, Fortaleza-CE",
    avaliacao_media: 4.2,
    descricao: "Aconchegante pousada próxima à praia. Ambiente familiar e café da manhã delicioso.",
    telefone: "+55 (85) 3219-5050",
    email: "reservas@pousadabeiramar.com.br",
    imagem_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id_hotel: 4,
    nome: "Hotel Central Park",
    endereco: "Avenida Santos Dumont, 5600 - Papicu, Fortaleza-CE",
    avaliacao_media: 4.3,
    descricao: "Localização privilegiada próximo ao shopping e centro de negócios.",
    telefone: "+55 (85) 3265-7878",
    email: "contato@hotelcentralpark.com.br",
    imagem_url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80"
  }
];

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
    
    // Se não encontrou hotéis no banco de dados, usa os dados padrão
    let filteredHotels = hotels;
    if (!hotels || hotels.length === 0) {
      console.log("Nenhum hotel encontrado no banco de dados. Usando dados padrão.");
      filteredHotels = defaultHotels;
      
      // Se houver um termo de pesquisa, filtra os dados padrão também
      if (search) {
        const searchLower = search.toLowerCase();
        filteredHotels = defaultHotels.filter(hotel => 
          hotel.nome.toLowerCase().includes(searchLower) ||
          hotel.endereco.toLowerCase().includes(searchLower) ||
          hotel.descricao.toLowerCase().includes(searchLower)
        );
      }
    }
    
    console.log(`Encontrados ${filteredHotels.length} hotéis`);
    res.status(200).json(filteredHotels);
  } catch (error) {
    console.error('Erro ao buscar hotéis:', error);
    // Em caso de erro, retorna os dados padrão
    const { search } = req.query;
    let filteredHotels = defaultHotels;
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredHotels = defaultHotels.filter(hotel => 
        hotel.nome.toLowerCase().includes(searchLower) ||
        hotel.endereco.toLowerCase().includes(searchLower) ||
        hotel.descricao.toLowerCase().includes(searchLower)
      );
    }
    
    console.log(`Erro na consulta ao banco, retornando ${filteredHotels.length} hotéis padrão`);
    res.status(200).json(filteredHotels);
  }
});

// Rota para buscar um hotel específico por ID
app.get('/api/hotels/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Tenta buscar o hotel no banco de dados
    const { data: hotel, error: hotelError } = await supabase
      .from('Hotel')
      .select('*')
      .eq('id_hotel', id)
      .single();
    
    // Se encontrou o hotel no banco, retorna os detalhes
    if (!hotelError && hotel) {
      // Busca quartos do hotel
      const { data: rooms, error: roomsError } = await supabase
        .from('Quarto')
        .select('*')
        .eq('id_hotel', id);
      
      // Busca comodidades do hotel
      const { data: amenities, error: amenitiesError } = await supabase
        .from('Tabela de Ligação Hotel-Comodidade')
        .select(`
          id_comodidade,
          Comodidade (*)
        `)
        .eq('id_hotel', id);
      
      res.status(200).json({
        ...hotel,
        quartos: !roomsError ? rooms : [],
        comodidades: !amenitiesError ? amenities?.map(item => item.Comodidade) : []
      });
      return;
    }
    
    // Se não encontrou no banco, procura nos dados padrão
    const defaultHotel = defaultHotels.find(h => h.id_hotel === parseInt(id));
    
    if (defaultHotel) {
      // Dados de quartos padrão para o hotel
      const defaultRooms = [
        {
          id_quarto: 1,
          id_hotel: defaultHotel.id_hotel,
          tipo: "Suíte Master",
          capacidade_adultos: 2,
          capacidade_criancas: 1,
          preco_base: 350.00,
          disponibilidade: true,
          descricao: "Quarto amplo com cama king-size e vista para o mar",
          imagem_url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
        },
        {
          id_quarto: 2,
          id_hotel: defaultHotel.id_hotel,
          tipo: "Quarto Standard",
          capacidade_adultos: 2,
          capacidade_criancas: 0,
          preco_base: 250.00,
          disponibilidade: true,
          descricao: "Quarto confortável com duas camas de solteiro",
          imagem_url: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80"
        }
      ];
      
      // Dados de comodidades padrão para o hotel
      const defaultAmenities = [
        { id_comodidade: 1, nome: "Wi-Fi Gratuito", descricao: "Internet de alta velocidade em todo o hotel" },
        { id_comodidade: 2, nome: "Piscina", descricao: "Piscina ao ar livre com área de lazer" },
        { id_comodidade: 3, nome: "Café da Manhã", descricao: "Café da manhã com buffet completo" },
        { id_comodidade: 4, nome: "Estacionamento", descricao: "Estacionamento gratuito para hóspedes" }
      ];
      
      res.status(200).json({
        ...defaultHotel,
        quartos: defaultRooms,
        comodidades: defaultAmenities
      });
    } else {
      res.status(404).json({ error: "Hotel não encontrado" });
    }
  } catch (error) {
    console.error('Erro ao buscar hotel específico:', error);
    res.status(500).json({ error: 'Erro ao buscar hotel específico' });
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`URL do Supabase: ${supabaseUrl}`);
});

module.exports = app;
