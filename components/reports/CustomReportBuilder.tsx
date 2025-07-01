'use client';

import * as React from 'react';
import {
    Plus,
    Minus,
    Move,
    BarChart3,
    PieChart,
    LineChart,
    Table,
    FileText,
    Download,
    Save,
    Eye,
    Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useNotifications } from '@/hooks/useNotifications';

interface ReportWidget {
    id: string;
    type: 'chart' | 'table' | 'metric' | 'text';
    chartType?: 'bar' | 'line' | 'pie' | 'area';
    title: string;
    dataSource: string;
    metrics: string[];
    filters: Record<string, any>;
    position: { x: number; y: number };
    size: { width: number; height: number };
}

interface ReportConfig {
    name: string;
    description: string;
    widgets: ReportWidget[];
    layout: 'grid' | 'flow';
    theme: 'light' | 'dark' | 'branded';
    schedule?: {
        enabled: boolean;
        frequency: 'daily' | 'weekly' | 'monthly';
        time: string;
    };
}

export function CustomReportBuilder() {
    const [config, setConfig] = React.useState<ReportConfig>({
        name: 'Custom Report',
        description: 'A custom analytics report',
        widgets: [],
        layout: 'grid',
        theme: 'light',
    });
    const [selectedWidget, setSelectedWidget] = React.useState<string | null>(
        null
    );
    const [isPreviewMode, setIsPreviewMode] = React.useState(false);
    const { success, error } = useNotifications();

    const availableDataSources = [
        {
            id: 'analytics_events',
            name: 'Analytics Events',
            description: 'User interaction data',
        },
        {
            id: 'user_metrics',
            name: 'User Metrics',
            description: 'User behavior and engagement',
        },
        {
            id: 'revenue_data',
            name: 'Revenue Data',
            description: 'Financial and transaction data',
        },
        {
            id: 'traffic_sources',
            name: 'Traffic Sources',
            description: 'Acquisition and referral data',
        },
        {
            id: 'conversion_funnel',
            name: 'Conversion Funnel',
            description: 'Conversion and goal data',
        },
    ];

    const availableMetrics = [
        'Users',
        'Sessions',
        'Page Views',
        'Bounce Rate',
        'Conversion Rate',
        'Revenue',
        'Transactions',
        'Average Order Value',
        'Click-through Rate',
        'Engagement Rate',
        'Time on Page',
        'Exit Rate',
    ];

    const widgetTemplates = [
        {
            type: 'chart',
            chartType: 'bar',
            icon: BarChart3,
            name: 'Bar Chart',
            description: 'Compare values across categories',
        },
        {
            type: 'chart',
            chartType: 'line',
            icon: LineChart,
            name: 'Line Chart',
            description: 'Show trends over time',
        },
        {
            type: 'chart',
            chartType: 'pie',
            icon: PieChart,
            name: 'Pie Chart',
            description: 'Display proportions',
        },
        {
            type: 'table',
            icon: Table,
            name: 'Data Table',
            description: 'Detailed data in table format',
        },
        {
            type: 'metric',
            icon: FileText,
            name: 'KPI Metric',
            description: 'Single key performance indicator',
        },
        {
            type: 'text',
            icon: FileText,
            name: 'Text Block',
            description: 'Custom text and insights',
        },
    ];

    const addWidget = (template: any) => {
        const newWidget: ReportWidget = {
            id: `widget-${Date.now()}`,
            type: template.type,
            chartType: template.chartType,
            title: `New ${template.name}`,
            dataSource: availableDataSources[0].id,
            metrics: [availableMetrics[0]],
            filters: {},
            position: { x: 0, y: config.widgets.length * 200 },
            size: { width: 400, height: 300 },
        };

        setConfig((prev) => ({
            ...prev,
            widgets: [...prev.widgets, newWidget],
        }));
        setSelectedWidget(newWidget.id);
    };

    const removeWidget = (widgetId: string) => {
        setConfig((prev) => ({
            ...prev,
            widgets: prev.widgets.filter((w) => w.id !== widgetId),
        }));
        if (selectedWidget === widgetId) {
            setSelectedWidget(null);
        }
    };

    const updateWidget = (widgetId: string, updates: Partial<ReportWidget>) => {
        setConfig((prev) => ({
            ...prev,
            widgets: prev.widgets.map((w) =>
                w.id === widgetId ? { ...w, ...updates } : w
            ),
        }));
    };

    const saveReport = () => {
        // Simulate saving report
        success('Report saved successfully!');
    };

    const exportReport = () => {
        // Simulate export
        success('Report exported successfully!');
    };

    const selectedWidgetData = selectedWidget
        ? config.widgets.find((w) => w.id === selectedWidget)
        : null;

    return (
        <div className="space-y-6">
            {/* Report Header */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle>Report Configuration</CardTitle>
                            <CardDescription>
                                Configure basic report settings and metadata
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() =>
                                    setIsPreviewMode(!isPreviewMode)
                                }>
                                <Eye className="h-4 w-4 mr-2" />
                                {isPreviewMode ? 'Edit' : 'Preview'}
                            </Button>
                            <Button variant="outline" onClick={saveReport}>
                                <Save className="h-4 w-4 mr-2" />
                                Save
                            </Button>
                            <Button onClick={exportReport}>
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="report-name">Report Name</Label>
                            <Input
                                id="report-name"
                                value={config.name}
                                onChange={(e) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="Enter report name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="report-theme">Theme</Label>
                            <Select
                                value={config.theme}
                                onValueChange={(
                                    value: 'light' | 'dark' | 'branded'
                                ) =>
                                    setConfig((prev) => ({
                                        ...prev,
                                        theme: value,
                                    }))
                                }>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="branded">
                                        Branded
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="report-description">Description</Label>
                        <Textarea
                            id="report-description"
                            value={config.description}
                            onChange={(e) =>
                                setConfig((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            placeholder="Enter report description"
                            rows={3}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Main Builder Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Widget Library */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Widget Library
                        </CardTitle>
                        <CardDescription>
                            Drag or click to add widgets
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {widgetTemplates.map((template) => (
                            <Button
                                key={`${template.type}-${
                                    template.chartType || 'default'
                                }`}
                                variant="outline"
                                className="w-full justify-start h-auto p-3"
                                onClick={() => addWidget(template)}>
                                <div className="flex items-start gap-3">
                                    <template.icon className="h-5 w-5 mt-1 flex-shrink-0" />
                                    <div className="text-left">
                                        <div className="font-medium text-sm">
                                            {template.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {template.description}
                                        </div>
                                    </div>
                                </div>
                            </Button>
                        ))}
                    </CardContent>
                </Card>

                {/* Canvas */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">
                                    Report Canvas
                                </CardTitle>
                                <CardDescription>
                                    {config.widgets.length} widgets •{' '}
                                    {config.layout} layout
                                </CardDescription>
                            </div>
                            <Badge variant="secondary">
                                {isPreviewMode ? 'Preview Mode' : 'Edit Mode'}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="min-h-[600px] border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                            {config.widgets.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-center">
                                    <div className="space-y-2">
                                        <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                                        <h3 className="text-lg font-medium">
                                            No widgets added
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Add widgets from the library to
                                            start building your report
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {config.widgets.map((widget) => (
                                        <div
                                            key={widget.id}
                                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                                selectedWidget === widget.id
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-border hover:border-primary/50'
                                            }`}
                                            onClick={() =>
                                                setSelectedWidget(widget.id)
                                            }>
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium">
                                                    {widget.title}
                                                </h4>
                                                <div className="flex gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeWidget(
                                                                widget.id
                                                            );
                                                        }}>
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {widget.type} •{' '}
                                                {widget.dataSource} •{' '}
                                                {widget.metrics.join(', ')}
                                            </div>
                                            <div className="mt-3 h-32 bg-muted rounded flex items-center justify-center">
                                                <span className="text-sm text-muted-foreground">
                                                    {widget.chartType ||
                                                        widget.type}{' '}
                                                    preview
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Properties Panel */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg">Properties</CardTitle>
                        <CardDescription>
                            {selectedWidgetData
                                ? 'Configure selected widget'
                                : 'Select a widget to edit'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {selectedWidgetData ? (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Widget Title</Label>
                                    <Input
                                        value={selectedWidgetData.title}
                                        onChange={(e) =>
                                            updateWidget(selectedWidget!, {
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Data Source</Label>
                                    <Select
                                        value={selectedWidgetData.dataSource}
                                        onValueChange={(value) =>
                                            updateWidget(selectedWidget!, {
                                                dataSource: value,
                                            })
                                        }>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableDataSources.map(
                                                (source) => (
                                                    <SelectItem
                                                        key={source.id}
                                                        value={source.id}>
                                                        {source.name}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Metrics</Label>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {availableMetrics.map((metric) => (
                                            <div
                                                key={metric}
                                                className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`metric-${metric}`}
                                                    checked={selectedWidgetData.metrics.includes(
                                                        metric
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        const newMetrics =
                                                            checked
                                                                ? [
                                                                      ...selectedWidgetData.metrics,
                                                                      metric,
                                                                  ]
                                                                : selectedWidgetData.metrics.filter(
                                                                      (m) =>
                                                                          m !==
                                                                          metric
                                                                  );
                                                        updateWidget(
                                                            selectedWidget!,
                                                            {
                                                                metrics:
                                                                    newMetrics,
                                                            }
                                                        );
                                                    }}
                                                />
                                                <Label
                                                    htmlFor={`metric-${metric}`}
                                                    className="text-sm">
                                                    {metric}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {selectedWidgetData.type === 'chart' && (
                                    <div className="space-y-2">
                                        <Label>Chart Type</Label>
                                        <Select
                                            value={selectedWidgetData.chartType}
                                            onValueChange={(
                                                value:
                                                    | 'bar'
                                                    | 'line'
                                                    | 'pie'
                                                    | 'area'
                                            ) =>
                                                updateWidget(selectedWidget!, {
                                                    chartType: value,
                                                })
                                            }>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="bar">
                                                    Bar Chart
                                                </SelectItem>
                                                <SelectItem value="line">
                                                    Line Chart
                                                </SelectItem>
                                                <SelectItem value="pie">
                                                    Pie Chart
                                                </SelectItem>
                                                <SelectItem value="area">
                                                    Area Chart
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Settings className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">
                                    Select a widget to configure its properties
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Export Options */}
            <Card>
                <CardHeader>
                    <CardTitle>Export & Scheduling</CardTitle>
                    <CardDescription>
                        Configure export options and automated scheduling
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="export" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="export">
                                Export Options
                            </TabsTrigger>
                            <TabsTrigger value="schedule">
                                Scheduling
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="export" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Button
                                    variant="outline"
                                    className="h-20 flex-col gap-2">
                                    <FileText className="h-6 w-6" />
                                    <span>Export PDF</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-20 flex-col gap-2">
                                    <Table className="h-6 w-6" />
                                    <span>Export CSV</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-20 flex-col gap-2">
                                    <BarChart3 className="h-6 w-6" />
                                    <span>Export Excel</span>
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="schedule" className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="enable-scheduling"
                                        checked={
                                            config.schedule?.enabled || false
                                        }
                                        onCheckedChange={(checked) =>
                                            setConfig((prev) => ({
                                                ...prev,
                                                schedule: {
                                                    enabled: !!checked,
                                                    frequency: 'monthly',
                                                    time: '09:00',
                                                },
                                            }))
                                        }
                                    />
                                    <Label htmlFor="enable-scheduling">
                                        Enable Automated Scheduling
                                    </Label>
                                </div>

                                {config.schedule?.enabled && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Frequency</Label>
                                            <Select
                                                value={
                                                    config.schedule.frequency
                                                }
                                                onValueChange={(
                                                    value:
                                                        | 'daily'
                                                        | 'weekly'
                                                        | 'monthly'
                                                ) =>
                                                    setConfig((prev) => ({
                                                        ...prev,
                                                        schedule: {
                                                            ...prev.schedule!,
                                                            frequency: value,
                                                        },
                                                    }))
                                                }>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="daily">
                                                        Daily
                                                    </SelectItem>
                                                    <SelectItem value="weekly">
                                                        Weekly
                                                    </SelectItem>
                                                    <SelectItem value="monthly">
                                                        Monthly
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Time</Label>
                                            <Input
                                                type="time"
                                                value={config.schedule.time}
                                                onChange={(e) =>
                                                    setConfig((prev) => ({
                                                        ...prev,
                                                        schedule: {
                                                            ...prev.schedule!,
                                                            time: e.target
                                                                .value,
                                                        },
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
