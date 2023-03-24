export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      quiz_attempt: {
        Row: {
          created_by: string
          id: number
          inserted_at: string
        }
        Insert: {
          created_by: string
          id?: number
          inserted_at?: string
        }
        Update: {
          created_by?: string
          id?: number
          inserted_at?: string
        }
      }
      quiz_entry: {
        Row: {
          attempt_id: number
          process: string
          sequence: number
        }
        Insert: {
          attempt_id: number
          process: string
          sequence: number
        }
        Update: {
          attempt_id?: number
          process?: string
          sequence?: number
        }
      }
      users: {
        Row: {
          design_field: string
          id: string
          status: Database["public"]["Enums"]["user_status"] | null
          username: string | null
        }
        Insert: {
          design_field: string
          id: string
          status?: Database["public"]["Enums"]["user_status"] | null
          username?: string | null
        }
        Update: {
          design_field?: string
          id?: string
          status?: Database["public"]["Enums"]["user_status"] | null
          username?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_status: "ONLINE" | "OFFLINE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

