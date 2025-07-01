'use client';

import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalyticsEventsTable } from '@/components/analytics/AnalyticsEventsTable';
import { UserMetricsTable } from '@/components/analytics/UserMetricsTable';
import { AdvancedAnalyticsFilters } from '@/components/analytics/AdvancedAnalyticsFilters';
import { AnalyticsKPICards } from '@/components/analytics/AnalyticsKPICards';
import { RealtimeAnalyticsCharts } from '@/components/analytics/RealtimeAnalyticsCharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Activity,
    Users,
    BarChart3,
    TrendingUp,
    Calendar,
    Filter,
    Download,
    RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AnalyticsPage() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [dateRange, setDateRange] = useState({
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        to: new Date(),
    });
    const [filters, setFilters] = useState({
        eventTypes: [],
        userSegments: [],
        sources: [],
    });

    const handleRefresh = async () => {
        setIsRefreshing(true);
        // Trigger refresh of all data components
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    return (
        <Layout>
            <div className="space-y-8">
                {/* Header with Actions */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Advanced Analytics
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Real-time analytics with advanced filtering, date
                            range selection, and comprehensive reporting.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRefresh}
                            disabled={isRefreshing}>
                            <RefreshCw
                                className={`h-4 w-4 mr-2 ${
                                    isRefreshing ? 'animate-spin' : ''
                                }`}
                            />
                            Refresh
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Advanced Filters */}
                <AdvancedAnalyticsFilters
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                    filters={filters}
                    onFiltersChange={setFilters}
                />

                {/* KPI Overview */}
                <AnalyticsKPICards dateRange={dateRange} filters={filters} />

                {/* Real-time Charts */}
                <RealtimeAnalyticsCharts
                    dateRange={dateRange}
                    filters={filters}
                />

                {/* Feature Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Advanced Filtering
                            </CardTitle>
                            <Filter className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                Multi-layer
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Date range, event types, user segments
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Real-time Updates
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Live</div>
                            <p className="text-xs text-muted-foreground">
                                Automatic data synchronization
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Date Range Analysis
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Flexible</div>
                            <p className="text-xs text-muted-foreground">
                                Custom time periods
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Advanced Export
                            </CardTitle>
                            <Download className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">PDF/CSV</div>
                            <p className="text-xs text-muted-foreground">
                                Comprehensive reporting
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Tables with Enhanced Features */}
                <Tabs defaultValue="events" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                            value="events"
                            className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Analytics Events
                        </TabsTrigger>
                        <TabsTrigger
                            value="users"
                            className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            User Metrics
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="events" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Real-time Analytics Events
                                </h2>
                                <p className="text-muted-foreground">
                                    Track and analyze user interactions with
                                    advanced filtering and real-time updates.
                                </p>
                            </div>
                            <AnalyticsEventsTable
                                dateRange={dateRange}
                                filters={filters}
                                refreshTrigger={isRefreshing}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="users" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    User Metrics Dashboard
                                </h2>
                                <p className="text-muted-foreground">
                                    Comprehensive user analytics with engagement
                                    scoring and segmentation.
                                </p>
                            </div>
                            <UserMetricsTable
                                dateRange={dateRange}
                                filters={filters}
                                refreshTrigger={isRefreshing}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Enhanced Features Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Phase 2: Advanced Analytics Features
                        </CardTitle>
                        <CardDescription>
                            Enhanced analytics capabilities with professional
                            reporting and real-time insights
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-blue-500" />
                                    Advanced Filtering
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Multi-layer filtering by date range, event
                                    types, user segments, and traffic sources.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-green-500" />
                                    Date Range Analysis
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Flexible date range selection with preset
                                    options and custom period analysis.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-purple-500" />
                                    Real-time Updates
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Live data synchronization with automatic
                                    refresh and real-time insights.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-orange-500" />
                                    Trend Analysis
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Automated trend detection with
                                    period-over-period comparisons.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-red-500" />
                                    Enhanced Visualizations
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Interactive charts with drill-down
                                    capabilities and custom chart types.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Users className="h-4 w-4 text-indigo-500" />
                                    User Segmentation
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Advanced user segmentation with behavioral
                                    analysis and cohort tracking.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
