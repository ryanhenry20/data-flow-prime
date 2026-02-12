'use client';

import { useEffect, useState } from 'react';
import { handleApiError } from '@/lib/error-handler';
import { portfolioClient } from '@/lib/portfolio-client';
import type { AIInsight, AnalyticsMetric } from '@/lib/portfolio-types';

// Helper function to safely parse numeric values
const parseNumericValue = (value: string | number): number => {
    if (typeof value === 'number') return value;
    const parsed = parseFloat(value.toString());
    return Number.isNaN(parsed) ? 0 : parsed;
};

// Hook for fetching KPI metrics
export function useKPIMetrics() {
    const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchKPIMetrics() {
            try {
                const data = await portfolioClient.getKPIMetrics();
                const filtered = data.filter((metric) =>
                    [
                        'active_users',
                        'conversion_rate',
                        'avg_session_duration',
                        'live_users',
                    ].includes(metric.metric_name)
                );
                setMetrics(filtered);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                handleApiError(err, 'fetch KPI metrics');
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
                const data = await portfolioClient.getRevenueMetrics();

                const chartData =
                    data?.map((item) => ({
                        name:
                            item.dimensions?.period?.split(' ')[0] || 'Unknown',
                        value: parseNumericValue(item.value),
                    })) || [];

                setRevenueData(chartData);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                handleApiError(err, 'fetch revenue data');
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
        let intervalId: ReturnType<typeof setInterval> | undefined;

        async function fetchAIInsights() {
            try {
                const data = await portfolioClient.getAIInsights();
                setInsights(data || []);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                handleApiError(err, 'fetch AI insights');
            } finally {
                setLoading(false);
            }
        }

        fetchAIInsights();
        intervalId = setInterval(fetchAIInsights, 12000);

        return () => {
            if (intervalId) clearInterval(intervalId);
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
        let intervalId: ReturnType<typeof setInterval> | undefined;

        async function fetchRealtimeMetrics() {
            try {
                const data = await portfolioClient.getRealtimeMetrics();
                setMetrics(data || []);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                handleApiError(err, 'fetch realtime metrics');
            } finally {
                setLoading(false);
            }
        }

        fetchRealtimeMetrics();
        intervalId = setInterval(fetchRealtimeMetrics, 7000);

        return () => {
            if (intervalId) clearInterval(intervalId);
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
                const data = await portfolioClient.getChartMetrics(metricName);

                let transformedData: any[] = data || [];
                if (transformFn) {
                    transformedData = transformFn(data || []);
                }

                setChartData(transformedData);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                handleApiError(err, `fetch ${metricName} chart data`);
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
