'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Activity,
    Users,
    Eye,
    TrendingUp,
    TrendingDown,
    Loader2,
} from 'lucide-react';
import { useRealtimeMetrics } from '@/hooks/useAnalytics';

export function RealtimeMetrics() {
    const { metrics, loading, error } = useRealtimeMetrics();
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Helper function to get metric value
    const getMetricValue = (metricName: string) => {
        const metric = metrics.find((m) => m.metric_name === metricName);
        return metric ? metric.value : 0;
    };

    // Static data for metrics that might not be in database yet
    const staticMetrics = [
        {
            name: 'Bounce Rate',
            value: '34.2%',
            change: -4.1,
            icon: Activity,
            color: 'green',
        },
        {
            name: 'Avg. Load Time',
            value: '1.2s',
            change: -8.3,
            icon: TrendingUp,
            color: 'green',
        },
    ];

    if (loading) {
        return (
            <Card className="bg-gradient-to-br from-white to-green-50/30 border border-green-200/50 shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-neutral-900">
                            Real-time Metrics
                        </CardTitle>
                        <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700">
                            Live
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-2 text-neutral-500">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Loading metrics...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="bg-gradient-to-br from-white to-green-50/30 border border-green-200/50 shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-neutral-900">
                            Real-time Metrics
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="py-8">
                    <div className="text-center text-neutral-500">
                        <Activity className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                        <p>Failed to load metrics</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const liveUsers = getMetricValue('live_users');
    const livePageViews = getMetricValue('live_page_views');

    return (
        <Card className="bg-gradient-to-br from-white to-green-50/30 border border-green-200/50 shadow-lg">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-neutral-900">
                        Real-time Metrics
                    </CardTitle>
                    <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 animate-pulse">
                        Live
                    </Badge>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                    Last updated: {currentTime.toLocaleTimeString()}
                </p>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Live metrics from database */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-neutral-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-neutral-900">
                                    Active Users
                                </h4>
                                <p className="text-2xl font-bold text-blue-600">
                                    {liveUsers.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-green-600">
                                <TrendingUp className="w-3 h-3" />
                                +3.9%
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-neutral-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Eye className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-neutral-900">
                                    Page Views
                                </h4>
                                <p className="text-2xl font-bold text-purple-600">
                                    {livePageViews.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-green-600">
                                <TrendingUp className="w-3 h-3" />
                                +2.8%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Static metrics */}
                <div className="border-t border-neutral-200 pt-4 space-y-4">
                    {staticMetrics.map((metric, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-neutral-100">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                        metric.color === 'green'
                                            ? 'bg-green-100'
                                            : 'bg-orange-100'
                                    }`}>
                                    <metric.icon
                                        className={`w-5 h-5 ${
                                            metric.color === 'green'
                                                ? 'text-green-600'
                                                : 'text-orange-600'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-medium text-neutral-900">
                                        {metric.name}
                                    </h4>
                                    <p
                                        className={`text-2xl font-bold ${
                                            metric.color === 'green'
                                                ? 'text-green-600'
                                                : 'text-orange-600'
                                        }`}>
                                        {metric.value}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div
                                    className={`flex items-center gap-1 text-sm ${
                                        metric.change > 0
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}>
                                    {metric.change > 0 ? (
                                        <TrendingUp className="w-3 h-3" />
                                    ) : (
                                        <TrendingDown className="w-3 h-3" />
                                    )}
                                    {Math.abs(metric.change)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Status indicator */}
                <div className="text-center pt-2">
                    <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        System operational • Data refreshing every 30s
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
