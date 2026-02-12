'use client';

import { useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAIInsights } from '@/hooks/useAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Lightbulb, Sparkles, TrendingUp, TriangleAlert } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

const toneByType: Record<string, string> = {
    opportunity: 'bg-emerald-100 text-emerald-700',
    recommendation: 'bg-violet-100 text-violet-700',
    insight: 'bg-blue-100 text-blue-700',
    alert: 'bg-amber-100 text-amber-700',
};

const iconByType: Record<string, any> = {
    opportunity: TrendingUp,
    recommendation: Sparkles,
    insight: Lightbulb,
    alert: TriangleAlert,
};

export default function AIInsightsPage() {
    const { insights, loading } = useAIInsights();
    const [filter, setFilter] = useState('all');
    const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
    const { success } = useNotifications();

    const filtered = useMemo(
        () =>
            insights.filter((item) =>
                filter === 'all' ? true : item.type === filter
            ),
        [insights, filter]
    );

    const highImpactCount = insights.filter((item) => item.impact_level === 'High').length;
    const avgConfidence =
        insights.length > 0
            ? Math.round(
                  insights.reduce((sum, item) => sum + item.confidence, 0) /
                      insights.length
              )
            : 0;

    const markReviewed = (id: string) => {
        setReviewedIds((prev) => new Set(prev).add(id));
        success('Insight marked as reviewed');
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            AI Insights
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Actionable recommendations generated from current analytics behavior.
                        </p>
                    </div>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Filter insights" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All insight types</SelectItem>
                            <SelectItem value="opportunity">Opportunities</SelectItem>
                            <SelectItem value="recommendation">Recommendations</SelectItem>
                            <SelectItem value="insight">Insights</SelectItem>
                            <SelectItem value="alert">Alerts</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-bold">{insights.length}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                High Impact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-bold">{highImpactCount}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Avg Confidence
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-bold">{avgConfidence}%</CardContent>
                    </Card>
                </div>

                {loading ? (
                    <div className="grid gap-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Card key={idx}>
                                <CardContent className="h-32 animate-pulse" />
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filtered.map((insight) => {
                            const Icon = iconByType[insight.type] || Lightbulb;
                            const reviewed = reviewedIds.has(insight.id);

                            return (
                                <Card key={insight.id}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                                                    toneByType[insight.type] ||
                                                    'bg-slate-100 text-slate-700'
                                                }`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="font-semibold text-lg">
                                                        {insight.title}
                                                    </h3>
                                                    <Badge variant="outline">
                                                        {insight.impact_level} impact
                                                    </Badge>
                                                    <Badge variant="secondary">
                                                        {insight.confidence}% confidence
                                                    </Badge>
                                                </div>
                                                <p className="text-muted-foreground">
                                                    {insight.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() =>
                                                            success(
                                                                `Task created for "${insight.title}"`
                                                            )
                                                        }>
                                                        Create Task
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        disabled={reviewed}
                                                        onClick={() =>
                                                            markReviewed(insight.id)
                                                        }>
                                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                                        {reviewed
                                                            ? 'Reviewed'
                                                            : 'Mark Reviewed'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </Layout>
    );
}
