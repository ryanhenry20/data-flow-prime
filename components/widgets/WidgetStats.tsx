'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Grid3X3,
    Download,
    Star,
    TrendingUp,
    Users,
    BarChart3,
    Zap,
    Heart,
} from 'lucide-react';
import { widgetRegistry } from './registry';

export function WidgetStats() {
    const stats = {
        totalWidgets: widgetRegistry.length,
        totalDownloads: widgetRegistry.reduce(
            (sum, widget) => sum + widget.metadata.downloads,
            0
        ),
        averageRating: (
            widgetRegistry.reduce(
                (sum, widget) => sum + widget.metadata.rating,
                0
            ) / widgetRegistry.length
        ).toFixed(1),
        categories: {
            kpi: widgetRegistry.filter((w) => w.metadata.category === 'kpi')
                .length,
            chart: widgetRegistry.filter((w) => w.metadata.category === 'chart')
                .length,
            table: widgetRegistry.filter((w) => w.metadata.category === 'table')
                .length,
            analytics: widgetRegistry.filter(
                (w) => w.metadata.category === 'analytics'
            ).length,
            custom: widgetRegistry.filter(
                (w) => w.metadata.category === 'custom'
            ).length,
            ai: widgetRegistry.filter((w) => w.metadata.category === 'ai')
                .length,
        },
        topRatedWidgets: [...widgetRegistry]
            .sort((a, b) => b.metadata.rating - a.metadata.rating)
            .slice(0, 3),
        mostDownloadedWidgets: [...widgetRegistry]
            .sort((a, b) => b.metadata.downloads - a.metadata.downloads)
            .slice(0, 3),
    };

    const categoryIcons = {
        kpi: TrendingUp,
        chart: BarChart3,
        table: Grid3X3,
        analytics: BarChart3,
        custom: Zap,
        ai: Zap,
    };

    const categoryColors = {
        kpi: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        chart: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        table: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
        analytics:
            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        custom: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        ai: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">
                    Marketplace Statistics
                </h2>
                <p className="text-muted-foreground">
                    Overview of widget marketplace performance and metrics
                </p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Widgets
                        </CardTitle>
                        <Grid3X3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.totalWidgets}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Available in marketplace
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Downloads
                        </CardTitle>
                        <Download className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.totalDownloads.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            All-time downloads
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Average Rating
                        </CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.averageRating}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Out of 5 stars
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Categories
                        </CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {Object.keys(stats.categories).length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Different widget types
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Category Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle>Widget Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Object.entries(stats.categories).map(
                            ([category, count]) => {
                                const Icon =
                                    categoryIcons[
                                        category as keyof typeof categoryIcons
                                    ];
                                const colorClass =
                                    categoryColors[
                                        category as keyof typeof categoryColors
                                    ];

                                return (
                                    <div key={category} className="text-center">
                                        <div
                                            className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center mx-auto mb-2`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="text-2xl font-bold">
                                            {count}
                                        </div>
                                        <p className="text-sm text-muted-foreground capitalize">
                                            {category}
                                        </p>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Top Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Rated */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            Top Rated Widgets
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {stats.topRatedWidgets.map((widget, index) => (
                            <div
                                key={widget.metadata.id}
                                className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-sm">
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">
                                        {widget.metadata.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {widget.metadata.downloads.toLocaleString()}{' '}
                                        downloads
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">
                                        {widget.metadata.rating}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Most Downloaded */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Download className="w-5 h-5 text-blue-500" />
                            Most Downloaded Widgets
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {stats.mostDownloadedWidgets.map((widget, index) => (
                            <div
                                key={widget.metadata.id}
                                className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">
                                        {widget.metadata.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Rating: {widget.metadata.rating}/5
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Download className="w-4 h-4 text-blue-500" />
                                    <span className="font-medium">
                                        {widget.metadata.downloads.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Success Message */}
            <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/10">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <Heart className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                                Widget Marketplace is Live!
                            </h4>
                            <p className="text-sm text-green-700 dark:text-green-300">
                                Your widget marketplace is fully functional with{' '}
                                {stats.totalWidgets} widgets, preview
                                functionality, search and filtering, category
                                organization, and professional UI components.
                                Users can browse, preview, and add widgets to
                                their dashboards seamlessly.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
