'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { useDashboardWidgets } from '@/hooks/useDashboardWidgets';
import { WidgetFactory } from '@/components/widgets/WidgetFactory';
import { getWidgetById } from '@/components/widgets/registry';
import { useNotifications } from '@/hooks/useNotifications';
import Link from 'next/link';

export function DashboardWidgets() {
    const { dashboardWidgets, removeWidget } = useDashboardWidgets();
    const { success: showSuccess } = useNotifications();

    const handleRemoveWidget = (widgetId: string, widgetName: string) => {
        removeWidget(widgetId);
        showSuccess(`${widgetName} removed from dashboard`);
    };

    if (dashboardWidgets.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        Dashboard Widgets
                    </h2>
                    <Link href="/widgets">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Widgets
                        </Button>
                    </Link>
                </div>

                <Card className="border-dashed border-2 border-muted-foreground/25">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                                <Plus className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">
                                    No widgets added yet
                                </h3>
                                <p className="text-muted-foreground max-w-sm">
                                    Customize your dashboard by adding widgets
                                    from our marketplace.
                                </p>
                            </div>
                            <Link href="/widgets">
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Browse Widget Marketplace
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Dashboard Widgets ({dashboardWidgets.length})
                </h2>
                <Link href="/widgets">
                    <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add More Widgets
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dashboardWidgets.map((dashboardWidget) => {
                    const widget = getWidgetById(dashboardWidget.widgetId);

                    if (!widget) {
                        return (
                            <Card
                                key={dashboardWidget.id}
                                className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 min-h-[300px]">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-red-700 dark:text-red-300">
                                            Widget Not Found
                                        </CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleRemoveWidget(
                                                    dashboardWidget.id,
                                                    'Unknown Widget'
                                                )
                                            }
                                            className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300">
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        This widget is no longer available.
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    }

                    const isKPIWidget = widget.componentType === 'kpi';
                    const isChartWidget = widget.componentType === 'chart';

                    return (
                        <Card
                            key={dashboardWidget.id}
                            className="group hover:shadow-lg transition-all duration-300 min-h-[300px] relative overflow-hidden border border-border/50 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80">
                            <CardHeader className="pb-4 relative">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-2 h-2 rounded-full ${
                                                isKPIWidget
                                                    ? 'bg-blue-500'
                                                    : 'bg-green-500'
                                            }`}
                                        />
                                        <CardTitle className="text-lg font-semibold text-foreground">
                                            {widget.metadata.name}
                                        </CardTitle>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            handleRemoveWidget(
                                                dashboardWidget.id,
                                                widget.metadata.name
                                            )
                                        }
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                                {widget.metadata.description && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {widget.metadata.description}
                                    </p>
                                )}
                            </CardHeader>

                            <CardContent className="pb-6">
                                <div
                                    className={`${
                                        isKPIWidget
                                            ? 'h-32 flex items-center justify-center'
                                            : 'h-48'
                                    } rounded-lg overflow-hidden bg-background/50`}>
                                    <div
                                        className={`${
                                            isKPIWidget
                                                ? 'w-full'
                                                : 'w-full h-full'
                                        }`}>
                                        <WidgetFactory
                                            type={widget.componentType}
                                            config={{
                                                ...widget.config,
                                                size: isKPIWidget
                                                    ? 'medium'
                                                    : widget.config.size,
                                            }}
                                            data={widget.componentData}
                                            chartType={widget.chartType}
                                            dataKey={widget.dataKey}
                                            xAxisKey={widget.xAxisKey}
                                        />
                                    </div>
                                </div>
                            </CardContent>

                            {/* Widget metadata footer */}
                            <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between text-xs text-muted-foreground">
                                <span className="capitalize">
                                    {widget.metadata.category}
                                </span>
                                <span>v{widget.metadata.version}</span>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
