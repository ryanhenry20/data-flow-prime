'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    TrendingUp,
    AlertTriangle,
    Lightbulb,
    ArrowRight,
    Sparkles,
    Loader2,
} from 'lucide-react';
import { useAIInsights } from '@/hooks/useAnalytics';

const getInsightIcon = (type: string) => {
    switch (type) {
        case 'opportunity':
            return TrendingUp;
        case 'alert':
            return AlertTriangle;
        case 'insight':
        case 'recommendation':
            return Lightbulb;
        default:
            return Lightbulb;
    }
};

const getInsightColor = (type: string) => {
    switch (type) {
        case 'opportunity':
            return 'green';
        case 'alert':
            return 'orange';
        case 'insight':
        case 'recommendation':
            return 'purple';
        default:
            return 'purple';
    }
};

export function AIInsightsPanel() {
    const { insights, loading, error } = useAIInsights();

    if (loading) {
        return (
            <Card className="bg-gradient-to-br from-white to-ai-purple/5 border border-ai-purple/20 shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-ai-gradient-1 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <CardTitle className="text-lg font-semibold text-neutral-900">
                            AI Insights
                        </CardTitle>
                        <Badge
                            variant="secondary"
                            className="ml-auto bg-ai-purple/10 text-ai-purple">
                            Live
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-2 text-neutral-500">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Loading AI insights...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="bg-gradient-to-br from-white to-ai-purple/5 border border-ai-purple/20 shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-ai-gradient-1 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <CardTitle className="text-lg font-semibold text-neutral-900">
                            AI Insights
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="py-8">
                    <div className="text-center text-neutral-500">
                        <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                        <p>Failed to load AI insights</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-gradient-to-br from-white to-ai-purple/5 border border-ai-purple/20 shadow-lg">
            <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-ai-gradient-1 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-neutral-900">
                        AI Insights
                    </CardTitle>
                    <Badge
                        variant="secondary"
                        className="ml-auto bg-ai-purple/10 text-ai-purple">
                        Live
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {insights.length === 0 ? (
                    <div className="text-center py-8 text-neutral-500">
                        <Lightbulb className="w-8 h-8 mx-auto mb-2" />
                        <p>No AI insights available</p>
                        <p className="text-sm">
                            Check back soon for new insights
                        </p>
                    </div>
                ) : (
                    insights.map((insight) => {
                        const Icon = getInsightIcon(insight.type);
                        const color = getInsightColor(insight.type);
                        const colorClasses = {
                            green: 'text-success-600 bg-success-50',
                            orange: 'text-warning-600 bg-warning-50',
                            purple: 'text-ai-purple bg-purple-50',
                        };

                        return (
                            <div
                                key={insight.id}
                                className="p-4 rounded-xl bg-white/50 border border-neutral-100 hover:shadow-md transition-all duration-200 group">
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            colorClasses[
                                                color as keyof typeof colorClasses
                                            ]
                                        }`}>
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-semibold text-neutral-900 text-base">
                                                {insight.title}
                                            </h4>
                                            <Badge
                                                variant={
                                                    insight.impact_level ===
                                                    'High'
                                                        ? 'destructive'
                                                        : insight.impact_level ===
                                                          'Medium'
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                                className="text-xs">
                                                {insight.impact_level}
                                            </Badge>
                                        </div>

                                        <p className="text-sm text-neutral-600 mb-3 leading-relaxed">
                                            {insight.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-neutral-500 font-medium">
                                                    Confidence:
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-16 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-ai-purple rounded-full transition-all duration-500"
                                                            style={{
                                                                width: `${insight.confidence}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-semibold text-neutral-700">
                                                        {insight.confidence}%
                                                    </span>
                                                </div>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-ai-purple hover:text-ai-purple hover:bg-purple-50">
                                                View Details
                                                <ArrowRight className="w-3 h-3 ml-1" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}

                <Button
                    variant="outline"
                    className="w-full border-ai-purple/30 text-ai-purple hover:bg-ai-purple hover:text-white transition-all duration-200">
                    View All AI Insights
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </CardContent>
        </Card>
    );
}
