'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, ShoppingCart, DollarSign } from 'lucide-react';

interface MetricData {
    label: string;
    value: number;
    icon: any;
    color: string;
    change: number;
}

export function RealtimeMetrics() {
    const [metrics, setMetrics] = useState<MetricData[]>([
        {
            label: 'Active Users',
            value: 1247,
            icon: Users,
            color: 'blue',
            change: 0,
        },
        {
            label: 'Page Views',
            value: 8932,
            icon: Activity,
            color: 'green',
            change: 0,
        },
        {
            label: 'Conversions',
            value: 156,
            icon: ShoppingCart,
            color: 'orange',
            change: 0,
        },
        {
            label: 'Revenue',
            value: 23847,
            icon: DollarSign,
            color: 'purple',
            change: 0,
        },
    ]);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics((prev) =>
                prev.map((metric) => {
                    const changePercent = (Math.random() - 0.5) * 0.1; // -5% to +5%
                    const newValue = Math.round(
                        metric.value * (1 + changePercent)
                    );
                    const change =
                        ((newValue - metric.value) / metric.value) * 100;

                    return {
                        ...metric,
                        value: newValue,
                        change: Number(change.toFixed(1)),
                    };
                })
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const formatValue = (value: number, label: string) => {
        if (label === 'Revenue') return `$${value.toLocaleString()}`;
        return value.toLocaleString();
    };

    return (
        <Card className="bg-gradient-to-br from-white to-neutral-50/50 shadow-lg border border-neutral-200/50">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-neutral-900">
                        Real-time Metrics
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                        <Badge
                            variant="secondary"
                            className="bg-success-50 text-success-700">
                            Live
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    const isPositive = metric.change >= 0;

                    return (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/60 border border-neutral-100 hover:bg-white/80 transition-all duration-200">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                        metric.color === 'blue'
                                            ? 'bg-blue-50 text-blue-600'
                                            : metric.color === 'green'
                                            ? 'bg-success-50 text-success-600'
                                            : metric.color === 'orange'
                                            ? 'bg-warning-50 text-warning-600'
                                            : 'bg-purple-50 text-ai-purple'
                                    }`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-neutral-900">
                                        {metric.label}
                                    </p>
                                    <p className="text-lg font-bold text-neutral-900">
                                        {formatValue(
                                            metric.value,
                                            metric.label
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div
                                className={`text-sm font-medium ${
                                    isPositive
                                        ? 'text-success-600'
                                        : 'text-error-600'
                                }`}>
                                {isPositive ? '+' : ''}
                                {metric.change}%
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
