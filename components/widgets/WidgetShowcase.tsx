'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WidgetFactory } from './WidgetFactory';
import { Users, DollarSign, ShoppingCart, Activity } from 'lucide-react';

export function WidgetShowcase() {
    const kpiData = {
        users: {
            value: '12,549',
            change: 12.5,
            trend: 'up' as const,
            icon: Users,
        },
        revenue: {
            value: '$45,231',
            change: 8.2,
            trend: 'up' as const,
            icon: DollarSign,
        },
        orders: {
            value: '1,423',
            change: -2.1,
            trend: 'down' as const,
            icon: ShoppingCart,
        },
        sessions: {
            value: '8,492',
            change: 15.3,
            trend: 'up' as const,
            icon: Activity,
        },
    };

    const chartData = [
        { name: 'Jan', value: 4000 },
        { name: 'Feb', value: 3000 },
        { name: 'Mar', value: 5000 },
        { name: 'Apr', value: 4500 },
        { name: 'May', value: 6000 },
        { name: 'Jun', value: 5500 },
    ];

    const colors = [
        'blue',
        'green',
        'orange',
        'purple',
        'red',
        'yellow',
    ] as const;
    const sizes = ['small', 'medium', 'large'] as const;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Widget Showcase</h2>
                <p className="text-muted-foreground mb-6">
                    See how widgets look in different sizes and configurations
                </p>
            </div>

            {/* KPI Widgets - Size Variations */}
            <Card>
                <CardHeader>
                    <CardTitle>KPI Widgets - Size Variations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {sizes.map((size) => (
                        <div key={size} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {size} Size
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <WidgetFactory
                                    type="kpi"
                                    config={{
                                        title: 'Active Users',
                                        subtitle: 'Last 30 days',
                                        color: 'blue',
                                        size,
                                        refreshInterval: 300,
                                    }}
                                    data={kpiData.users}
                                />
                                <WidgetFactory
                                    type="kpi"
                                    config={{
                                        title: 'Revenue',
                                        subtitle: 'This month',
                                        color: 'green',
                                        size,
                                        refreshInterval: 300,
                                    }}
                                    data={kpiData.revenue}
                                />
                                <WidgetFactory
                                    type="kpi"
                                    config={{
                                        title: 'Orders',
                                        subtitle: 'Last 7 days',
                                        color: 'orange',
                                        size,
                                        refreshInterval: 300,
                                    }}
                                    data={kpiData.orders}
                                />
                                <WidgetFactory
                                    type="kpi"
                                    config={{
                                        title: 'Sessions',
                                        subtitle: 'Today',
                                        color: 'purple',
                                        size,
                                        refreshInterval: 300,
                                    }}
                                    data={kpiData.sessions}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* KPI Widgets - Color Variations */}
            <Card>
                <CardHeader>
                    <CardTitle>KPI Widgets - Color Themes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                        {colors.map((color) => (
                            <WidgetFactory
                                key={color}
                                type="kpi"
                                config={{
                                    title: 'Revenue',
                                    subtitle: `${color} theme`,
                                    color,
                                    size: 'medium',
                                    refreshInterval: 300,
                                }}
                                data={kpiData.revenue}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Chart Widgets */}
            <Card>
                <CardHeader>
                    <CardTitle>Chart Widgets - Different Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <WidgetFactory
                            type="chart-line"
                            config={{
                                title: 'Revenue Trend',
                                subtitle: 'Monthly revenue',
                                color: 'green',
                                size: 'large',
                                refreshInterval: 1800,
                            }}
                            data={chartData}
                            chartType="line"
                            dataKey="value"
                            xAxisKey="name"
                        />
                        <WidgetFactory
                            type="chart-area"
                            config={{
                                title: 'User Growth',
                                subtitle: 'Area chart',
                                color: 'blue',
                                size: 'large',
                                refreshInterval: 1800,
                            }}
                            data={chartData}
                            chartType="area"
                            dataKey="value"
                            xAxisKey="name"
                        />
                        <WidgetFactory
                            type="chart-bar"
                            config={{
                                title: 'Sales Data',
                                subtitle: 'Bar chart',
                                color: 'orange',
                                size: 'large',
                                refreshInterval: 1800,
                            }}
                            data={chartData}
                            chartType="bar"
                            dataKey="value"
                            xAxisKey="name"
                        />
                        <WidgetFactory
                            type="chart-pie"
                            config={{
                                title: 'Traffic Sources',
                                subtitle: 'Distribution',
                                color: 'purple',
                                size: 'large',
                                refreshInterval: 1800,
                            }}
                            data={[
                                { name: 'Direct', value: 35 },
                                { name: 'Social', value: 25 },
                                { name: 'Search', value: 20 },
                                { name: 'Email', value: 15 },
                                { name: 'Referral', value: 5 },
                            ]}
                            chartType="pie"
                            dataKey="value"
                            xAxisKey="name"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
