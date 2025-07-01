'use client';

import * as React from 'react';
import {
    TrendingUp,
    TrendingDown,
    BarChart3,
    PieChart,
    Users,
    Download,
    Mail,
    Clock,
    Target,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface AnalyticsData {
    totalReports: number;
    totalDownloads: number;
    emailsSent: number;
    averageGenerationTime: number;
    successRate: number;
    topReportTypes: Array<{
        type: string;
        count: number;
        percentage: number;
    }>;
    usageByMonth: Array<{
        month: string;
        reports: number;
        downloads: number;
    }>;
    popularReports: Array<{
        name: string;
        downloads: number;
        trend: 'up' | 'down' | 'stable';
    }>;
    performanceMetrics: {
        avgExecutionTime: number;
        peakUsage: string;
        errorRate: number;
        cachehitRate: number;
    };
}

export function ReportAnalytics() {
    const [timeRange, setTimeRange] = React.useState('30d');
    const [analyticsData, setAnalyticsData] =
        React.useState<AnalyticsData | null>(null);

    // Mock analytics data
    React.useEffect(() => {
        const mockData: AnalyticsData = {
            totalReports: 156,
            totalDownloads: 1234,
            emailsSent: 456,
            averageGenerationTime: 38.5,
            successRate: 96.8,
            topReportTypes: [
                { type: 'Monthly Reports', count: 48, percentage: 45.2 },
                { type: 'Custom Reports', count: 34, percentage: 32.1 },
                { type: 'Scheduled Reports', count: 24, percentage: 22.7 },
            ],
            usageByMonth: [
                { month: 'Oct', reports: 42, downloads: 312 },
                { month: 'Nov', reports: 38, downloads: 289 },
                { month: 'Dec', reports: 45, downloads: 356 },
            ],
            popularReports: [
                {
                    name: 'Monthly Analytics Report',
                    downloads: 234,
                    trend: 'up',
                },
                { name: 'User Engagement Report', downloads: 189, trend: 'up' },
                { name: 'Revenue Analysis', downloads: 156, trend: 'stable' },
                {
                    name: 'Traffic Sources Report',
                    downloads: 134,
                    trend: 'down',
                },
                {
                    name: 'Conversion Funnel Report',
                    downloads: 98,
                    trend: 'up',
                },
            ],
            performanceMetrics: {
                avgExecutionTime: 38.5,
                peakUsage: '09:00 AM',
                errorRate: 3.2,
                cachehitRate: 89.4,
            },
        };

        // Simulate API delay
        setTimeout(() => setAnalyticsData(mockData), 500);
    }, [timeRange]);

    const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up':
                return <TrendingUp className="h-3 w-3 text-green-500" />;
            case 'down':
                return <TrendingDown className="h-3 w-3 text-red-500" />;
            default:
                return <div className="h-3 w-3 rounded-full bg-gray-400" />;
        }
    };

    if (!analyticsData) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Report Analytics</CardTitle>
                    <CardDescription>Loading analytics data...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="h-16 bg-muted rounded animate-pulse"
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Report Analytics</CardTitle>
                        <CardDescription>
                            Usage patterns and performance metrics for your
                            reports
                        </CardDescription>
                    </div>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                            <SelectItem value="90d">Last 90 days</SelectItem>
                            <SelectItem value="1y">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">
                                Total Reports
                            </span>
                        </div>
                        <div className="text-2xl font-bold">
                            {analyticsData.totalReports}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Generated in the last {timeRange}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Download className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">
                                Downloads
                            </span>
                        </div>
                        <div className="text-2xl font-bold">
                            {analyticsData.totalDownloads}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Total file downloads
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-purple-500" />
                            <span className="text-sm font-medium">
                                Emails Sent
                            </span>
                        </div>
                        <div className="text-2xl font-bold">
                            {analyticsData.emailsSent}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Automated distributions
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium">
                                Avg. Generation
                            </span>
                        </div>
                        <div className="text-2xl font-bold">
                            {analyticsData.averageGenerationTime}s
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Average processing time
                        </div>
                    </div>
                </div>

                {/* Success Rate */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Success Rate
                        </span>
                        <Badge
                            variant={
                                analyticsData.successRate >= 95
                                    ? 'default'
                                    : 'secondary'
                            }>
                            {analyticsData.successRate}%
                        </Badge>
                    </div>
                    <Progress
                        value={analyticsData.successRate}
                        className="h-2"
                    />
                    <div className="text-xs text-muted-foreground">
                        {analyticsData.successRate >= 95 ? 'Excellent' : 'Good'}{' '}
                        performance -
                        {Math.round(
                            ((100 - analyticsData.successRate) *
                                analyticsData.totalReports) /
                                100
                        )}{' '}
                        failed reports
                    </div>
                </div>

                {/* Report Types Distribution */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium">
                        Report Types Distribution
                    </h4>
                    <div className="space-y-2">
                        {analyticsData.topReportTypes.map((type) => (
                            <div
                                key={type.type}
                                className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <PieChart className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-sm">{type.type}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-sm text-muted-foreground">
                                        {type.count}
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="text-xs">
                                        {type.percentage}%
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Reports */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium">
                        Most Downloaded Reports
                    </h4>
                    <div className="space-y-2">
                        {analyticsData.popularReports
                            .slice(0, 5)
                            .map((report, index) => (
                                <div
                                    key={report.name}
                                    className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground w-4">
                                            #{index + 1}
                                        </span>
                                        <span className="text-sm truncate">
                                            {report.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">
                                            {report.downloads}
                                        </span>
                                        {getTrendIcon(report.trend)}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                    Peak Usage
                                </span>
                                <span className="text-xs font-medium">
                                    {analyticsData.performanceMetrics.peakUsage}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                    Error Rate
                                </span>
                                <span className="text-xs font-medium">
                                    {analyticsData.performanceMetrics.errorRate}
                                    %
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                    Cache Hit Rate
                                </span>
                                <span className="text-xs font-medium">
                                    {
                                        analyticsData.performanceMetrics
                                            .cachehitRate
                                    }
                                    %
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                    Avg. Exec Time
                                </span>
                                <span className="text-xs font-medium">
                                    {
                                        analyticsData.performanceMetrics
                                            .avgExecutionTime
                                    }
                                    s
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Monthly Usage Trend */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium">Usage Trend</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {analyticsData.usageByMonth.map((month) => (
                            <div
                                key={month.month}
                                className="text-center space-y-1">
                                <div className="text-2xl font-bold">
                                    {month.reports}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {month.month}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {month.downloads} downloads
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insights */}
                <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                            <h5 className="text-sm font-medium">
                                Key Insights
                            </h5>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>
                                    • Monthly reports are your most popular
                                    format (45.2% of all reports)
                                </li>
                                <li>
                                    • Peak usage occurs at 9:00 AM - consider
                                    optimization for morning loads
                                </li>
                                <li>
                                    • 96.8% success rate indicates excellent
                                    system reliability
                                </li>
                                <li>
                                    • Average generation time of 38.5s is within
                                    optimal range
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
