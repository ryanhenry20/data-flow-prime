'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface AnalyticsMetric {
    id: string;
    metric_name: string;
    value: string | number;
    dimensions: Record<string, any>;
    timestamp: string;
}

interface AIInsight {
    id: string;
    type: string;
    title: string;
    description: string;
    confidence: number;
    impact_level: string;
    created_at: string;
}

// Helper function to safely parse numeric values
const parseNumericValue = (value: string | number): number => {
    if (typeof value === 'number') return value;
    const parsed = parseFloat(value.toString());
    return isNaN(parsed) ? 0 : parsed;
};

// Hook for fetching KPI metrics
export function useKPIMetrics() {
    const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchKPIMetrics() {
            try {
                const { data, error } = await supabase
                    .from('analytics_metrics')
                    .select('*')
                    .in('metric_name', [
                        'active_users',
                        'conversion_rate',
                        'avg_session_duration',
                        'live_users',
                    ])
                    .order('timestamp', { ascending: false });

                if (error) throw error;

                setMetrics(data || []);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : 'An error occurred'
                );
            } finally {
                setLoading(false);
            }
        }

        fetchKPIMetrics();
    }, []);

    return { metrics, loading, error };
}

// Hook for fetching revenue data
export function useRevenueData() {
    const [revenueData, setRevenueData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchRevenueData() {
            try {
                const { data, error } = await supabase
                    .from('analytics_metrics')
                    .select('*')
                    .eq('metric_name', 'total_revenue')
                    .order('timestamp', { ascending: true });

                if (error) throw error;

                // Transform data for charts with proper number parsing
                const chartData =
                    data?.map((item) => ({
                        name:
                            item.dimensions?.period?.split(' ')[0] || 'Unknown',
                        value: parseNumericValue(item.value),
                    })) || [];

                setRevenueData(chartData);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : 'An error occurred'
                );
            } finally {
                setLoading(false);
            }
        }

        fetchRevenueData();
    }, []);

    return { revenueData, loading, error };
}

// Hook for fetching AI insights
export function useAIInsights() {
    const [insights, setInsights] = useState<AIInsight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAIInsights() {
            try {
                const { data, error } = await supabase
                    .from('ai_insights')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(10);

                if (error) throw error;
                setInsights(data || []);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : 'An error occurred'
                );
            } finally {
                setLoading(false);
            }
        }

        fetchAIInsights();

        // Set up real-time subscription
        const subscription = supabase
            .channel('ai_insights_changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'ai_insights' },
                () => {
                    fetchAIInsights();
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { insights, loading, error };
}

// Hook for fetching real-time metrics
export function useRealtimeMetrics() {
    const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchRealtimeMetrics() {
            try {
                const { data, error } = await supabase
                    .from('analytics_metrics')
                    .select('*')
                    .in('metric_name', ['live_users', 'live_page_views'])
                    .order('timestamp', { ascending: false });

                if (error) throw error;

                setMetrics(data || []);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : 'An error occurred'
                );
            } finally {
                setLoading(false);
            }
        }

        fetchRealtimeMetrics();

        // Set up real-time subscription for live metrics
        const subscription = supabase
            .channel('realtime_metrics')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'analytics_metrics' },
                () => {
                    fetchRealtimeMetrics();
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { metrics, loading, error };
}

// Generic hook for fetching chart data
export function useChartData(
    metricName: string,
    transformFn?: (data: AnalyticsMetric[]) => any[]
) {
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchChartData() {
            try {
                const { data, error } = await supabase
                    .from('analytics_metrics')
                    .select('*')
                    .eq('metric_name', metricName)
                    .order('timestamp', { ascending: true });

                if (error) throw error;

                let transformedData = data || [];
                if (transformFn) {
                    transformedData = transformFn(data || []);
                }

                setChartData(transformedData);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : 'An error occurred'
                );
            } finally {
                setLoading(false);
            }
        }

        fetchChartData();
    }, [metricName, transformFn]);

    return { chartData, loading, error };
}

// Export the helper function for use in other components
export { parseNumericValue };
