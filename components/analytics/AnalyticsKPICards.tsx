'use client';

import * as React from 'react';
import { DateRange } from 'react-day-picker';
import {
    Users,
    Activity,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Eye,
    MousePointer,
    Clock,
    Target,
} from 'lucide-react';
import { useKPIMetrics } from '@/hooks/useAnalytics';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface AnalyticsFilters {
    eventTypes: string[];
    userSegments: string[];
    sources: string[];
}

interface AnalyticsKPICardsProps {
    dateRange: DateRange;
    filters: AnalyticsFilters;
}

interface KPIMetric {
    id: string;
    title: string;
    value: string | number;
    change: number;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: React.ReactNode;
    description: string;
    trend: number[];
}

export function AnalyticsKPICards({
    dateRange,
    filters,
}: AnalyticsKPICardsProps) {
    const [kpiData, setKpiData] = React.useState<KPIMetric[]>([]);
    const [loading, setLoading] = React.useState(true);
    const { metrics: kpiMetrics, loading: analyticsLoading } = useKPIMetrics();

    React.useEffect(() => {
        fetchKPIData();
    }, [dateRange, filters]);

    const fetchKPIData = async () => {
        setLoading(true);

        // Simulate API call with filtering
        setTimeout(() => {
            const mockKPIData: KPIMetric[] = [
                {
                    id: 'active_users',
                    title: 'Active Users',
                    value:
                        kpiMetrics?.find(
                            (m) => m.metric_name === 'active_users'
                        )?.value || 8549,
                    change: 12.5,
                    changeType: 'positive',
                    icon: <Users className="h-4 w-4" />,
                    description: 'Total active users in selected period',
                    trend: [65, 78, 82, 89, 95, 102, 110],
                },
                {
                    id: 'page_views',
                    title: 'Page Views',
                    value: '847K',
                    change: 8.2,
                    changeType: 'positive',
                    icon: <Eye className="h-4 w-4" />,
                    description: 'Total page views across all pages',
                    trend: [45, 52, 58, 61, 67, 73, 78],
                },
                {
                    id: 'conversion_rate',
                    title: 'Conversion Rate',
                    value: `${
                        kpiMetrics?.find(
                            (m) => m.metric_name === 'conversion_rate'
                        )?.value || 3.24
                    }%`,
                    change: -2.1,
                    changeType: 'negative',
                    icon: <Target className="h-4 w-4" />,
                    description: 'Percentage of visitors who convert',
                    trend: [3.8, 3.6, 3.4, 3.2, 3.0, 3.1, 3.24],
                },
                {
                    id: 'avg_session',
                    title: 'Avg. Session Duration',
                    value:
                        kpiMetrics?.find(
                            (m) => m.metric_name === 'avg_session_duration'
                        )?.value || '4m 32s',
                    change: 15.7,
                    changeType: 'positive',
                    icon: <Clock className="h-4 w-4" />,
                    description: 'Average time users spend on site',
                    trend: [240, 255, 268, 275, 282, 288, 295],
                },
                {
                    id: 'bounce_rate',
                    title: 'Bounce Rate',
                    value: '34.2%',
                    change: -5.3,
                    changeType: 'positive',
                    icon: <Activity className="h-4 w-4" />,
                    description: 'Percentage of single-page sessions',
                    trend: [42, 40, 38, 36, 35, 34.5, 34.2],
                },
                {
                    id: 'revenue',
                    title: 'Revenue',
                    value: '$12,847',
                    change: 23.8,
                    changeType: 'positive',
                    icon: <DollarSign className="h-4 w-4" />,
                    description: 'Total revenue generated',
                    trend: [8500, 9200, 9800, 10500, 11200, 11800, 12847],
                },
                {
                    id: 'click_through_rate',
                    title: 'Click-through Rate',
                    value: '2.87%',
                    change: 4.1,
                    changeType: 'positive',
                    icon: <MousePointer className="h-4 w-4" />,
                    description: 'CTR across all campaigns',
                    trend: [2.1, 2.3, 2.5, 2.6, 2.7, 2.8, 2.87],
                },
                {
                    id: 'new_users',
                    title: 'New Users',
                    value: '1,247',
                    change: 18.9,
                    changeType: 'positive',
                    icon: <TrendingUp className="h-4 w-4" />,
                    description: 'First-time visitors',
                    trend: [850, 920, 980, 1050, 1120, 1180, 1247],
                },
            ];

            // Apply filters to mock data (in real implementation, this would be done on the backend)
            let filteredData = mockKPIData;

            if (filters.eventTypes.length > 0) {
                // Simulate filtering effect
                filteredData = filteredData.map((metric) => ({
                    ...metric,
                    value:
                        typeof metric.value === 'string'
                            ? metric.value
                            : Math.floor(Number(metric.value) * 0.8), // Reduce by 20% when filtered
                }));
            }

            setKpiData(filteredData);
            setLoading(false);
        }, 800);
    };

    const formatTrendIcon = (
        changeType: 'positive' | 'negative' | 'neutral'
    ) => {
        switch (changeType) {
            case 'positive':
                return <TrendingUp className="h-3 w-3 text-green-500" />;
            case 'negative':
                return <TrendingDown className="h-3 w-3 text-red-500" />;
            default:
                return <Activity className="h-3 w-3 text-gray-500" />;
        }
    };

    const formatChange = (
        change: number,
        changeType: 'positive' | 'negative' | 'neutral'
    ) => {
        const sign = change > 0 ? '+' : '';
        const colorClass =
            changeType === 'positive'
                ? 'text-green-600 dark:text-green-400'
                : changeType === 'negative'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-400';

        return (
            <span
                className={`text-xs font-medium ${colorClass} flex items-center gap-1`}>
                {formatTrendIcon(changeType)}
                {sign}
                {change.toFixed(1)}%
            </span>
        );
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16 mb-2" />
                            <Skeleton className="h-3 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Filters Applied Badge */}
            {(filters.eventTypes.length > 0 ||
                filters.userSegments.length > 0 ||
                filters.sources.length > 0) && (
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                        Filtered Data Applied
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                        {filters.eventTypes.length +
                            filters.userSegments.length +
                            filters.sources.length}{' '}
                        filters active
                    </span>
                </div>
            )}

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiData.map((metric) => (
                    <Card
                        key={metric.id}
                        className="hover:shadow-md transition-shadow duration-200 cursor-pointer group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {metric.title}
                            </CardTitle>
                            <div className="text-muted-foreground group-hover:text-primary transition-colors">
                                {metric.icon}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline justify-between">
                                <div className="text-2xl font-bold">
                                    {metric.value}
                                </div>
                                {formatChange(metric.change, metric.changeType)}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {metric.description}
                            </p>

                            {/* Mini trend chart placeholder */}
                            <div className="mt-3 h-8 flex items-end justify-between gap-1">
                                {metric.trend.map((value, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 rounded-sm ${
                                            metric.changeType === 'positive'
                                                ? 'bg-green-200 dark:bg-green-800'
                                                : metric.changeType ===
                                                  'negative'
                                                ? 'bg-red-200 dark:bg-red-800'
                                                : 'bg-gray-200 dark:bg-gray-800'
                                        }`}
                                        style={{
                                            height: `${
                                                (value /
                                                    Math.max(...metric.trend)) *
                                                100
                                            }%`,
                                            minHeight: '2px',
                                        }}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Period Information */}
            <div className="text-center text-xs text-muted-foreground">
                Data for {dateRange?.from?.toLocaleDateString()} -{' '}
                {dateRange?.to?.toLocaleDateString()}
                {(filters.eventTypes.length > 0 ||
                    filters.userSegments.length > 0 ||
                    filters.sources.length > 0) &&
                    ' • Filtered results'}
            </div>
        </div>
    );
}
