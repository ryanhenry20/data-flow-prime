'use client';

import { useEffect, useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { portfolioClient } from '@/lib/portfolio-client';
import type { SmartAlert } from '@/lib/portfolio-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, CircleAlert, ShieldAlert } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

const severityStyle: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-blue-100 text-blue-700',
};

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<SmartAlert[]>([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const { success, error } = useNotifications();

    const loadAlerts = async () => {
        setLoading(true);
        try {
            const data = await portfolioClient.getAlerts();
            setAlerts(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAlerts();
    }, []);

    const filtered = useMemo(
        () =>
            alerts.filter((alertItem) =>
                statusFilter === 'all'
                    ? true
                    : alertItem.status === statusFilter
            ),
        [alerts, statusFilter]
    );

    const counts = useMemo(
        () => ({
            open: alerts.filter((item) => item.status === 'open').length,
            acknowledged: alerts.filter((item) => item.status === 'acknowledged').length,
            resolved: alerts.filter((item) => item.status === 'resolved').length,
        }),
        [alerts]
    );

    const mutateStatus = async (
        id: string,
        nextStatus: SmartAlert['status']
    ) => {
        const updated = await portfolioClient.updateAlertStatus(id, nextStatus);
        if (!updated) {
            error('Unable to update alert status');
            return;
        }
        setAlerts((prev) => prev.map((item) => (item.id === id ? updated : item)));
        success(`Alert moved to ${nextStatus}`);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Smart Alerts
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Monitor anomalies and operational issues with clear next actions.
                        </p>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="acknowledged">Acknowledged</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-sm text-muted-foreground">Open</div>
                            <div className="text-2xl font-bold">{counts.open}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-sm text-muted-foreground">Acknowledged</div>
                            <div className="text-2xl font-bold">{counts.acknowledged}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-sm text-muted-foreground">Resolved</div>
                            <div className="text-2xl font-bold">{counts.resolved}</div>
                        </CardContent>
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
                        {filtered.map((alertItem) => (
                            <Card key={alertItem.id}>
                                <CardHeader className="pb-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <CardTitle className="text-lg">
                                            {alertItem.title}
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Badge className={severityStyle[alertItem.severity]}>
                                                {alertItem.severity}
                                            </Badge>
                                            <Badge variant="outline">
                                                {alertItem.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-muted-foreground">
                                        {alertItem.description}
                                    </p>
                                    <div className="rounded-md border bg-muted/30 p-3">
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <ShieldAlert className="w-4 h-4 text-blue-600" />
                                            Recommended response
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {alertItem.recommendation}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {alertItem.status !== 'acknowledged' && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    mutateStatus(
                                                        alertItem.id,
                                                        'acknowledged'
                                                    )
                                                }>
                                                <CircleAlert className="w-4 h-4 mr-2" />
                                                Acknowledge
                                            </Button>
                                        )}
                                        {alertItem.status !== 'resolved' && (
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    mutateStatus(alertItem.id, 'resolved')
                                                }>
                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                Mark Resolved
                                            </Button>
                                        )}
                                        <span className="text-xs text-muted-foreground self-center">
                                            {new Date(
                                                alertItem.created_at
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
