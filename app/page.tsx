'use client';

import {
    TrendingUp,
    Users,
    ShoppingCart,
    DollarSign,
    Activity,
    ArrowUpRight,
    Calendar,
    Download,
} from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { AIInsightsPanel } from '@/components/dashboard/AIInsightsPanel';
import { RealtimeMetrics } from '@/components/dashboard/RealtimeMetrics';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    useRevenueData,
    useKPIMetrics,
    parseNumericValue,
} from '@/hooks/useAnalytics';

// Static data for charts that don't have real data yet
const trafficData = [
    { name: 'Mon', value: 12000 },
    { name: 'Tue', value: 13500 },
    { name: 'Wed', value: 11800 },
    { name: 'Thu', value: 14200 },
    { name: 'Fri', value: 15800 },
    { name: 'Sat', value: 14500 },
    { name: 'Sun', value: 13200 },
];

const userSegmentData = [
    { name: 'New Users', value: 35, color: '#3b82f6' },
    { name: 'Returning', value: 45, color: '#10b981' },
    { name: 'Premium', value: 20, color: '#f59e0b' },
];

const conversionData = [
    { name: 'Jan', value: 2.4 },
    { name: 'Feb', value: 2.6 },
    { name: 'Mar', value: 2.3 },
    { name: 'Apr', value: 2.8 },
    { name: 'May', value: 3.1 },
    { name: 'Jun', value: 2.9 },
];

export default function HomePage() {
    const { revenueData, loading: revenueLoading } = useRevenueData();
    const { metrics, loading: metricsLoading } = useKPIMetrics();

    // Helper function to get metric value
    const getMetricValue = (metricName: string, defaultValue: string = '0') => {
        const metric = metrics.find((m) => m.metric_name === metricName);
        return metric ? metric.value.toString() : defaultValue;
    };

    // Helper function to format values with proper number parsing
    const formatKPIValue = (metricName: string) => {
        const metric = metrics.find((m) => m.metric_name === metricName);
        if (!metric) {
            return { value: '0', change: 0 };
        }

        const numericValue = parseNumericValue(metric.value);

        switch (metricName) {
            case 'active_users':
                return { value: numericValue.toLocaleString(), change: 8.2 };
            case 'conversion_rate':
                return { value: `${numericValue}%`, change: -2.1 };
            case 'avg_session_duration':
                const minutes = Math.floor(numericValue / 60);
                const seconds = numericValue % 60;
                return { value: `${minutes}m ${seconds}s`, change: 15.3 };
            default:
                return { value: numericValue.toString(), change: 0 };
        }
    };

    return (
        <Layout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900">
                            Analytics Dashboard
                        </h1>
                        <p className="text-neutral-600 mt-1">
                            Welcome back! Here&apos;s what&apos;s happening with
                            your business today.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Last 30 days
                        </Button>
                        <Button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600">
                            <Download className="w-4 h-4" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPICard
                        title="Total Revenue"
                        value="$124,563"
                        change={12.5}
                        icon={DollarSign}
                        trend="up"
                        color="green"
                    />
                    <KPICard
                        title="Active Users"
                        value={
                            metricsLoading
                                ? 'Loading...'
                                : formatKPIValue('active_users').value
                        }
                        change={formatKPIValue('active_users').change}
                        icon={Users}
                        trend="up"
                        color="blue"
                    />
                    <KPICard
                        title="Conversion Rate"
                        value={
                            metricsLoading
                                ? 'Loading...'
                                : formatKPIValue('conversion_rate').value
                        }
                        change={formatKPIValue('conversion_rate').change}
                        icon={ShoppingCart}
                        trend="down"
                        color="orange"
                    />
                    <KPICard
                        title="Avg. Session"
                        value={
                            metricsLoading
                                ? 'Loading...'
                                : formatKPIValue('avg_session_duration').value
                        }
                        change={formatKPIValue('avg_session_duration').change}
                        icon={Activity}
                        trend="up"
                        color="purple"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Charts */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Revenue Chart - Using Real Data */}
                        {revenueLoading ? (
                            <Card className="chart-container">
                                <CardHeader>
                                    <CardTitle>Revenue Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="flex items-center justify-center h-[350px]">
                                    <div className="text-neutral-500">
                                        Loading revenue data...
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <ChartCard
                                title="Revenue Overview"
                                type="area"
                                data={revenueData}
                                height={350}
                                color="#3b82f6"
                            />
                        )}

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ChartCard
                                title="Weekly Traffic"
                                type="bar"
                                data={trafficData}
                                height={250}
                                color="#10b981"
                            />
                            <ChartCard
                                title="User Segments"
                                type="pie"
                                data={userSegmentData}
                                height={250}
                            />
                        </div>

                        {/* Conversion Trend */}
                        <ChartCard
                            title="Conversion Rate Trend"
                            type="line"
                            data={conversionData}
                            height={300}
                            color="#f59e0b"
                        />
                    </div>

                    {/* Right Column - AI Insights & Metrics */}
                    <div className="space-y-8">
                        <AIInsightsPanel />
                        <RealtimeMetrics />

                        {/* Quick Actions */}
                        <Card className="bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200/50">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-neutral-900">
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-left hover:bg-white/50">
                                    <TrendingUp className="w-4 h-4 mr-3" />
                                    Generate Monthly Report
                                    <ArrowUpRight className="w-4 h-4 ml-auto" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-left hover:bg-white/50">
                                    <Users className="w-4 h-4 mr-3" />
                                    User Behavior Analysis
                                    <ArrowUpRight className="w-4 h-4 ml-auto" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-left hover:bg-white/50">
                                    <Calendar className="w-4 h-4 mr-3" />
                                    Schedule Dashboard Review
                                    <ArrowUpRight className="w-4 h-4 ml-auto" />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
