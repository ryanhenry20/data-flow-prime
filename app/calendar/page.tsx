'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { portfolioClient } from '@/lib/portfolio-client';
import type { CalendarEntry } from '@/lib/portfolio-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNotifications } from '@/hooks/useNotifications';

const typeTone: Record<string, string> = {
    report: 'bg-blue-100 text-blue-700',
    meeting: 'bg-emerald-100 text-emerald-700',
    experiment: 'bg-violet-100 text-violet-700',
    release: 'bg-amber-100 text-amber-700',
};

export default function CalendarPage() {
    const [entries, setEntries] = useState<CalendarEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [eventType, setEventType] = useState<CalendarEntry['type']>('meeting');
    const { success, error } = useNotifications();

    const loadEntries = async () => {
        setLoading(true);
        try {
            const data = await portfolioClient.getCalendarEntries();
            setEntries(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        const payload = {
            title: String(form.get('title') || ''),
            owner: String(form.get('owner') || ''),
            date: String(form.get('date') || ''),
            start_time: String(form.get('start_time') || ''),
            end_time: String(form.get('end_time') || ''),
            attendees: Number(form.get('attendees') || 1),
            type: eventType,
        };

        if (!payload.title || !payload.owner || !payload.date) {
            error('Please fill title, owner, and date');
            return;
        }

        await portfolioClient.createCalendarEntry(payload);
        success('Event scheduled successfully');
        (event.currentTarget as HTMLFormElement).reset();
        loadEntries();
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Calendar
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Schedule reporting milestones, experiments, and release checkpoints.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Create Event</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid grid-cols-1 md:grid-cols-3 gap-3" onSubmit={onSubmit}>
                            <Input name="title" placeholder="Event title" />
                            <Input name="owner" placeholder="Owner name" />
                            <Input name="attendees" placeholder="Attendees" type="number" min={1} />
                            <Input name="date" type="date" />
                            <Input name="start_time" type="time" />
                            <Input name="end_time" type="time" />
                            <Select
                                value={eventType}
                                onValueChange={(value) =>
                                    setEventType(value as CalendarEntry['type'])
                                }>
                                <SelectTrigger>
                                    <SelectValue placeholder="Event type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="meeting">Meeting</SelectItem>
                                    <SelectItem value="report">Report</SelectItem>
                                    <SelectItem value="experiment">Experiment</SelectItem>
                                    <SelectItem value="release">Release</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="submit">Add Event</Button>
                        </form>
                    </CardContent>
                </Card>

                {loading ? (
                    <div className="grid gap-3">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Card key={idx}>
                                <CardContent className="h-20 animate-pulse" />
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {entries.map((entry) => (
                            <Card key={entry.id}>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                        <div className="space-y-1">
                                            <div className="font-semibold">{entry.title}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {entry.owner} • {entry.date} • {entry.start_time} -{' '}
                                                {entry.end_time}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    typeTone[entry.type]
                                                }`}>
                                                {entry.type}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {entry.attendees} attendees
                                            </span>
                                        </div>
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
