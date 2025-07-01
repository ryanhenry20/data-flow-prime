'use client';

import * as React from 'react';
import {
    Calendar,
    Download,
    Mail,
    FileText,
    TrendingUp,
    Users,
    BarChart3,
    Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useNotifications } from '@/hooks/useNotifications';

interface MonthlyReportConfig {
    month: string;
    year: string;
    sections: string[];
    recipients: string[];
    format: 'pdf' | 'html' | 'both';
    includeCharts: boolean;
    includeInsights: boolean;
}

export function MonthlyReportsGenerator() {
    const [config, setConfig] = React.useState<MonthlyReportConfig>({
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear().toString(),
        sections: ['executive-summary', 'key-metrics', 'trends', 'insights'],
        recipients: [],
        format: 'pdf',
        includeCharts: true,
        includeInsights: true,
    });
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [generationProgress, setGenerationProgress] = React.useState(0);
    const { success, error } = useNotifications();

    const reportSections = [
        {
            id: 'executive-summary',
            label: 'Executive Summary',
            description: 'High-level overview and key takeaways',
        },
        {
            id: 'key-metrics',
            label: 'Key Metrics',
            description: 'Primary KPIs and performance indicators',
        },
        {
            id: 'trends',
            label: 'Trend Analysis',
            description: 'Period-over-period comparisons and trends',
        },
        {
            id: 'insights',
            label: 'AI Insights',
            description: 'Automated insights and recommendations',
        },
        {
            id: 'user-analytics',
            label: 'User Analytics',
            description: 'User behavior and engagement metrics',
        },
        {
            id: 'revenue-analysis',
            label: 'Revenue Analysis',
            description: 'Financial performance and revenue trends',
        },
        {
            id: 'conversion-funnel',
            label: 'Conversion Funnel',
            description: 'Conversion analysis and optimization opportunities',
        },
        {
            id: 'traffic-sources',
            label: 'Traffic Sources',
            description: 'Traffic acquisition and source performance',
        },
    ];

    const handleGenerateReport = async () => {
        setIsGenerating(true);
        setGenerationProgress(0);

        try {
            // Simulate report generation process
            const steps = [
                'Collecting data...',
                'Analyzing trends...',
                'Generating insights...',
                'Creating visualizations...',
                'Formatting report...',
                'Finalizing document...',
            ];

            for (let i = 0; i < steps.length; i++) {
                await new Promise((resolve) => setTimeout(resolve, 800));
                setGenerationProgress(((i + 1) / steps.length) * 100);
            }

            success('Monthly report generated successfully!');
        } catch (err) {
            error('Failed to generate monthly report');
        } finally {
            setIsGenerating(false);
            setGenerationProgress(0);
        }
    };

    const handleSectionToggle = (sectionId: string, checked: boolean) => {
        setConfig((prev) => ({
            ...prev,
            sections: checked
                ? [...prev.sections, sectionId]
                : prev.sections.filter((s) => s !== sectionId),
        }));
    };

    return (
        <div className="space-y-6">
            {/* Current Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            This Month
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">December 2024</div>
                        <p className="text-xs text-muted-foreground">
                            Report available in 5 days
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Last Report
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">November</div>
                        <p className="text-xs text-muted-foreground">
                            Generated 3 days ago
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Automation
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Active</div>
                        <p className="text-xs text-muted-foreground">
                            Next: Jan 1, 2025
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Report Configuration */}
            <Tabs defaultValue="config" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="config">Configuration</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="config" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Report Configuration</CardTitle>
                            <CardDescription>
                                Configure the monthly report generation settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Period Selection */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="month">Month</Label>
                                    <Select
                                        value={config.month}
                                        onValueChange={(value) =>
                                            setConfig((prev) => ({
                                                ...prev,
                                                month: value,
                                            }))
                                        }>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from(
                                                { length: 12 },
                                                (_, i) => {
                                                    const month = new Date(
                                                        2024,
                                                        i
                                                    ).toLocaleString(
                                                        'default',
                                                        { month: 'long' }
                                                    );
                                                    return (
                                                        <SelectItem
                                                            key={month}
                                                            value={month}>
                                                            {month}
                                                        </SelectItem>
                                                    );
                                                }
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Select
                                        value={config.year}
                                        onValueChange={(value) =>
                                            setConfig((prev) => ({
                                                ...prev,
                                                year: value,
                                            }))
                                        }>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2024">
                                                2024
                                            </SelectItem>
                                            <SelectItem value="2023">
                                                2023
                                            </SelectItem>
                                            <SelectItem value="2022">
                                                2022
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Report Sections */}
                            <div className="space-y-3">
                                <Label>Report Sections</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {reportSections.map((section) => (
                                        <div
                                            key={section.id}
                                            className="flex items-start space-x-2">
                                            <Checkbox
                                                id={section.id}
                                                checked={config.sections.includes(
                                                    section.id
                                                )}
                                                onCheckedChange={(checked) =>
                                                    handleSectionToggle(
                                                        section.id,
                                                        !!checked
                                                    )
                                                }
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <Label
                                                    htmlFor={section.id}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    {section.label}
                                                </Label>
                                                <p className="text-xs text-muted-foreground">
                                                    {section.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Options */}
                            <div className="space-y-3">
                                <Label>Additional Options</Label>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="include-charts"
                                            checked={config.includeCharts}
                                            onCheckedChange={(checked) =>
                                                setConfig((prev) => ({
                                                    ...prev,
                                                    includeCharts: !!checked,
                                                }))
                                            }
                                        />
                                        <Label htmlFor="include-charts">
                                            Include Charts & Visualizations
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="include-insights"
                                            checked={config.includeInsights}
                                            onCheckedChange={(checked) =>
                                                setConfig((prev) => ({
                                                    ...prev,
                                                    includeInsights: !!checked,
                                                }))
                                            }
                                        />
                                        <Label htmlFor="include-insights">
                                            Include AI-Generated Insights
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            {/* Format Selection */}
                            <div className="space-y-2">
                                <Label>Output Format</Label>
                                <Select
                                    value={config.format}
                                    onValueChange={(
                                        value: 'pdf' | 'html' | 'both'
                                    ) =>
                                        setConfig((prev) => ({
                                            ...prev,
                                            format: value,
                                        }))
                                    }>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pdf">
                                            PDF Only
                                        </SelectItem>
                                        <SelectItem value="html">
                                            HTML Only
                                        </SelectItem>
                                        <SelectItem value="both">
                                            Both PDF and HTML
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Generation Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Generate Report</CardTitle>
                            <CardDescription>
                                Create the monthly report with current
                                configuration
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isGenerating && (
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span>Generating report...</span>
                                        <span>
                                            {Math.round(generationProgress)}%
                                        </span>
                                    </div>
                                    <Progress
                                        value={generationProgress}
                                        className="w-full"
                                    />
                                </div>
                            )}

                            <div className="flex gap-2">
                                <Button
                                    onClick={handleGenerateReport}
                                    disabled={isGenerating}
                                    className="flex-1">
                                    <FileText className="h-4 w-4 mr-2" />
                                    {isGenerating
                                        ? 'Generating...'
                                        : 'Generate Report'}
                                </Button>
                                <Button
                                    variant="outline"
                                    disabled={isGenerating}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Last
                                </Button>
                                <Button
                                    variant="outline"
                                    disabled={isGenerating}>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email Report
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="preview">
                    <Card>
                        <CardHeader>
                            <CardTitle>Report Preview</CardTitle>
                            <CardDescription>
                                Preview of the monthly report structure and
                                content
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="border rounded-lg p-4">
                                    <h3 className="font-semibold text-lg mb-2">
                                        Monthly Analytics Report -{' '}
                                        {config.month} {config.year}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Executive Summary and Key Performance
                                        Indicators
                                    </p>

                                    {config.sections.map((sectionId) => {
                                        const section = reportSections.find(
                                            (s) => s.id === sectionId
                                        );
                                        return section ? (
                                            <div
                                                key={sectionId}
                                                className="mb-3 p-2 bg-muted rounded">
                                                <h4 className="font-medium">
                                                    {section.label}
                                                </h4>
                                                <p className="text-xs text-muted-foreground">
                                                    {section.description}
                                                </p>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle>Report History</CardTitle>
                            <CardDescription>
                                Previously generated monthly reports
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    'November 2024',
                                    'October 2024',
                                    'September 2024',
                                ].map((month) => (
                                    <div
                                        key={month}
                                        className="flex items-center justify-between p-3 border rounded">
                                        <div>
                                            <div className="font-medium">
                                                {month}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                Generated automatically
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Download className="h-3 w-3 mr-1" />
                                                Download
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Mail className="h-3 w-3 mr-1" />
                                                Resend
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
