'use client';

import { useEffect, useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { portfolioClient } from '@/lib/portfolio-client';
import type { PredictionModel } from '@/lib/portfolio-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Target, BrainCircuit } from 'lucide-react';
import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';

export default function PredictionsPage() {
    const [predictions, setPredictions] = useState<PredictionModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await portfolioClient.getPredictions();
                setPredictions(data);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const topPrediction = useMemo(
        () =>
            [...predictions].sort((a, b) => b.projected_change - a.projected_change)[0],
        [predictions]
    );

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Predictive Intelligence
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Forecasts combine recent performance trends with model-driven projections.
                    </p>
                </div>

                {topPrediction && (
                    <Card className="border-blue-200 bg-blue-50/40">
                        <CardContent className="pt-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <BrainCircuit className="w-5 h-5 text-blue-600" />
                                <p className="font-medium">
                                    Highest expected growth:
                                    <span className="ml-2 font-semibold">
                                        {topPrediction.metric}
                                    </span>
                                </p>
                                <Badge variant="secondary">
                                    {topPrediction.projected_change.toFixed(1)}% projected
                                </Badge>
                                <Badge variant="outline">
                                    {topPrediction.confidence}% confidence
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <Card key={idx}>
                                <CardContent className="h-72 animate-pulse" />
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {predictions.map((model) => (
                            <Card key={model.id} className="overflow-hidden">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <CardTitle className="text-lg">
                                            {model.metric}
                                        </CardTitle>
                                        <Badge
                                            variant={
                                                model.projected_change >= 0
                                                    ? 'secondary'
                                                    : 'destructive'
                                            }>
                                            {model.projected_change >= 0 ? '+' : ''}
                                            {model.projected_change.toFixed(1)}%
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-3 gap-3 text-sm">
                                        <div className="p-3 rounded-md bg-muted/60">
                                            <div className="text-muted-foreground">
                                                Current
                                            </div>
                                            <div className="font-semibold">
                                                {model.current_value.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-md bg-muted/60">
                                            <div className="text-muted-foreground">
                                                Projected
                                            </div>
                                            <div className="font-semibold">
                                                {model.projected_value.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-md bg-muted/60">
                                            <div className="text-muted-foreground">
                                                Confidence
                                            </div>
                                            <div className="font-semibold">
                                                {model.confidence}%
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-48">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={model.points}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="period" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line
                                                    type="monotone"
                                                    dataKey="actual"
                                                    stroke="#2563eb"
                                                    strokeWidth={2}
                                                    isAnimationActive={false}
                                                    dot={false}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="forecast"
                                                    stroke="#9333ea"
                                                    strokeWidth={2}
                                                    isAnimationActive={false}
                                                    strokeDasharray="6 4"
                                                    dot={false}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="rounded-md border p-3">
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <Target className="w-4 h-4 text-blue-600" />
                                            Recommended action
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {model.recommendation}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Forecast Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {predictions.map((prediction) => (
                                <div
                                    key={prediction.id}
                                    className="flex items-center justify-between rounded-md border p-3">
                                    <div>
                                        <div className="font-medium">{prediction.metric}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {prediction.horizon}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        {prediction.projected_change >= 0 ? (
                                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4 text-red-600" />
                                        )}
                                        {prediction.projected_change >= 0 ? '+' : ''}
                                        {prediction.projected_change.toFixed(1)}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
