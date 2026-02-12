'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { portfolioClient } from '@/lib/portfolio-client';
import type { SearchResultItem } from '@/lib/portfolio-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, User, Activity, Sparkles, ShieldAlert, BrainCircuit } from 'lucide-react';

const iconByType: Record<string, any> = {
    user: User,
    event: Activity,
    insight: Sparkles,
    alert: ShieldAlert,
    prediction: BrainCircuit,
};

const labelByType: Record<string, string> = {
    user: 'User',
    event: 'Event',
    insight: 'Insight',
    alert: 'Alert',
    prediction: 'Prediction',
};

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResultItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const data = await portfolioClient.search(query);
                setResults(data);
            } finally {
                setLoading(false);
            }
        }, 220);

        return () => clearTimeout(handler);
    }, [query]);

    const grouped = useMemo(() => {
        const map = new Map<string, SearchResultItem[]>();
        for (const item of results) {
            const key = labelByType[item.type] || 'Other';
            const list = map.get(key) || [];
            list.push(item);
            map.set(key, list);
        }
        return Array.from(map.entries());
    }, [results]);

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Search</h1>
                    <p className="text-muted-foreground mt-1">
                        Search across users, insights, alerts, predictions, and events.
                    </p>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Try: conversion, amelia, checkout, anomaly..."
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {loading && (
                    <Card>
                        <CardContent className="pt-6 text-sm text-muted-foreground">
                            Searching...
                        </CardContent>
                    </Card>
                )}

                {!loading && query.trim() && results.length === 0 && (
                    <Card>
                        <CardContent className="pt-6 text-sm text-muted-foreground">
                            No results found for &quot;{query}&quot;.
                        </CardContent>
                    </Card>
                )}

                {!loading &&
                    grouped.map(([group, items]) => (
                        <Card key={group}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">{group}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {items.map((item) => {
                                    const Icon = iconByType[item.type] || Search;
                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.route}
                                            className="block rounded-md border p-3 hover:bg-muted/40 transition-colors">
                                            <div className="flex items-start gap-3">
                                                <Icon className="w-4 h-4 mt-1 text-muted-foreground" />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">
                                                            {item.title}
                                                        </span>
                                                        <Badge variant="outline">
                                                            {labelByType[item.type]}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {item.subtitle}
                                                    </p>
                                                    {item.metadata && (
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {item.metadata}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </Layout>
    );
}
