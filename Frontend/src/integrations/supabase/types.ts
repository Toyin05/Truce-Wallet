export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      presale_participations: {
        Row: {
          amount_invested: number
          claimed_amount: number | null
          created_at: string | null
          id: string
          payment_token: string
          presale_id: string
          presale_name: string
          token_name: string
          tokens_received: number
          user_id: string | null
          vesting_schedule: Json | null
        }
        Insert: {
          amount_invested: number
          claimed_amount?: number | null
          created_at?: string | null
          id?: string
          payment_token: string
          presale_id: string
          presale_name: string
          token_name: string
          tokens_received: number
          user_id?: string | null
          vesting_schedule?: Json | null
        }
        Update: {
          amount_invested?: number
          claimed_amount?: number | null
          created_at?: string | null
          id?: string
          payment_token?: string
          presale_id?: string
          presale_name?: string
          token_name?: string
          tokens_received?: number
          user_id?: string | null
          vesting_schedule?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "presale_participations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          biometric_enabled: boolean | null
          created_at: string | null
          full_name: string | null
          id: string
          security_score: number | null
          two_factor_enabled: boolean | null
          updated_at: string | null
          wallet_address: string | null
        }
        Insert: {
          biometric_enabled?: boolean | null
          created_at?: string | null
          full_name?: string | null
          id: string
          security_score?: number | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Update: {
          biometric_enabled?: boolean | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          security_score?: number | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      security_activity: {
        Row: {
          activity_type: string
          created_at: string | null
          description: string
          device_info: string | null
          id: string
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          description: string
          device_info?: string | null
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          description?: string
          device_info?: string | null
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      staking_positions: {
        Row: {
          amount: number
          apy: number
          created_at: string | null
          id: string
          pool_id: string
          pool_name: string
          rewards_earned: number | null
          start_date: string | null
          status: string
          token: string
          unlock_date: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          apy: number
          created_at?: string | null
          id?: string
          pool_id: string
          pool_name: string
          rewards_earned?: number | null
          start_date?: string | null
          status?: string
          token: string
          unlock_date?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          apy?: number
          created_at?: string | null
          id?: string
          pool_id?: string
          pool_name?: string
          rewards_earned?: number | null
          start_date?: string | null
          status?: string
          token?: string
          unlock_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staking_positions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          chain: string
          created_at: string | null
          from_address: string | null
          gas_used: number | null
          id: string
          status: string
          to_address: string | null
          token: string
          tx_hash: string | null
          type: string
          usd_value: number | null
          user_id: string | null
        }
        Insert: {
          amount: number
          chain: string
          created_at?: string | null
          from_address?: string | null
          gas_used?: number | null
          id?: string
          status?: string
          to_address?: string | null
          token: string
          tx_hash?: string | null
          type: string
          usd_value?: number | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          chain?: string
          created_at?: string | null
          from_address?: string | null
          gas_used?: number | null
          id?: string
          status?: string
          to_address?: string | null
          token?: string
          tx_hash?: string | null
          type?: string
          usd_value?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][CompositeTypeName]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const