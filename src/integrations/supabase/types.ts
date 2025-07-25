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
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          type: Database["public"]["Enums"]["discovery_item_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          type: Database["public"]["Enums"]["discovery_item_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["discovery_item_type"]
        }
        Relationships: []
      }
      deliveries: {
        Row: {
          address: string
          cid: string
          created_at: string
          date: string
          dc_amt: number
          dc_mode: string
          id: string
          mobile: string
          mode: string
          name: string
          note: string | null
          pb_amt: number
          pb_mode: string
          status: string
          status_date: string | null
          team_id: string | null
          tsb: number | null
          updated_at: string
          vendor_id: string | null
        }
        Insert: {
          address: string
          cid: string
          created_at?: string
          date?: string
          dc_amt?: number
          dc_mode: string
          id?: string
          mobile: string
          mode: string
          name: string
          note?: string | null
          pb_amt?: number
          pb_mode: string
          status?: string
          status_date?: string | null
          team_id?: string | null
          tsb?: number | null
          updated_at?: string
          vendor_id?: string | null
        }
        Update: {
          address?: string
          cid?: string
          created_at?: string
          date?: string
          dc_amt?: number
          dc_mode?: string
          id?: string
          mobile?: string
          mode?: string
          name?: string
          note?: string | null
          pb_amt?: number
          pb_mode?: string
          status?: string
          status_date?: string | null
          team_id?: string | null
          tsb?: number | null
          updated_at?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      discovery_items: {
        Row: {
          address: string | null
          category_id: string | null
          contact_info: Json | null
          created_at: string
          created_by: string | null
          description: string | null
          event_date: string | null
          event_time: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          logo_url: string | null
          name: string
          tags: string[] | null
          type: Database["public"]["Enums"]["discovery_item_type"]
          updated_at: string
        }
        Insert: {
          address?: string | null
          category_id?: string | null
          contact_info?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string | null
          event_time?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          logo_url?: string | null
          name: string
          tags?: string[] | null
          type: Database["public"]["Enums"]["discovery_item_type"]
          updated_at?: string
        }
        Update: {
          address?: string | null
          category_id?: string | null
          contact_info?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string | null
          event_time?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          logo_url?: string | null
          name?: string
          tags?: string[] | null
          type?: Database["public"]["Enums"]["discovery_item_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "discovery_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string
          event_date: string
          id: string
          image_url: string | null
          is_featured: boolean
          location: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          event_date: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          location: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          event_date?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          location?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      form_fields: {
        Row: {
          created_at: string
          display_order: number
          event_id: string
          field_label: string
          field_name: string
          field_options: Json | null
          field_type: string
          id: string
          is_required: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          event_id: string
          field_label: string
          field_name: string
          field_options?: Json | null
          field_type: string
          id?: string
          is_required?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          event_id?: string
          field_label?: string
          field_name?: string
          field_options?: Json | null
          field_type?: string
          id?: string
          is_required?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_fields_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      mental_maths_applications: {
        Row: {
          aadhaar_back_url: string
          aadhaar_front_url: string
          aadhaar_number: string
          address: string
          applicant_name: string
          class: string
          created_at: string | null
          date_of_birth: string
          exam_centre: string | null
          exam_date: string | null
          exam_time: string | null
          father_name: string
          form_no: string
          gender: string
          id: string
          institute_name: string | null
          mobile_number: string
          mother_name: string
          payment_screenshot_url: string
          payment_verified: boolean | null
          photo_url: string
          roll_number: string | null
          updated_at: string | null
        }
        Insert: {
          aadhaar_back_url: string
          aadhaar_front_url: string
          aadhaar_number: string
          address: string
          applicant_name: string
          class: string
          created_at?: string | null
          date_of_birth: string
          exam_centre?: string | null
          exam_date?: string | null
          exam_time?: string | null
          father_name: string
          form_no: string
          gender: string
          id?: string
          institute_name?: string | null
          mobile_number: string
          mother_name: string
          payment_screenshot_url: string
          payment_verified?: boolean | null
          photo_url: string
          roll_number?: string | null
          updated_at?: string | null
        }
        Update: {
          aadhaar_back_url?: string
          aadhaar_front_url?: string
          aadhaar_number?: string
          address?: string
          applicant_name?: string
          class?: string
          created_at?: string | null
          date_of_birth?: string
          exam_centre?: string | null
          exam_date?: string | null
          exam_time?: string | null
          father_name?: string
          form_no?: string
          gender?: string
          id?: string
          institute_name?: string | null
          mobile_number?: string
          mother_name?: string
          payment_screenshot_url?: string
          payment_verified?: boolean | null
          photo_url?: string
          roll_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      inquiries: {
  Row: {
    id: string
    full_name: string
    email: string
    address: string
    business_name: string
    message: string
    business_product_or_service: string
    how_did_you_hear: string
    has_domain: string | null
    event_id: string
    phone: string | null
    organization: string | null
    user_id: string | null
    additional_info: Json | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    full_name: string
    email: string
    message: string
    event_id: string
    phone?: string | null
    organization?: string | null
    user_id?: string | null
    additional_info?: Json | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    full_name?: string
    email?: string
    message?: string
    event_id?: string
    phone?: string | null
    organization?: string | null
    user_id?: string | null
    additional_info?: Json | null
    created_at?: string
    updated_at?: string
  }
  Relationships: [
    {
      foreignKeyName: "inquiries_event_id_fkey"
      columns: ["event_id"]
      isOneToOne: false
      referencedRelation: "events"
      referencedColumns: ["id"]
    }
  ]
}

      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          additional_info: Json | null
          created_at: string
          email: string
          event_id: string
          full_name: string
          id: string
          organization: string | null
          phone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          additional_info?: Json | null
          created_at?: string
          email: string
          event_id: string
          full_name: string
          id?: string
          organization?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          additional_info?: Json | null
          created_at?: string
          email?: string
          event_id?: string
          full_name?: string
          id?: string
          organization?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      result: {
        Row: {
          class: string | null
          created_at: string | null
          id: string
          mark: string
          name: string
          roll_number: string
        }
        Insert: {
          class?: string | null
          created_at?: string | null
          id?: string
          mark: string
          name: string
          roll_number: string
        }
        Update: {
          class?: string | null
          created_at?: string | null
          id?: string
          mark?: string
          name?: string
          roll_number?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          discovery_item_id: string
          id: string
          is_anonymous: boolean | null
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          discovery_item_id: string
          id?: string
          is_anonymous?: boolean | null
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          discovery_item_id?: string
          id?: string
          is_anonymous?: boolean | null
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_discovery_item_id_fkey"
            columns: ["discovery_item_id"]
            isOneToOne: false
            referencedRelation: "discovery_items"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          team_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          team_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          team_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_competition_form_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_all_events: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          description: string
          event_date: string
          id: string
          image_url: string | null
          is_featured: boolean
          location: string
          title: string
          updated_at: string
        }[]
      }
      get_all_registrations: {
        Args: Record<PropertyKey, never>
        Returns: {
          additional_info: Json | null
          created_at: string
          email: string
          event_id: string
          full_name: string
          id: string
          organization: string | null
          phone: string | null
          updated_at: string
          user_id: string | null
        }[]
      }
      get_featured_events: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          description: string
          event_date: string
          id: string
          image_url: string | null
          is_featured: boolean
          location: string
          title: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      discovery_item_type: "event" | "place" | "business"
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
    Enums: {
      discovery_item_type: ["event", "place", "business"],
    },
  },
} as const
