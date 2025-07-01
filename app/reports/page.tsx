'use client';

import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportTemplates } from '@/components/export/ReportTemplates';
import { ScheduledReports } from '@/components/export/ScheduledReports';
import { EmailReports } from '@/components/export/EmailReports';
import { MonthlyReportsGenerator } from '@/components/reports/MonthlyReportsGenerator';
import { CustomReportBuilder } from '@/components/reports/CustomReportBuilder';
import { ReportHistory } from '@/components/reports/ReportHistory';
import { ReportAnalytics } from '@/components/reports/ReportAnalytics';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    FileText,
    Calendar,
    Settings,
    TrendingUp,
    Download,
    Mail,
    Clock,
    BarChart3,
    PlusCircle,
    History,
    Sparkles,
} from 'lucide-react';
import { useState } from 'react';

export default function ReportsPage() {
    const [activeReports, setActiveReports] = useState(12);
    const [scheduledReports, setScheduledReports] = useState(8);
    const [totalGenerated, setTotalGenerated] = useState(247);

    return (
        <Layout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Advanced Reports & Analytics
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Comprehensive reporting system with automated
                            generation, custom builders, and distribution
                            management.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            New Report
                        </Button>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export All
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Reports
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {activeReports}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Currently active report templates
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Scheduled
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {scheduledReports}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Automated scheduled reports
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Generated
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalGenerated}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Total reports generated this month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Delivery Rate
                            </CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">98.5%</div>
                            <p className="text-xs text-muted-foreground">
                                Successful email delivery rate
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Report Interface */}
                <Tabs defaultValue="generator" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger
                            value="generator"
                            className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            Monthly Reports
                        </TabsTrigger>
                        <TabsTrigger
                            value="builder"
                            className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Custom Builder
                        </TabsTrigger>
                        <TabsTrigger
                            value="templates"
                            className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Templates
                        </TabsTrigger>
                        <TabsTrigger
                            value="scheduling"
                            className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Scheduling
                        </TabsTrigger>
                        <TabsTrigger
                            value="distribution"
                            className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Distribution
                        </TabsTrigger>
                        <TabsTrigger
                            value="history"
                            className="flex items-center gap-2">
                            <History className="h-4 w-4" />
                            History
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="generator" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Automated Monthly Reports
                                </h2>
                                <p className="text-muted-foreground">
                                    Generate comprehensive monthly reports with
                                    executive summaries, trend analysis, and
                                    automated insights.
                                </p>
                            </div>
                            <MonthlyReportsGenerator />
                        </div>
                    </TabsContent>

                    <TabsContent value="builder" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Custom Report Builder
                                </h2>
                                <p className="text-muted-foreground">
                                    Build custom reports with drag-and-drop
                                    interface, multiple data sources, and
                                    flexible export options.
                                </p>
                            </div>
                            <CustomReportBuilder />
                        </div>
                    </TabsContent>

                    <TabsContent value="templates" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Report Templates
                                </h2>
                                <p className="text-muted-foreground">
                                    Manage and customize report templates for
                                    consistent formatting and branding.
                                </p>
                            </div>
                            <ReportTemplates />
                        </div>
                    </TabsContent>

                    <TabsContent value="scheduling" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Report Scheduling
                                </h2>
                                <p className="text-muted-foreground">
                                    Configure automated report generation with
                                    flexible scheduling options.
                                </p>
                            </div>
                            <ScheduledReports />
                        </div>
                    </TabsContent>

                    <TabsContent value="distribution" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Email Distribution
                                </h2>
                                <p className="text-muted-foreground">
                                    Manage email distribution lists and delivery
                                    settings for automated report sharing.
                                </p>
                            </div>
                            <EmailReports />
                        </div>
                    </TabsContent>

                    <TabsContent value="history" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Report History & Analytics
                                </h2>
                                <p className="text-muted-foreground">
                                    View report generation history, track
                                    performance metrics, and analyze usage
                                    patterns.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <ReportHistory />
                                <ReportAnalytics />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Phase 2 Features Highlight */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Phase 2: Advanced Reporting Features
                        </CardTitle>
                        <CardDescription>
                            Enterprise-grade reporting capabilities with
                            automation and advanced analytics
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-blue-500" />
                                    Automated Monthly Reports
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Executive summaries, trend analysis,
                                    performance insights with automated
                                    generation and delivery.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-green-500" />
                                    Custom Report Builder
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Drag-and-drop interface with custom date
                                    ranges, multiple data sources, and
                                    template-based creation.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-purple-500" />
                                    Flexible Scheduling
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Daily, weekly, monthly, and quarterly
                                    scheduling with automated insights
                                    generation.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-orange-500" />
                                    Email Distribution
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Distribution lists, automated delivery, and
                                    comprehensive email tracking and analytics.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-red-500" />
                                    Export Options
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    PDF, CSV, Excel export with professional
                                    formatting and custom branding options.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <History className="h-4 w-4 text-indigo-500" />
                                    History & Versioning
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Complete audit trail with report versioning,
                                    performance tracking, and usage analytics.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
