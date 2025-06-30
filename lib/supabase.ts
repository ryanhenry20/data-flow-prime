import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
    realtime: {
        params: {
            eventsPerSecond: 10,
        },
    },
});

// Database types will be generated here later
export type Database = {
    public: {
        Tables: {
            analytics_events: {
                Row: {
                    id: string;
                    user_id: string | null;
                    event_type: string;
                    properties: Record<string, any>;
                    timestamp: string;
                };
                Insert: {
                    id?: string;
                    user_id?: string | null;
                    event_type: string;
                    properties: Record<string, any>;
                    timestamp?: string;
                };
                Update: {
                    id?: string;
                    user_id?: string | null;
                    event_type?: string;
                    properties?: Record<string, any>;
                    timestamp?: string;
                };
            };
            analytics_metrics: {
                Row: {
                    id: string;
                    metric_name: string;
                    value: number;
                    dimensions: Record<string, any>;
                    timestamp: string;
                };
                Insert: {
                    id?: string;
                    metric_name: string;
                    value: number;
                    dimensions: Record<string, any>;
                    timestamp?: string;
                };
                Update: {
                    id?: string;
                    metric_name?: string;
                    value?: number;
                    dimensions?: Record<string, any>;
                    timestamp?: string;
                };
            };
            ai_insights: {
                Row: {
                    id: string;
                    type: string;
                    title: string;
                    description: string;
                    confidence: number;
                    impact_level: string;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    type: string;
                    title: string;
                    description: string;
                    confidence: number;
                    impact_level: string;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    type?: string;
                    title?: string;
                    description?: string;
                    confidence?: number;
                    impact_level?: string;
                    created_at?: string;
                };
            };
            user_profiles: {
                Row: {
                    id: string;
                    dashboard_layout: Record<string, any> | null;
                    preferences: Record<string, any> | null;
                    created_at: string;
                };
                Insert: {
                    id: string;
                    dashboard_layout?: Record<string, any> | null;
                    preferences?: Record<string, any> | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    dashboard_layout?: Record<string, any> | null;
                    preferences?: Record<string, any> | null;
                    created_at?: string;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
    };
};
