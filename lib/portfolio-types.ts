export interface AnalyticsMetric {
    id: string;
    metric_name: string;
    value: number | string;
    dimensions: Record<string, any>;
    timestamp: string;
}

export interface AIInsight {
    id: string;
    type: string;
    title: string;
    description: string;
    confidence: number;
    impact_level: 'Low' | 'Medium' | 'High';
    created_at: string;
}

export interface UserProfile {
    id: string;
    email: string;
    full_name: string;
    avatar_url?: string;
    created_at: string;
}

export interface AnalyticsEvent {
    id: string;
    user_id: string;
    event_type: string;
    properties: Record<string, any>;
    timestamp: string;
    session_id?: string;
    user_agent?: string;
    ip_address?: string;
    page_url?: string;
    referrer?: string;
}

export interface EnrichedAnalyticsEvent extends AnalyticsEvent {
    user?: UserProfile;
}

export interface AggregatedUserMetric {
    user_id: string;
    user_profiles: UserProfile;
    total_sessions: number;
    avg_session_duration: number;
    page_views: number;
    conversion_rate: number;
    last_active: string;
    engagement_score: number;
    user_segment: 'high' | 'medium' | 'low';
}

export interface PredictionPoint {
    period: string;
    actual: number;
    forecast: number;
}

export interface PredictionModel {
    id: string;
    metric: string;
    current_value: number;
    projected_value: number;
    projected_change: number;
    confidence: number;
    horizon: string;
    recommendation: string;
    points: PredictionPoint[];
}

export interface SmartAlert {
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    status: 'open' | 'acknowledged' | 'resolved';
    source: string;
    created_at: string;
    recommendation: string;
    affected_metric?: string;
}

export interface CalendarEntry {
    id: string;
    title: string;
    type: 'report' | 'meeting' | 'experiment' | 'release';
    owner: string;
    date: string;
    start_time: string;
    end_time: string;
    attendees: number;
    status: 'scheduled' | 'in_progress' | 'completed';
}

export interface SearchResultItem {
    id: string;
    type: 'user' | 'event' | 'insight' | 'alert' | 'prediction';
    title: string;
    subtitle: string;
    route: string;
    metadata?: string;
}
