
# Hotel Haven - Frontend

## Visão Geral

Hotel Haven é uma aplicação web para busca e reserva de hotéis. Este repositório contém o código frontend do sistema, desenvolvido com React, Vite, TypeScript e integrado com Tailwind CSS. A aplicação se conecta ao backend para obter e manipular dados de hotéis, quartos e reservas.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces
- **Vite**: Ferramenta de build moderna e rápida
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **React Router**: Roteamento para aplicações React
- **React Query**: Gerenciamento de estado e cache de dados
- **React Hook Form**: Gerenciamento de formulários
- **Shadcn/UI**: Componentes de UI reutilizáveis
- **Lucide React**: Biblioteca de ícones

## Estrutura do Projeto

```
hotel-haven-frontend/
│
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── HotelCard.tsx   # Card de exibição de hotel
│   │   ├── RoomCard.tsx    # Card de exibição de quarto
│   │   ├── ReservationForm.tsx # Formulário de reserva
│   │   └── ui/             # Componentes de UI (shadcn)
│   │
│   ├── pages/              # Páginas da aplicação
│   │   ├── Index.tsx       # Página inicial com lista de hotéis
│   │   ├── HotelDetail.tsx # Página de detalhes do hotel
│   │   ├── ReservationConfirmation.tsx # Página de confirmação de reserva
│   │   └── NotFound.tsx    # Página 404
│   │
│   ├── hooks/              # Custom hooks
│   │   └── use-toast.ts    # Hook para notificações toast
│   │
│   ├── lib/                # Utilitários
│   │   └── utils.ts        # Funções utilitárias
│   │
│   ├── App.tsx             # Componente principal e configuração de rotas
│   └── main.tsx            # Entry point
│
├── public/                 # Arquivos estáticos
├── index.html              # Arquivo HTML principal
├── tailwind.config.js      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração do TypeScript
└── vite.config.js          # Configuração do Vite
```

## Funcionalidades

1. **Navegação e Listagem de Hotéis**
   - Visualização de todos os hotéis cadastrados
   - Filtragem por nome ou localização
   - Apresentação de informações básicas como classificação, preço e descrição

2. **Detalhes do Hotel**
   - Visualização de informações detalhadas sobre o hotel
   - Abas para navegação entre informações gerais, quartos disponíveis e políticas do hotel
   - Lista de comodidades disponíveis

3. **Reserva de Quartos**
   - Formulário para seleção de datas de check-in e check-out
   - Cálculo automático de preço com base no número de noites
   - Possibilidade de especificar número de adultos e crianças
   - Espaço para pedidos especiais e observações

## Como Executar

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Backend do Hotel Haven rodando (na porta 3001)

### Passos para Execução

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
```

2. Navegue até a pasta do projeto:
```bash
cd hotel-haven-frontend
```

3. Instale as dependências:
```bash
npm install
# ou
yarn
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Acesse a aplicação no navegador:
```
http://localhost:8080
```

### Importante

Certifique-se de que o servidor backend está rodando na porta 3001 antes de iniciar o frontend. Para iniciar o backend:

```bash
cd src/pages/api
npm install  # se ainda não tiver instalado as dependências
npm run dev
```

## Fluxo de Uso

1. Na página inicial, o usuário pode ver a lista de hotéis disponíveis e filtrar por nome ou localização.
2. Ao clicar em um hotel, o usuário é direcionado para a página de detalhes do hotel.
3. Na página de detalhes, o usuário pode navegar entre informações gerais, quartos disponíveis e políticas do hotel.
4. Para fazer uma reserva, o usuário clica em "Reservar Agora" no quarto desejado.
5. No modal de reserva, o usuário preenche os dados necessários, seleciona as datas e confirma a reserva.
6. Após a confirmação, o usuário recebe uma notificação de sucesso.

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Envie para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença ISC.
