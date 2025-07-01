'use client';

import * as React from 'react';
import { DateRange } from 'react-day-picker';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    TrendingUp,
    Users,
    Activity,
    BarChart3,
    PieChart as PieChartIcon,
    RefreshCw,
    Eye,
} from 'lucide-react';
import { useRealtimeMetrics, useRevenueData } from '@/hooks/useAnalytics';

interface AnalyticsFilters {
    eventTypes: string[];
    userSegments: string[];
    sources: string[];
}

interface RealtimeAnalyticsChartsProps {
    dateRange: DateRange;
    filters: AnalyticsFilters;
}

// Mock data generators for real-time simulation
const generateRealtimeData = () => {
    const now = new Date();
    const data = [];

    for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
            time: time.toLocaleDateString() + ' ' + time.getHours() + ':00',
            hour: time.getHours(),
            users: Math.floor(Math.random() * 200) + 100,
            pageViews: Math.floor(Math.random() * 500) + 300,
            sessions: Math.floor(Math.random() * 150) + 80,
            bounceRate: Math.random() * 20 + 30,
        });
    }

    return data;
};

const generateEventTypeData = () => [
    { name: 'Page Views', value: 45, color: '#8884d8' },
    { name: 'Clicks', value: 25, color: '#82ca9d' },
    { name: 'Form Submissions', value: 15, color: '#ffc658' },
    { name: 'Purchases', value: 8, color: '#ff7300' },
    { name: 'Other Events', value: 7, color: '#8dd1e1' },
];

const generateSourceData = () => [
    { source: 'Organic Search', visitors: 4250, conversion: 3.8 },
    { source: 'Direct', visitors: 3100, conversion: 4.2 },
    { source: 'Social Media', visitors: 2800, conversion: 2.1 },
    { source: 'Email Campaign', visitors: 1900, conversion: 6.5 },
    { source: 'Paid Search', visitors: 1500, conversion: 5.2 },
    { source: 'Referrals', visitors: 850, conversion: 3.1 },
];

