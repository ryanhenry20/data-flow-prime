import type {
    AggregatedUserMetric,
    AIInsight,
    AnalyticsEvent,
    AnalyticsMetric,
    CalendarEntry,
    EnrichedAnalyticsEvent,
    PredictionModel,
    SearchResultItem,
    SmartAlert,
} from '@/lib/portfolio-types';

async function requestJSON<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers || {}),
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Request failed with ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export const portfolioClient = {
    getKPIMetrics: () =>
        requestJSON<AnalyticsMetric[]>('/api/portfolio/kpi'),
    getRevenueMetrics: () =>
        requestJSON<AnalyticsMetric[]>('/api/portfolio/revenue'),
    getAIInsights: () =>
        requestJSON<AIInsight[]>('/api/portfolio/insights'),
    getRealtimeMetrics: () =>
        requestJSON<AnalyticsMetric[]>('/api/portfolio/realtime'),
    getChartMetrics: (metricName: string) =>
        requestJSON<AnalyticsMetric[]>(
            `/api/portfolio/chart?metric=${encodeURIComponent(metricName)}`
        ),
    getEvents: (limit: number = 100) =>
        requestJSON<EnrichedAnalyticsEvent[]>(
            `/api/portfolio/events?limit=${limit}`
        ),
    deleteEvent: (eventId: string) =>
        requestJSON<{ ok: true }>(`/api/portfolio/events/${eventId}`, {
            method: 'DELETE',
        }),
    updateEvent: (
        eventId: string,
        payload: Partial<
            Pick<AnalyticsEvent, 'event_type' | 'page_url' | 'session_id'> & {
                properties: Record<string, any>;
            }
        >
    ) =>
        requestJSON<AnalyticsEvent | null>(`/api/portfolio/events/${eventId}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
        }),
    getUserMetrics: (limit: number = 100) =>
        requestJSON<AggregatedUserMetric[]>(
            `/api/portfolio/users-metrics?limit=${limit}`
        ),
    getPredictions: () =>
        requestJSON<PredictionModel[]>('/api/portfolio/predictions'),
    getAlerts: () =>
        requestJSON<SmartAlert[]>('/api/portfolio/alerts'),
    updateAlertStatus: (alertId: string, status: SmartAlert['status']) =>
        requestJSON<SmartAlert | null>(`/api/portfolio/alerts/${alertId}`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        }),
    getCalendarEntries: () =>
        requestJSON<CalendarEntry[]>('/api/portfolio/calendar'),
    createCalendarEntry: (
        payload: Omit<CalendarEntry, 'id' | 'status'>
    ) =>
        requestJSON<CalendarEntry>('/api/portfolio/calendar', {
            method: 'POST',
            body: JSON.stringify(payload),
        }),
    search: (query: string) =>
        requestJSON<SearchResultItem[]>(
            `/api/portfolio/search?q=${encodeURIComponent(query)}`
        ),
};
