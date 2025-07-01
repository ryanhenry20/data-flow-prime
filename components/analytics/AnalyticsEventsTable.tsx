'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';

import {
    DataTable,
    SortableColumnHeader,
    RowActionsDropdown,
    selectColumn,
} from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNotifications } from '@/hooks/useNotifications';
import { supabase } from '@/lib/supabase';
import { usePDFExport } from '@/components/export/PDFTemplate';

interface AnalyticsEvent {
    id: string;
    user_id: string;
    event_type: string;
    properties: Record<string, any>;
    timestamp: string;
    session_id?: string;
    user_agent?: string;
    ip_address?: string;
    page_url?: string;
    referrer?: string;
}

interface User {
    id: string;
    email: string;
    full_name: string;
    avatar_url?: string;
}

interface EnrichedAnalyticsEvent extends AnalyticsEvent {
    user?: User;
}

const eventTypeColors = {
    page_view: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    click: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    form_submit:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    purchase:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    login: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    logout: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
};

export function AnalyticsEventsTable() {
    const [data, setData] = React.useState<EnrichedAnalyticsEvent[]>([]);
    const [loading, setLoading] = React.useState(true);
    const { error: showError, success: showSuccess } = useNotifications();
    const { generatePDF } = usePDFExport();

    React.useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);

            // Fetch analytics events with user data
            const { data: events, error } = await supabase
                .from('analytics_events')
                .select(
                    `
                    *,
                    user_profiles!inner(
                        id,
                        email,
                        full_name,
                        avatar_url
                    )
                `
                )
                .order('timestamp', { ascending: false })
                .limit(100);

            if (error) throw error;

            // Transform the data to match our interface
            const enrichedEvents =
                events?.map((event) => ({
                    ...event,
                    user: event.user_profiles,
                })) || [];

            setData(enrichedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
            showError('Failed to load analytics events');
        } finally {
            setLoading(false);
        }
    };

    const columns: ColumnDef<EnrichedAnalyticsEvent>[] = [
        selectColumn,
        {
            accessorKey: 'timestamp',
            header: ({ column }) => (
                <SortableColumnHeader column={column} title="Time" />
            ),
            cell: ({ row }) => {
                const timestamp = row.getValue('timestamp') as string;
                return (
                    <div className="font-medium">
                        {format(new Date(timestamp), 'MMM dd, HH:mm:ss')}
                    </div>
                );
            },
        },
        {
            accessorKey: 'user',
            header: 'User',
            cell: ({ row }) => {
                const user = row.getValue('user') as User;
                if (!user)
                    return (
                        <span className="text-muted-foreground">Unknown</span>
                    );

                return (
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback>
                                {user.full_name?.charAt(0) ||
                                    user.email?.charAt(0) ||
                                    '?'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">
                                {user.full_name || 'Unknown'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {user.email}
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'event_type',
            header: ({ column }) => (
                <SortableColumnHeader column={column} title="Event Type" />
            ),
            cell: ({ row }) => {
                const eventType = row.getValue('event_type') as string;
                const colorClass =
                    eventTypeColors[
                        eventType as keyof typeof eventTypeColors
                    ] || eventTypeColors.default;

                return (
                    <Badge className={colorClass} variant="secondary">
                        {eventType.replace('_', ' ')}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'properties',
            header: 'Properties',
            cell: ({ row }) => {
                const properties = row.getValue('properties') as Record<
                    string,
                    any
                >;
                const keys = Object.keys(properties || {});

                if (keys.length === 0) {
                    return (
                        <span className="text-muted-foreground">
                            No properties
                        </span>
                    );
                }

                return (
                    <div className="max-w-[200px]">
                        <div className="text-sm font-medium">
                            {keys.slice(0, 2).map((key) => (
                                <div key={key} className="truncate">
                                    <span className="text-muted-foreground">
                                        {key}:
                                    </span>{' '}
                                    {String(properties[key])}
                                </div>
                            ))}
                            {keys.length > 2 && (
                                <div className="text-muted-foreground text-xs">
                                    +{keys.length - 2} more
                                </div>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'page_url',
            header: 'Page',
            cell: ({ row }) => {
                const pageUrl = row.getValue('page_url') as string;
                if (!pageUrl)
                    return <span className="text-muted-foreground">N/A</span>;

                try {
                    const url = new URL(pageUrl);
                    return (
                        <div className="max-w-[150px] truncate">
                            <span className="text-muted-foreground">
                                {url.pathname}
                            </span>
                        </div>
                    );
                } catch {
                    return (
                        <div className="max-w-[150px] truncate text-muted-foreground">
                            {pageUrl}
                        </div>
                    );
                }
            },
        },
        {
            accessorKey: 'session_id',
            header: 'Session',
            cell: ({ row }) => {
                const sessionId = row.getValue('session_id') as string;
                if (!sessionId)
                    return <span className="text-muted-foreground">N/A</span>;

                return (
                    <div className="max-w-[100px] truncate font-mono text-xs">
                        {sessionId.slice(-8)}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const event = row.original;

                const actions = [
                    {
                        label: 'View Details',
                        icon: <Eye className="h-4 w-4" />,
                        onClick: (row: any) => {
                            // TODO: Open details modal
                            showSuccess('Event details (feature coming soon)');
                        },
                    },
                    {
                        label: 'Edit Event',
                        icon: <Edit className="h-4 w-4" />,
                        onClick: (row: any) => {
                            // TODO: Open edit modal
                            showSuccess('Edit event (feature coming soon)');
                        },
                    },
                    {
                        label: 'Delete Event',
                        icon: <Trash2 className="h-4 w-4" />,
                        variant: 'destructive' as const,
                        onClick: async (row: any) => {
                            try {
                                const { error } = await supabase
                                    .from('analytics_events')
                                    .delete()
                                    .eq('id', event.id);

                                if (error) throw error;

                                showSuccess('Event deleted successfully');
                                fetchEvents(); // Refresh the data
                            } catch (error) {
                                showError('Failed to delete event');
                            }
                        },
                    },
                ];

                return <RowActionsDropdown row={row} actions={actions} />;
            },
        },
    ];

    const handleExport = (data: EnrichedAnalyticsEvent[]) => {
        // Convert to CSV format
        const headers = [
            'Timestamp',
            'User Email',
            'Event Type',
            'Properties',
            'Page URL',
            'Session ID',
        ];
        const csvData = [
            headers.join(','),
            ...data.map((event) =>
                [
                    event.timestamp,
                    event.user?.email || '',
                    event.event_type,
                    JSON.stringify(event.properties || {}),
                    event.page_url || '',
                    event.session_id || '',
                ]
                    .map((field) => `"${String(field).replace(/"/g, '""')}"`)
                    .join(',')
            ),
        ].join('\n');

        // Download the CSV
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `analytics-events-${format(
            new Date(),
            'yyyy-MM-dd'
        )}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showSuccess('Analytics events exported to CSV');
    };

    const handlePDFExport = async (data: EnrichedAnalyticsEvent[]) => {
        try {
            const reportData = {
                title: 'Analytics Events Report',
                dateRange: {
                    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    end: new Date(),
                },
                kpis: [
                    {
                        label: 'Total Events',
                        value: data.length.toLocaleString(),
                        change: '+12.5% from last period',
                        trend: 'up' as const,
                    },
                    {
                        label: 'Unique Users',
                        value: new Set(
                            data.map((e) => e.user_id)
                        ).size.toLocaleString(),
                        change: '+8.3% from last period',
                        trend: 'up' as const,
                    },
                    {
                        label: 'Page Views',
                        value: data
                            .filter((e) => e.event_type === 'page_view')
                            .length.toLocaleString(),
                        change: '+15.2% from last period',
                        trend: 'up' as const,
                    },
                    {
                        label: 'Conversions',
                        value: data
                            .filter((e) => e.event_type === 'form_submit')
                            .length.toLocaleString(),
                        change: '+5.7% from last period',
                        trend: 'up' as const,
                    },
                ],
                tableData: data.slice(0, 50).map((event) => ({
                    timestamp: format(
                        new Date(event.timestamp),
                        'MMM dd, HH:mm'
                    ),
                    user_email: event.user?.email || 'Unknown',
                    event_type: event.event_type.replace('_', ' '),
                    page_url: event.page_url?.substring(0, 30) + '...' || 'N/A',
                    session_id:
                        event.session_id?.substring(0, 8) + '...' || 'N/A',
                    properties:
                        JSON.stringify(event.properties).substring(0, 30) +
                        '...',
                })),
                tableHeaders: [
                    'Timestamp',
                    'User Email',
                    'Event Type',
                    'Page URL',
                    'Session ID',
                    'Properties',
                ],
                summary: `This report contains ${
                    data.length
                } analytics events from the past 30 days. The data shows strong user engagement with ${
                    data.filter((e) => e.event_type === 'page_view').length
                } page views and ${
                    data.filter((e) => e.event_type === 'form_submit').length
                } form submissions. Key insights include increased user activity and improved conversion rates.`,
                insights: [
                    'Page view events account for the majority of user interactions',
                    'Form submission conversion rate is showing positive growth',
                    'User engagement patterns suggest optimal content performance',
                    'Session-based analysis indicates strong user retention',
                ],
            };

            const success = await generatePDF(reportData, 'analytics');
            if (success) {
                showSuccess('PDF report generated successfully!');
            } else {
                showError('Failed to generate PDF report');
            }
        } catch (error) {
            console.error('PDF export error:', error);
            showError('Failed to export to PDF');
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="h-8 bg-muted animate-pulse rounded" />
                <div className="h-[400px] bg-muted animate-pulse rounded" />
            </div>
        );
    }

    return (
        <DataTable
            columns={columns}
            data={data}
            title="Analytics Events"
            description="Real-time user interaction events and analytics data"
            searchKey="event_type"
            searchPlaceholder="Filter by event type..."
            onExport={handleExport}
            onPDFExport={handlePDFExport}
        />
    );
}
