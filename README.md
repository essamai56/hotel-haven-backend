
# Hotel Haven Backend

Este é o backend para um sistema de reserva de hotéis que se integra com um banco de dados Supabase.

## Funcionalidades

- Pesquisar hotéis disponíveis
- Obter detalhes específicos de um hotel selecionado
- Visualizar quartos disponíveis
- Fazer reservas em quartos de hotéis

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express.js**: Framework web para Node.js
- **Supabase**: Backend-as-a-Service baseado em PostgreSQL
- **Cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing)
- **Dotenv**: Carregamento de variáveis de ambiente

## Estrutura do Banco de Dados

O sistema utiliza diversas tabelas no Supabase, incluindo:

- **Hotel**: Armazena informações sobre os hotéis
- **Quarto**: Contém detalhes sobre os quartos disponíveis
- **Reserva**: Registra as reservas feitas pelos clientes
- **Cliente**: Informações dos clientes
- **Comodidade**: Recursos disponíveis nos hotéis e quartos
- E outras tabelas relacionadas para políticas, detalhes e relacionamentos

## Estrutura do Projeto

```
hotel-haven-backend/
│
├── server.js           # Ponto de entrada da aplicação
├── .env                # Variáveis de ambiente
├── package.json        # Dependências e scripts
└── README.md           # Documentação
```

## Rotas da API

### Hotéis
- `GET /api/hotels` - Retorna todos os hotéis
- `GET /api/hotels/:id` - Retorna detalhes de um hotel específico

### Quartos
- `GET /api/rooms/:id` - Retorna detalhes de um quarto específico

### Reservas
- `POST /api/reservations` - Cria uma nova reserva

## Como Executar

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn

### Passos para Execução

1. Clone o repositório:
```
git clone <url-do-repositorio>
```

2. Navegue até a pasta do projeto:
```
cd hotel-haven-backend
```

3. Instale as dependências:
```
npm install
```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` baseado no `.env.example`
   - Adicione suas credenciais do Supabase

5. Inicie o servidor:
```
npm run dev
```

O servidor estará rodando na porta 3001 (ou na porta definida na variável de ambiente PORT).

## usar backend 
```
Para executar o backend:

Navegue até a pasta do projeto: cd src/pages/api
Instale as dependências: npm install
Inicie o servidor: npm run dev
O servidor estará rodando na porta 3001 e conectado ao seu banco de dados Supabase. O código implementa todas as funcionalidades solicitadas: busca de hotéis, obtenção de detalhes de hotéis específicos e sistema de reservas.```
## Desenvolvimento

Para desenvolvimento, o projeto utiliza nodemon para reinicialização automática do servidor quando houver alterações no código:

```
npm run dev
```

## Requisitos da API

Para consumir a API de reservas, o cliente deve fornecer os seguintes dados:

- `id_cliente`: ID do cliente que está fazendo a reserva
- `id_quarto`: ID do quarto a ser reservado
- `data_checkin`: Data de entrada no formato YYYY-MM-DD
- `data_checkout`: Data de saída no formato YYYY-MM-DD
- `numero_adultos`: Número de adultos
- `numero_criancas`: Número de crianças (opcional)
- `preco_total`: Preço total da reserva
- `observacoes`: Observações adicionais (opcional)
- `pedido_especial`: Pedidos especiais (opcional)

## Licença

Este projeto está licenciado sob a licença ISC.