export function RealtimeAnalyticsCharts({
    dateRange,
    filters,
}: RealtimeAnalyticsChartsProps) {
    const [realtimeData, setRealtimeData] = React.useState(
        generateRealtimeData()
    );
    const [eventTypeData, setEventTypeData] = React.useState(
        generateEventTypeData()
    );
    const [sourceData, setSourceData] = React.useState(generateSourceData());
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const { metrics: realtimeMetrics, loading: metricsLoading } =
        useRealtimeMetrics();
    const { revenueData, loading: revenueLoading } = useRevenueData();

    // Simulate real-time updates
    React.useEffect(() => {
        const interval = setInterval(() => {
            setRealtimeData(generateRealtimeData());
        }, 30000); // Update every 30 seconds

        return () => clearInterval(interval);
    }, []);

    // Apply filters to data
    React.useEffect(() => {
        if (filters.eventTypes.length > 0) {
            // Filter event type data based on selected filters
            const filteredEventData = generateEventTypeData().filter((item) =>
                filters.eventTypes.some((filter) =>
                    item.name.toLowerCase().includes(filter.replace('_', ' '))
                )
            );
            setEventTypeData(
                filteredEventData.length > 0
                    ? filteredEventData
                    : generateEventTypeData()
            );
        } else {
            setEventTypeData(generateEventTypeData());
        }

        if (filters.sources.length > 0) {
            // Filter source data
            const filteredSourceData = generateSourceData().filter((item) =>
                filters.sources.some((filter) =>
                    item.source.toLowerCase().includes(filter)
                )
            );
            setSourceData(
                filteredSourceData.length > 0
                    ? filteredSourceData
                    : generateSourceData()
            );
        } else {
            setSourceData(generateSourceData());
        }
    }, [filters]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        setRealtimeData(generateRealtimeData());
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background border rounded-lg p-3 shadow-md">
                    <p className="text-sm font-medium">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p
                            key={index}
                            className="text-sm"
                            style={{ color: entry.color }}>
                            {entry.dataKey}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold">
                        Real-time Analytics Charts
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Live data visualization with interactive filtering
                    </p>
                </div>
                <Button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    variant="outline"
                    size="sm">
                    <RefreshCw
                        className={`h-4 w-4 mr-2 ${
                            isRefreshing ? 'animate-spin' : ''
                        }`}
                    />
                    Refresh
                </Button>
            </div>

            {/* Filter Status */}
            {(filters.eventTypes.length > 0 ||
                filters.userSegments.length > 0 ||
                filters.sources.length > 0) && (
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                        <Activity className="h-3 w-3 mr-1" />
                        Filters Applied
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                        Charts updated with filtered data
                    </span>
                </div>
            )}

            {/* Charts Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger
                        value="overview"
                        className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="events"
                        className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Events
                    </TabsTrigger>
                    <TabsTrigger
                        value="sources"
                        className="flex items-center gap-2">
                        <PieChartIcon className="h-4 w-4" />
                        Sources
                    </TabsTrigger>
                    <TabsTrigger
                        value="users"
                        className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Users
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Real-time Users Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Live Users (24h)
                                </CardTitle>
                                <CardDescription>
                                    Real-time user activity over the last 24
                                    hours
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={realtimeData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="hour"
                                            tickFormatter={(value) =>
                                                `${value}:00`
                                            }
                                        />
                                        <YAxis />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="users"
                                            stroke="#8884d8"
                                            fill="#8884d8"
                                            fillOpacity={0.3}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Page Views Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Eye className="h-5 w-5" />
                                    Page Views (24h)
                                </CardTitle>
                                <CardDescription>
                                    Page view trends over the last 24 hours
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={realtimeData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="hour"
                                            tickFormatter={(value) =>
                                                `${value}:00`
                                            }
                                        />
                                        <YAxis />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line
                                            type="monotone"
                                            dataKey="pageViews"
                                            stroke="#82ca9d"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="events" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Event Types Pie Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Event Type Distribution</CardTitle>
                                <CardDescription>
                                    Breakdown of event types in selected period
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={eventTypeData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) =>
                                                `${name} ${(
                                                    percent * 100
                                                ).toFixed(0)}%`
                                            }
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value">
                                            {eventTypeData.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={entry.color}
                                                    />
                                                )
                                            )}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Sessions vs Bounce Rate */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Sessions & Bounce Rate</CardTitle>
                                <CardDescription>
                                    Session activity and bounce rate correlation
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={realtimeData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="hour"
                                            tickFormatter={(value) =>
                                                `${value}:00`
                                            }
                                        />
                                        <YAxis />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="sessions"
                                            stackId="1"
                                            stroke="#ffc658"
                                            fill="#ffc658"
                                            fillOpacity={0.6}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="bounceRate"
                                            stackId="2"
                                            stroke="#ff7300"
                                            fill="#ff7300"
                                            fillOpacity={0.4}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="sources" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Traffic Sources Performance</CardTitle>
                            <CardDescription>
                                Visitor count and conversion rate by traffic
                                source
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                    data={sourceData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="source"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar
                                        dataKey="visitors"
                                        fill="#8884d8"
                                        name="Visitors"
                                    />
                                    <Bar
                                        dataKey="conversion"
                                        fill="#82ca9d"
                                        name="Conversion Rate %"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* User Flow */}
                        <Card>
                            <CardHeader>
                                <CardTitle>User Engagement Flow</CardTitle>
                                <CardDescription>
                                    User journey through different stages
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={realtimeData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="hour"
                                            tickFormatter={(value) =>
                                                `${value}:00`
                                            }
                                        />
                                        <YAxis />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="users"
                                            stroke="#8884d8"
                                            fill="#8884d8"
                                            fillOpacity={0.6}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="sessions"
                                            stroke="#82ca9d"
                                            fill="#82ca9d"
                                            fillOpacity={0.4}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Real-time Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Real-time Status</CardTitle>
                                <CardDescription>
                                    Current live metrics and status
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-3 border rounded">
                                    <span className="text-sm font-medium">
                                        Live Users
                                    </span>
                                    <Badge
                                        variant="secondary"
                                        className="text-lg">
                                        {realtimeMetrics?.find(
                                            (m) =>
                                                m.metric_name === 'live_users'
                                        )?.value || '1,276'}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded">
                                    <span className="text-sm font-medium">
                                        Live Page Views
                                    </span>
                                    <Badge
                                        variant="secondary"
                                        className="text-lg">
                                        {realtimeMetrics?.find(
                                            (m) =>
                                                m.metric_name ===
                                                'live_page_views'
                                        )?.value || '9,405'}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded">
                                    <span className="text-sm font-medium">
                                        Data Updated
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className="text-xs">
                                        {new Date().toLocaleTimeString()}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded">
                                    <span className="text-sm font-medium">
                                        Refresh Rate
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className="text-xs">
                                        30 seconds
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
