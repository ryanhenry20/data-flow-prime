import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WidgetConfig } from '../types';

interface KPIWidgetProps {
    config: WidgetConfig;
    data?: {
        value: string | number;
        change: number;
        trend: 'up' | 'down';
        icon: LucideIcon;
    };
}

export function KPIWidget({ config, data }: KPIWidgetProps) {
    const { title, subtitle, color = 'blue', size } = config;

    // Default data if none provided
    const defaultData = {
        value: '12,345',
        change: 12.5,
        trend: 'up' as const,
        icon: TrendingUp,
    };

    const widgetData = data || defaultData;
    const Icon = widgetData.icon;
    const TrendIcon = widgetData.trend === 'up' ? TrendingUp : TrendingDown;

    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        orange: 'from-orange-500 to-orange-600',
        purple: 'from-purple-500 to-purple-600',
        red: 'from-red-500 to-red-600',
        yellow: 'from-yellow-500 to-yellow-600',
    };

    const bgClasses = {
        blue: 'bg-blue-50 dark:bg-blue-950/50',
        green: 'bg-green-50 dark:bg-green-950/50',
        orange: 'bg-orange-50 dark:bg-orange-950/50',
        purple: 'bg-purple-50 dark:bg-purple-950/50',
        red: 'bg-red-50 dark:bg-red-950/50',
        yellow: 'bg-yellow-50 dark:bg-yellow-950/50',
    };

    const iconColorClasses = {
        blue: 'text-blue-600 dark:text-blue-400',
        green: 'text-green-600 dark:text-green-400',
        orange: 'text-orange-600 dark:text-orange-400',
        purple: 'text-purple-600 dark:text-purple-400',
        red: 'text-red-600 dark:text-red-400',
        yellow: 'text-yellow-600 dark:text-yellow-400',
    };

    const sizeClasses = {
        small: 'p-4',
        medium: 'p-6',
        large: 'p-6',
        xlarge: 'p-8',
    };

    const valueSizeClasses = {
        small: 'text-lg',
        medium: 'text-2xl',
        large: 'text-3xl',
        xlarge: 'text-4xl',
    };

    const iconSizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-6 h-6',
        large: 'w-8 h-8',
        xlarge: 'w-10 h-10',
    };

    const iconBgSizeClasses = {
        small: 'w-8 h-8',
        medium: 'w-12 h-12',
        large: 'w-14 h-14',
        xlarge: 'w-16 h-16',
    };

    return (
        <Card className="relative overflow-hidden group hover:scale-105 transform transition-all duration-300 hover:shadow-lg dark:hover:shadow-blue-500/20 h-full">
            <CardContent className={sizeClasses[size]}>
                <div className="flex items-center justify-between mb-4">
                    <div
                        className={`${iconBgSizeClasses[size]} rounded-xl ${bgClasses[color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon
                            className={`${iconSizeClasses[size]} ${iconColorClasses[color]}`}
                        />
                    </div>
                    <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                            widgetData.trend === 'up'
                                ? 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400'
                                : 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400'
                        }`}>
                        <TrendIcon className="w-3 h-3" />
                        {widgetData.trend === 'up' ? '+' : ''}
                        {widgetData.change}%
                    </div>
                </div>

                <div>
                    <h3
                        className={`${valueSizeClasses[size]} font-bold text-gray-900 dark:text-gray-100 mb-1`}>
                        {widgetData.value}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {title}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Animated background glow effect */}
                <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colorClasses[color]} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300 -z-10`}
                />
            </CardContent>
        </Card>
    );
}
