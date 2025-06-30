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

// Sample data for charts
const revenueData = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Apr', value: 61000 },
    { name: 'May', value: 55000 },
    { name: 'Jun', value: 67000 },
];

const trafficData = [
    { name: 'Mon', value: 12400 },
    { name: 'Tue', value: 13600 },
    { name: 'Wed', value: 11800 },
    { name: 'Thu', value: 14200 },
    { name: 'Fri', value: 16800 },
    { name: 'Sat', value: 15200 },
    { name: 'Sun', value: 13400 },
];

const userSegmentData = [
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 35 },
    { name: 'Tablet', value: 20 },
];

const conversionData = [
    { name: 'Q1', value: 23 },
    { name: 'Q2', value: 27 },
    { name: 'Q3', value: 31 },
    { name: 'Q4', value: 29 },
];

export default function HomePage() {
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
                        value="8,549"
                        change={8.2}
                        icon={Users}
                        trend="up"
                        color="blue"
                    />
                    <KPICard
                        title="Conversion Rate"
                        value="3.24%"
                        change={-2.1}
                        icon={ShoppingCart}
                        trend="down"
                        color="orange"
                    />
                    <KPICard
                        title="Avg. Session"
                        value="4m 32s"
                        change={15.3}
                        icon={Activity}
                        trend="up"
                        color="purple"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Charts */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Revenue Chart */}
                        <ChartCard
                            title="Revenue Overview"
                            type="area"
                            data={revenueData}
                            height={350}
                            color="#3b82f6"
                        />

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
