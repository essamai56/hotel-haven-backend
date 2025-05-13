export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cliente: {
        Row: {
          email: string
          endereco: string | null
          id_cliente: number
          nome: string
          telefone: string | null
        }
        Insert: {
          email: string
          endereco?: string | null
          id_cliente?: number
          nome: string
          telefone?: string | null
        }
        Update: {
          email?: string
          endereco?: string | null
          id_cliente?: number
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
      Cliente: {
        Row: {
          created_at: string
          email: string | null
          endereco: string | null
          id_cliente: number
          nome: string | null
          telefone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          endereco?: string | null
          id_cliente?: number
          nome?: string | null
          telefone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          endereco?: string | null
          id_cliente?: number
          nome?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      comodidade: {
        Row: {
          descricao: string | null
          id_comodidade: number
          nome: string
        }
        Insert: {
          descricao?: string | null
          id_comodidade?: number
          nome: string
        }
        Update: {
          descricao?: string | null
          id_comodidade?: number
          nome?: string
        }
        Relationships: []
      }
      Comodidade: {
        Row: {
          created_at: string
          descricao: string | null
          id_comodidade: number
          nome: string | null
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          id_comodidade?: number
          nome?: string | null
        }
        Update: {
          created_at?: string
          descricao?: string | null
          id_comodidade?: number
          nome?: string | null
        }
        Relationships: []
      }
      "Contato Hotel": {
        Row: {
          created_at: string
          descricao: string | null
          id_hotel: number | null
          id_meio_contato: number
          tipo_meio: string | null
          valor: string | null
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          id_hotel?: number | null
          id_meio_contato?: number
          tipo_meio?: string | null
          valor?: string | null
        }
        Update: {
          created_at?: string
          descricao?: string | null
          id_hotel?: number | null
          id_meio_contato?: number
          tipo_meio?: string | null
          valor?: string | null
        }
        Relationships: []
      }
      contato_hotel: {
        Row: {
          descricao: string | null
          id_hotel: number
          id_meio_contato: number
          tipo_meio: string
          valor: string
        }
        Insert: {
          descricao?: string | null
          id_hotel: number
          id_meio_contato?: number
          tipo_meio: string
          valor: string
        }
        Update: {
          descricao?: string | null
          id_hotel?: number
          id_meio_contato?: number
          tipo_meio?: string
          valor?: string
        }
        Relationships: [
          {
            foreignKeyName: "contato_hotel_id_hotel_fkey"
            columns: ["id_hotel"]
            isOneToOne: false
            referencedRelation: "hotel"
            referencedColumns: ["id_hotel"]
          },
        ]
      }
      "Detalhe Quarto": {
        Row: {
          created_at: string
          id_detalhe: number
          id_quarto: number | null
          nome_detalhe: number | null
          "valor_detalhe TEXT": string | null
        }
        Insert: {
          created_at?: string
          id_detalhe?: number
          id_quarto?: number | null
          nome_detalhe?: number | null
          "valor_detalhe TEXT"?: string | null
        }
        Update: {
          created_at?: string
          id_detalhe?: number
          id_quarto?: number | null
          nome_detalhe?: number | null
          "valor_detalhe TEXT"?: string | null
        }
        Relationships: []
      }
      detalhe_quarto: {
        Row: {
          id_detalhe: number
          id_quarto: number
          nome_detalhe: string
          valor_detalhe: string | null
        }
        Insert: {
          id_detalhe?: number
          id_quarto: number
          nome_detalhe: string
          valor_detalhe?: string | null
        }
        Update: {
          id_detalhe?: number
          id_quarto?: number
          nome_detalhe?: string
          valor_detalhe?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "detalhe_quarto_id_quarto_fkey"
            columns: ["id_quarto"]
            isOneToOne: false
            referencedRelation: "quarto"
            referencedColumns: ["id_quarto"]
          },
        ]
      }
      hotel: {
        Row: {
          avaliacao_media: number | null
          descricao: string | null
          email: string | null
          endereco: string | null
          id_hotel: number
          nome: string
          telefone: string | null
          website: string | null
        }
        Insert: {
          avaliacao_media?: number | null
          descricao?: string | null
          email?: string | null
          endereco?: string | null
          id_hotel?: number
          nome: string
          telefone?: string | null
          website?: string | null
        }
        Update: {
          avaliacao_media?: number | null
          descricao?: string | null
          email?: string | null
          endereco?: string | null
          id_hotel?: number
          nome?: string
          telefone?: string | null
          website?: string | null
        }
        Relationships: []
      }
      Hotel: {
        Row: {
          avaliacao_media: string
          created_at: string
          descricao: string
          email: string
          endereco: string
          id_hotel: number
          nome: string
          telefone: string
          website: string
        }
        Insert: {
          avaliacao_media?: string
          created_at?: string
          descricao?: string
          email?: string
          endereco?: string
          id_hotel?: number
          nome?: string
          telefone?: string
          website: string
        }
        Update: {
          avaliacao_media?: string
          created_at?: string
          descricao?: string
          email?: string
          endereco?: string
          id_hotel?: number
          nome?: string
          telefone?: string
          website?: string
        }
        Relationships: []
      }
      hotel_comodidade: {
        Row: {
          id_comodidade: number
          id_hotel: number
        }
        Insert: {
          id_comodidade: number
          id_hotel: number
        }
        Update: {
          id_comodidade?: number
          id_hotel?: number
        }
        Relationships: [
          {
            foreignKeyName: "hotel_comodidade_id_comodidade_fkey"
            columns: ["id_comodidade"]
            isOneToOne: false
            referencedRelation: "comodidade"
            referencedColumns: ["id_comodidade"]
          },
          {
            foreignKeyName: "hotel_comodidade_id_hotel_fkey"
            columns: ["id_hotel"]
            isOneToOne: false
            referencedRelation: "hotel"
            referencedColumns: ["id_hotel"]
          },
        ]
      }
      informacoes_contato: {
        Row: {
          assunto: string | null
          data_envio: string | null
          email: string
          id_contato: number
          mensagem: string | null
          nome: string
          regiao: string | null
          sobrenome: string
          telefone: string
          tipo_contato: string | null
        }
        Insert: {
          assunto?: string | null
          data_envio?: string | null
          email: string
          id_contato?: number
          mensagem?: string | null
          nome: string
          regiao?: string | null
          sobrenome: string
          telefone: string
          tipo_contato?: string | null
        }
        Update: {
          assunto?: string | null
          data_envio?: string | null
          email?: string
          id_contato?: number
          mensagem?: string | null
          nome?: string
          regiao?: string | null
          sobrenome?: string
          telefone?: string
          tipo_contato?: string | null
        }
        Relationships: []
      }
      localizacao_hotel: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          endereco_completo: string
          estado: string | null
          id_localizacao: number
          latitude: number | null
          logradouro: string | null
          longitude: number | null
          numero: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          endereco_completo: string
          estado?: string | null
          id_localizacao?: number
          latitude?: number | null
          logradouro?: string | null
          longitude?: number | null
          numero?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          endereco_completo?: string
          estado?: string | null
          id_localizacao?: number
          latitude?: number | null
          logradouro?: string | null
          longitude?: number | null
          numero?: string | null
        }
        Relationships: []
      }
      "Política Criança": {
        Row: {
          created_at: string
          custo_berco: number | null
          custo_cama_extra: number | null
          id_hotel: number | null
          id_politica_crianca: number
          limite_idade_gratuito: number | null
          max_bercos_quarto: number | null
          max_camas_extras_quarto: number | null
          politica_bebes_camas_extras: string | null
          politica_geral: string | null
        }
        Insert: {
          created_at?: string
          custo_berco?: number | null
          custo_cama_extra?: number | null
          id_hotel?: number | null
          id_politica_crianca?: number
          limite_idade_gratuito?: number | null
          max_bercos_quarto?: number | null
          max_camas_extras_quarto?: number | null
          politica_bebes_camas_extras?: string | null
          politica_geral?: string | null
        }
        Update: {
          created_at?: string
          custo_berco?: number | null
          custo_cama_extra?: number | null
          id_hotel?: number | null
          id_politica_crianca?: number
          limite_idade_gratuito?: number | null
          max_bercos_quarto?: number | null
          max_camas_extras_quarto?: number | null
          politica_bebes_camas_extras?: string | null
          politica_geral?: string | null
        }
        Relationships: []
      }
      "Politica Pagamento": {
        Row: {
          aceita_cartao_credito: boolean | null
          aceita_debito: boolean | null
          aceita_dinheiro: boolean | null
          aceita_transferencia_bancaria: boolean | null
          cartoes_aceitos: string | null
          created_at: string
          id_hotel: number | null
          id_politica_pagamento: number
          outras_formas_pagamento: string | null
        }
        Insert: {
          aceita_cartao_credito?: boolean | null
          aceita_debito?: boolean | null
          aceita_dinheiro?: boolean | null
          aceita_transferencia_bancaria?: boolean | null
          cartoes_aceitos?: string | null
          created_at?: string
          id_hotel?: number | null
          id_politica_pagamento?: number
          outras_formas_pagamento?: string | null
        }
        Update: {
          aceita_cartao_credito?: boolean | null
          aceita_debito?: boolean | null
          aceita_dinheiro?: boolean | null
          aceita_transferencia_bancaria?: boolean | null
          cartoes_aceitos?: string | null
          created_at?: string
          id_hotel?: number | null
          id_politica_pagamento?: number
          outras_formas_pagamento?: string | null
        }
        Relationships: []
      }
      politica_crianca: {
        Row: {
          custo_berco: number | null
          custo_cama_extra: number | null
          id_hotel: number
          id_politica_crianca: number
          limite_idade_gratuito: number | null
          max_bercos_quarto: number | null
          max_camas_extras_quarto: number | null
          politica_bebes_camas_extras: string | null
          politica_geral: string | null
        }
        Insert: {
          custo_berco?: number | null
          custo_cama_extra?: number | null
          id_hotel: number
          id_politica_crianca?: number
          limite_idade_gratuito?: number | null
          max_bercos_quarto?: number | null
          max_camas_extras_quarto?: number | null
          politica_bebes_camas_extras?: string | null
          politica_geral?: string | null
        }
        Update: {
          custo_berco?: number | null
          custo_cama_extra?: number | null
          id_hotel?: number
          id_politica_crianca?: number
          limite_idade_gratuito?: number | null
          max_bercos_quarto?: number | null
          max_camas_extras_quarto?: number | null
          politica_bebes_camas_extras?: string | null
          politica_geral?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "politica_crianca_id_hotel_fkey"
            columns: ["id_hotel"]
            isOneToOne: true
            referencedRelation: "hotel"
            referencedColumns: ["id_hotel"]
          },
        ]
      }
      politica_hotel: {
        Row: {
          aceita_dinheiro: boolean | null
          horario_checkin_fim: string | null
          horario_checkin_inicio: string | null
          horario_checkout: string
          id_hotel: number
          id_politica: number
          informacao_checkin: string | null
          observacao_pets: string | null
          outras_politicas: string | null
          permite_pets: boolean | null
          politica_cancelamento_prepagamento: string | null
          restricao_idade_checkin: string | null
        }
        Insert: {
          aceita_dinheiro?: boolean | null
          horario_checkin_fim?: string | null
          horario_checkin_inicio?: string | null
          horario_checkout: string
          id_hotel: number
          id_politica?: number
          informacao_checkin?: string | null
          observacao_pets?: string | null
          outras_politicas?: string | null
          permite_pets?: boolean | null
          politica_cancelamento_prepagamento?: string | null
          restricao_idade_checkin?: string | null
        }
        Update: {
          aceita_dinheiro?: boolean | null
          horario_checkin_fim?: string | null
          horario_checkin_inicio?: string | null
          horario_checkout?: string
          id_hotel?: number
          id_politica?: number
          informacao_checkin?: string | null
          observacao_pets?: string | null
          outras_politicas?: string | null
          permite_pets?: boolean | null
          politica_cancelamento_prepagamento?: string | null
          restricao_idade_checkin?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "politica_hotel_id_hotel_fkey"
            columns: ["id_hotel"]
            isOneToOne: true
            referencedRelation: "hotel"
            referencedColumns: ["id_hotel"]
          },
        ]
      }
      politica_pagamento: {
        Row: {
          aceita_cartao_credito: boolean | null
          aceita_debito: boolean | null
          aceita_dinheiro: boolean | null
          aceita_transferencia_bancaria: boolean | null
          cartoes_aceitos: string | null
          id_hotel: number
          id_politica_pagamento: number
          outras_formas_pagamento: string | null
        }
        Insert: {
          aceita_cartao_credito?: boolean | null
          aceita_debito?: boolean | null
          aceita_dinheiro?: boolean | null
          aceita_transferencia_bancaria?: boolean | null
          cartoes_aceitos?: string | null
          id_hotel: number
          id_politica_pagamento?: number
          outras_formas_pagamento?: string | null
        }
        Update: {
          aceita_cartao_credito?: boolean | null
          aceita_debito?: boolean | null
          aceita_dinheiro?: boolean | null
          aceita_transferencia_bancaria?: boolean | null
          cartoes_aceitos?: string | null
          id_hotel?: number
          id_politica_pagamento?: number
          outras_formas_pagamento?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "politica_pagamento_id_hotel_fkey"
            columns: ["id_hotel"]
            isOneToOne: true
            referencedRelation: "hotel"
            referencedColumns: ["id_hotel"]
          },
        ]
      }
      quarto: {
        Row: {
          capacidade_adultos: number | null
          capacidade_criancas: number | null
          descricao: string | null
          disponibilidade: boolean | null
          id_hotel: number
          id_quarto: number
          imagem_url: string | null
          preco_base: number
          tipo: string
        }
        Insert: {
          capacidade_adultos?: number | null
          capacidade_criancas?: number | null
          descricao?: string | null
          disponibilidade?: boolean | null
          id_hotel: number
          id_quarto?: number
          imagem_url?: string | null
          preco_base: number
          tipo: string
        }
        Update: {
          capacidade_adultos?: number | null
          capacidade_criancas?: number | null
          descricao?: string | null
          disponibilidade?: boolean | null
          id_hotel?: number
          id_quarto?: number
          imagem_url?: string | null
          preco_base?: number
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "quarto_id_hotel_fkey"
            columns: ["id_hotel"]
            isOneToOne: false
            referencedRelation: "hotel"
            referencedColumns: ["id_hotel"]
          },
        ]
      }
      Quarto: {
        Row: {
          capacidade_adultos: number | null
          capacidade_criancas: number | null
          created_at: string
          descricao: string | null
          disponibilidade: boolean | null
          id_hotel: number | null
          id_quarto: number
          imagem_url: string | null
          preco_base: string | null
          tipo: string | null
        }
        Insert: {
          capacidade_adultos?: number | null
          capacidade_criancas?: number | null
          created_at?: string
          descricao?: string | null
          disponibilidade?: boolean | null
          id_hotel?: number | null
          id_quarto?: number
          imagem_url?: string | null
          preco_base?: string | null
          tipo?: string | null
        }
        Update: {
          capacidade_adultos?: number | null
          capacidade_criancas?: number | null
          created_at?: string
          descricao?: string | null
          disponibilidade?: boolean | null
          id_hotel?: number | null
          id_quarto?: number
          imagem_url?: string | null
          preco_base?: string | null
          tipo?: string | null
        }
        Relationships: []
      }
      quarto_comodidade: {
        Row: {
          id_comodidade: number
          id_quarto: number
        }
        Insert: {
          id_comodidade: number
          id_quarto: number
        }
        Update: {
          id_comodidade?: number
          id_quarto?: number
        }
        Relationships: [
          {
            foreignKeyName: "quarto_comodidade_id_comodidade_fkey"
            columns: ["id_comodidade"]
            isOneToOne: false
            referencedRelation: "comodidade"
            referencedColumns: ["id_comodidade"]
          },
          {
            foreignKeyName: "quarto_comodidade_id_quarto_fkey"
            columns: ["id_quarto"]
            isOneToOne: false
            referencedRelation: "quarto"
            referencedColumns: ["id_quarto"]
          },
        ]
      }
      reserva: {
        Row: {
          data_checkin: string
          data_checkout: string
          data_criacao: string | null
          data_ultima_atualizacao: string | null
          id_cliente: number
          id_quarto: number
          id_reserva: number
          id_status: number | null
          numero_adultos: number | null
          numero_criancas: number | null
          observacoes: string | null
          pedido_especial: string | null
          preco_total: number | null
          status: string | null
        }
        Insert: {
          data_checkin: string
          data_checkout: string
          data_criacao?: string | null
          data_ultima_atualizacao?: string | null
          id_cliente: number
          id_quarto: number
          id_reserva?: number
          id_status?: number | null
          numero_adultos?: number | null
          numero_criancas?: number | null
          observacoes?: string | null
          pedido_especial?: string | null
          preco_total?: number | null
          status?: string | null
        }
        Update: {
          data_checkin?: string
          data_checkout?: string
          data_criacao?: string | null
          data_ultima_atualizacao?: string | null
          id_cliente?: number
          id_quarto?: number
          id_reserva?: number
          id_status?: number | null
          numero_adultos?: number | null
          numero_criancas?: number | null
          observacoes?: string | null
          pedido_especial?: string | null
          preco_total?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reserva_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "cliente"
            referencedColumns: ["id_cliente"]
          },
          {
            foreignKeyName: "reserva_id_quarto_fkey"
            columns: ["id_quarto"]
            isOneToOne: false
            referencedRelation: "quarto"
            referencedColumns: ["id_quarto"]
          },
          {
            foreignKeyName: "reserva_id_status_fkey"
            columns: ["id_status"]
            isOneToOne: false
            referencedRelation: "status_reserva"
            referencedColumns: ["id_status"]
          },
        ]
      }
      Reserva: {
        Row: {
          created_at: string
          data_checkin: string | null
          data_checkout: string | null
          data_criacao: string | null
          data_ultima_atualizacao: string | null
          id_cliente: number | null
          id_quarto: number | null
          id_reserva: number
          numero_adultos: number | null
          numero_criancas: number | null
          observacoes: string | null
          pedido_especial: string | null
          preco_total: number | null
          status: string | null
        }
        Insert: {
          created_at?: string
          data_checkin?: string | null
          data_checkout?: string | null
          data_criacao?: string | null
          data_ultima_atualizacao?: string | null
          id_cliente?: number | null
          id_quarto?: number | null
          id_reserva?: number
          numero_adultos?: number | null
          numero_criancas?: number | null
          observacoes?: string | null
          pedido_especial?: string | null
          preco_total?: number | null
          status?: string | null
        }
        Update: {
          created_at?: string
          data_checkin?: string | null
          data_checkout?: string | null
          data_criacao?: string | null
          data_ultima_atualizacao?: string | null
          id_cliente?: number | null
          id_quarto?: number | null
          id_reserva?: number
          numero_adultos?: number | null
          numero_criancas?: number | null
          observacoes?: string | null
          pedido_especial?: string | null
          preco_total?: number | null
          status?: string | null
        }
        Relationships: []
      }
      "Status Reserva": {
        Row: {
          created_at: string
          id_status: number
          nome_status: string | null
        }
        Insert: {
          created_at?: string
          id_status?: number
          nome_status?: string | null
        }
        Update: {
          created_at?: string
          id_status?: number
          nome_status?: string | null
        }
        Relationships: []
      }
      status_reserva: {
        Row: {
          id_status: number
          nome_status: string
        }
        Insert: {
          id_status?: number
          nome_status: string
        }
        Update: {
          id_status?: number
          nome_status?: string
        }
        Relationships: []
      }
      "Tabela de Ligação": {
        Row: {
          created_at: string
          id_comodidade: number | null
          id_quarto: number | null
          "id_quarto, id_comodidade": number
        }
        Insert: {
          created_at?: string
          id_comodidade?: number | null
          id_quarto?: number | null
          "id_quarto, id_comodidade"?: number
        }
        Update: {
          created_at?: string
          id_comodidade?: number | null
          id_quarto?: number | null
          "id_quarto, id_comodidade"?: number
        }
        Relationships: []
      }
      "Tabela de Ligação Hotel-Comodidade": {
        Row: {
          created_at: string
          id_comodidade: number | null
          id_hotel: number | null
          "id_hotel, id_comodidade": number
        }
        Insert: {
          created_at?: string
          id_comodidade?: number | null
          id_hotel?: number | null
          "id_hotel, id_comodidade"?: number
        }
        Update: {
          created_at?: string
          id_comodidade?: number | null
          id_hotel?: number | null
          "id_hotel, id_comodidade"?: number
        }
        Relationships: []
      }
      tarifa: {
        Row: {
          condicoes: string | null
          id_quarto: number
          id_tarifa: number
          inclui_cafe_da_manha: boolean | null
          nome_tarifa: string | null
          outros_servicos_incluidos: string | null
          periodo_fim: string | null
          periodo_inicio: string | null
          preco: number
        }
        Insert: {
          condicoes?: string | null
          id_quarto: number
          id_tarifa?: number
          inclui_cafe_da_manha?: boolean | null
          nome_tarifa?: string | null
          outros_servicos_incluidos?: string | null
          periodo_fim?: string | null
          periodo_inicio?: string | null
          preco: number
        }
        Update: {
          condicoes?: string | null
          id_quarto?: number
          id_tarifa?: number
          inclui_cafe_da_manha?: boolean | null
          nome_tarifa?: string | null
          outros_servicos_incluidos?: string | null
          periodo_fim?: string | null
          periodo_inicio?: string | null
          preco?: number
        }
        Relationships: [
          {
            foreignKeyName: "tarifa_id_quarto_fkey"
            columns: ["id_quarto"]
            isOneToOne: false
            referencedRelation: "quarto"
            referencedColumns: ["id_quarto"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
