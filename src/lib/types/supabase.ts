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
      leads: {
        Row: {
          id: string
          name: string
          company_name: string | null
          email: string
          phone: string | null
          service_interested: string | null
          status: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          company_name?: string | null
          email: string
          phone?: string | null
          service_interested?: string | null
          status?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          company_name?: string | null
          email?: string
          phone?: string | null
          service_interested?: string | null
          status?: string
          notes?: string | null
          created_at?: string
        }
      }
      demo_bookings: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          booking_date: string
          booking_time: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          booking_date: string
          booking_time: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          booking_date?: string
          booking_time?: string
          status?: string
          created_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          company: string
          contact: string
          email: string
          phone: string | null
          service: string
          plan: string
          mrr: number
          contract_date: string
          created_at: string
        }
        Insert: {
          id?: string
          company: string
          contact: string
          email: string
          phone?: string | null
          service: string
          plan: string
          mrr: number
          contract_date: string
          created_at?: string
        }
        Update: {
          id?: string
          company?: string
          contact?: string
          email?: string
          phone?: string | null
          service?: string
          plan?: string
          mrr?: number
          contract_date?: string
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          client_name: string
          amount: number
          payment_date: string
          due_date: string
          method: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          client_name: string
          amount: number
          payment_date: string
          due_date: string
          method: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          amount?: number
          payment_date?: string
          due_date?: string
          method?: string
          status?: string
          created_at?: string
        }
      }
      case_studies: {
        Row: {
          id: string
          title: string
          slug: string
          industry: string | null
          problem: string | null
          solution: string | null
          results: Json | null
          featured_image: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          industry?: string | null
          problem?: string | null
          solution?: string | null
          results?: Json | null
          featured_image?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          industry?: string | null
          problem?: string | null
          solution?: string | null
          results?: Json | null
          featured_image?: string | null
          status?: string
          created_at?: string
        }
      }
      pricing_plans: {
        Row: {
          id: string
          plan_name: string
          description: string | null
          badge_text: string | null
          monthly_price: number | null
          yearly_price: number | null
          setup_fee: string | null
          cta_text: string | null
          popular: boolean | null
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          plan_name: string
          description?: string | null
          badge_text?: string | null
          monthly_price?: number | null
          yearly_price?: number | null
          setup_fee?: string | null
          cta_text?: string | null
          popular?: boolean | null
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          plan_name?: string
          description?: string | null
          badge_text?: string | null
          monthly_price?: number | null
          yearly_price?: number | null
          setup_fee?: string | null
          cta_text?: string | null
          popular?: boolean | null
          display_order?: number | null
          created_at?: string
        }
      }
      pricing_features: {
        Row: {
          id: string
          plan_id: string
          feature_text: string
          is_included: boolean | null
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          plan_id: string
          feature_text: string
          is_included?: boolean | null
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          plan_id?: string
          feature_text?: string
          is_included?: boolean | null
          display_order?: number | null
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          icon_name: string | null
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          icon_name?: string | null
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          icon_name?: string | null
          display_order?: number | null
          created_at?: string
        }
      }
      use_cases: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          bg_color: string | null
          visual_color: string | null
          display_order: number | null
          is_published: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          bg_color?: string | null
          visual_color?: string | null
          display_order?: number | null
          is_published?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          bg_color?: string | null
          visual_color?: string | null
          display_order?: number | null
          is_published?: boolean | null
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          author_name: string
          author_title: string | null
          company: string | null
          content: string
          rating: number | null
          avatar_url: string | null
          is_featured: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          author_name: string
          author_title?: string | null
          company?: string | null
          content: string
          rating?: number | null
          avatar_url?: string | null
          is_featured?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          author_name?: string
          author_title?: string | null
          company?: string | null
          content?: string
          rating?: number | null
          avatar_url?: string | null
          is_featured?: boolean | null
          created_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          display_order?: number | null
          created_at?: string
        }
      }
      whatsapp_chats: {
        Row: {
          id: string
          lead_id: string | null
          phone_number: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lead_id?: string | null
          phone_number: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lead_id?: string | null
          phone_number?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      whatsapp_messages: {
        Row: {
          id: string
          chat_id: string
          sender_type: string
          content: string
          meta_message_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          sender_type: string
          content: string
          meta_message_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          sender_type?: string
          content?: string
          meta_message_id?: string | null
          created_at?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
