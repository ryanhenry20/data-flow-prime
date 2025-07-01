'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { WidgetConfig } from '../types';

interface ChartWidgetProps {
    config: WidgetConfig;
    data?: any[];
    chartType?: 'line' | 'area' | 'bar' | 'pie';
    dataKey?: string;
    xAxisKey?: string;
}

export function ChartWidget({
    config,
    data,
    chartType = 'line',
    dataKey = 'value',
    xAxisKey = 'name',
}: ChartWidgetProps) {
    const { title, subtitle, color = 'blue', size } = config;

    // Default data if none provided
    const defaultData = [
        { name: 'Jan', value: 400, value2: 240 },
        { name: 'Feb', value: 300, value2: 456 },
        { name: 'Mar', value: 200, value2: 139 },
        { name: 'Apr', value: 278, value2: 980 },
        { name: 'May', value: 189, value2: 390 },
        { name: 'Jun', value: 239, value2: 480 },
    ];

    const chartData = data || defaultData;

    const colors = {
        blue: '#3B82F6',
        green: '#10B981',
        orange: '#F59E0B',
        purple: '#8B5CF6',
        red: '#EF4444',
        yellow: '#EAB308',
    };

    const pieColors = [
        colors[color],
        `${colors[color]}80`, // 50% opacity
        `${colors[color]}60`, // 40% opacity
        `${colors[color]}40`, // 25% opacity
        `${colors[color]}20`, // 12% opacity
    ];

    const heightClasses = {
        small: 'h-48',
        medium: 'h-64',
        large: 'h-80',
        xlarge: 'h-96',
    };

    const renderChart = () => {
        switch (chartType) {
            case 'line':
                return (
                    <LineChart data={chartData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="opacity-30"
                        />
                        <XAxis dataKey={xAxisKey} className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '6px',
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={colors[color]}
                            strokeWidth={2}
                            dot={{ fill: colors[color], strokeWidth: 2, r: 4 }}
                            activeDot={{
                                r: 6,
                                stroke: colors[color],
                                strokeWidth: 2,
                            }}
                        />
                    </LineChart>
                );

            case 'area':
                return (
                    <AreaChart data={chartData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="opacity-30"
                        />
                        <XAxis dataKey={xAxisKey} className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '6px',
                            }}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey={dataKey}
                            stroke={colors[color]}
                            fill={`${colors[color]}20`}
                            strokeWidth={2}
                        />
                    </AreaChart>
                );

            case 'bar':
                return (
                    <BarChart data={chartData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="opacity-30"
                        />
                        <XAxis dataKey={xAxisKey} className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '6px',
                            }}
                        />
                        <Legend />
                        <Bar
                            dataKey={dataKey}
                            fill={colors[color]}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                );

            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={
                                size === 'small'
                                    ? 60
                                    : size === 'medium'
                                    ? 80
                                    : 100
                            }
                            fill="#8884d8"
                            dataKey={dataKey}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={pieColors[index % pieColors.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '6px',
                            }}
                        />
                    </PieChart>
                );

            default:
                return <div>Chart type not supported</div>;
        }
    };

    return (
        <Card className="h-full">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                {subtitle && (
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
            </CardHeader>
            <CardContent>
                <div className={heightClasses[size]}>
                    <ResponsiveContainer width="100%" height="100%">
                        {renderChart()}
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
