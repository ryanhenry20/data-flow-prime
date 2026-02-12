'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
    Eye,
    Edit,
    Trash2,
    TrendingUp,
    TrendingDown,
    Minus,
} from 'lucide-react';

import {
    DataTable,
    SortableColumnHeader,
    RowActionsDropdown,
    selectColumn,
} from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useNotifications } from '@/hooks/useNotifications';
import type { AggregatedUserMetric } from '@/lib/portfolio-types';
import { portfolioClient } from '@/lib/portfolio-client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

interface UserMetric {
    id: string;
    user_id: string;
    metric_name: string;
    value: number;
    dimensions: Record<string, any>;
    timestamp: string;
    user_profiles?: {
        id: string;
        email: string;
        full_name: string;
        avatar_url?: string;
        created_at: string;
    };
}

export function UserMetricsTable() {
    const [data, setData] = React.useState<AggregatedUserMetric[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [viewUser, setViewUser] = React.useState<AggregatedUserMetric | null>(null);
    const [editUser, setEditUser] = React.useState<AggregatedUserMetric | null>(null);
    const { error: showError, success: showSuccess } = useNotifications();
    const router = useRouter();

    React.useEffect(() => {
        fetchUserMetrics();
    }, []);

    const fetchUserMetrics = async () => {
        try {
            setLoading(true);
            const metrics = await portfolioClient.getUserMetrics(100);
            setData(metrics || []);
        } catch (error) {
            console.error('Error fetching user metrics:', error);
            showError('Failed to load user metrics');
        } finally {
            setLoading(false);
        }
    };

    const getSegmentColor = (segment: string) => {
        switch (segment) {
            case 'high':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'low':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    const getTrend = (value: number) => {
        if (value > 75) return { icon: TrendingUp, color: 'text-green-500' };
        if (value < 25) return { icon: TrendingDown, color: 'text-red-500' };
        return { icon: Minus, color: 'text-gray-500' };
    };

    const columns: ColumnDef<AggregatedUserMetric>[] = [
        selectColumn,
        {
            accessorKey: 'user_profiles',
            header: 'User',
            cell: ({ row }) => {
                const user = row.getValue(
                    'user_profiles'
                ) as AggregatedUserMetric['user_profiles'];

                return (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback className="text-sm">
                                {user.full_name?.charAt(0) ||
                                    user.email?.charAt(0) ||
                                    '?'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">
                                {user.full_name || 'Unknown User'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {user.email}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Joined{' '}
                                {format(
                                    new Date(user.created_at),
                                    'MMM dd, yyyy'
                                )}
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'total_sessions',
            header: ({ column }) => (
                <SortableColumnHeader column={column} title="Sessions" />
            ),
            cell: ({ row }) => {
                const sessions = row.getValue('total_sessions') as number;
                return (
                    <div className="font-medium">
                        {sessions.toLocaleString()}
                    </div>
                );
            },
        },
        {
            accessorKey: 'avg_session_duration',
            header: ({ column }) => (
                <SortableColumnHeader column={column} title="Avg Duration" />
            ),
            cell: ({ row }) => {
                const duration = row.getValue('avg_session_duration') as number;
                return (
                    <div className="font-medium">
                        {formatDuration(duration)}
                    </div>
                );
            },
        },
        {
            accessorKey: 'page_views',
            header: ({ column }) => (
                <SortableColumnHeader column={column} title="Page Views" />
            ),
            cell: ({ row }) => {
                const pageViews = row.getValue('page_views') as number;
                return (
                    <div className="font-medium">
                        {pageViews.toLocaleString()}
                    </div>
                );
            },
        },
        {
            accessorKey: 'conversion_rate',
            header: ({ column }) => (
                <SortableColumnHeader column={column} title="Conversion Rate" />
            ),
            cell: ({ row }) => {
                const rate = row.getValue('conversion_rate') as number;
                const { icon: TrendIcon, color } = getTrend(rate * 10);

                return (
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{rate.toFixed(2)}%</span>
                        <TrendIcon className={`h-4 w-4 ${color}`} />
                    </div>
                );
            },
        },
        {
            accessorKey: 'engagement_score',
            header: ({ column }) => (
                <SortableColumnHeader column={column} title="Engagement" />
            ),
            cell: ({ row }) => {
                const score = row.getValue('engagement_score') as number;
                const { icon: TrendIcon, color } = getTrend(score);

                return (
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                                {score}/100
                            </span>
                            <TrendIcon className={`h-3 w-3 ${color}`} />
                        </div>
                        <Progress value={score} className="h-1 w-16" />
                    </div>
                );
            },
        },
        {
            accessorKey: 'user_segment',
            header: 'Segment',
            cell: ({ row }) => {
                const segment = row.getValue('user_segment') as string;
                const colorClass = getSegmentColor(segment);

                return (
                    <Badge className={colorClass} variant="secondary">
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}{' '}
                        Value
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'last_active',
            header: ({ column }) => (
                <SortableColumnHeader column={column} title="Last Active" />
            ),
            cell: ({ row }) => {
                const lastActive = row.getValue('last_active') as string;
                const date = new Date(lastActive);
                const isRecent =
                    Date.now() - date.getTime() < 24 * 60 * 60 * 1000; // 24 hours

                return (
                    <div
                        className={`text-sm ${
                            isRecent
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-muted-foreground'
                        }`}>
                        {format(date, 'MMM dd, HH:mm')}
                        {isRecent && (
                            <div className="text-xs text-green-600 dark:text-green-400">
                                Recently active
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const user = row.original;

                const actions = [
                    {
                        label: 'View Profile',
                        icon: <Eye className="h-4 w-4" />,
                        onClick: (row: any) => {
                            setViewUser(user);
                        },
                    },
                    {
                        label: 'Edit User',
                        icon: <Edit className="h-4 w-4" />,
                        onClick: (row: any) => {
                            setEditUser(user);
                        },
                    },
                    {
                        label: 'View Analytics',
                        icon: <TrendingUp className="h-4 w-4" />,
                        onClick: (row: any) => {
                            router.push('/analytics');
                        },
                    },
                ];

                return <RowActionsDropdown row={row} actions={actions} />;
            },
        },
    ];

    const handleExport = (data: AggregatedUserMetric[]) => {
        // Convert to CSV format
        const headers = [
            'User ID',
            'Email',
            'Full Name',
            'Total Sessions',
            'Avg Duration (seconds)',
            'Page Views',
            'Conversion Rate (%)',
            'Engagement Score',
            'User Segment',
            'Last Active',
        ];

        const csvData = [
            headers.join(','),
            ...data.map((metric) =>
                [
                    metric.user_id,
                    metric.user_profiles.email,
                    metric.user_profiles.full_name || '',
                    metric.total_sessions,
                    metric.avg_session_duration,
                    metric.page_views,
                    metric.conversion_rate.toFixed(2),
                    metric.engagement_score,
                    metric.user_segment,
                    metric.last_active,
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
        link.download = `user-metrics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showSuccess('User metrics exported to CSV');
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="h-8 bg-muted animate-pulse rounded" />
                <div className="h-[400px] bg-muted animate-pulse rounded" />
            </div>
        );
    }

    const saveUserEdit = () => {
        if (!editUser) return;
        setData((prev) =>
            prev.map((item) =>
                item.user_id === editUser.user_id ? editUser : item
            )
        );
        setEditUser(null);
        showSuccess('User record updated');
    };

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                title="User Metrics"
                description="Comprehensive user analytics and engagement metrics"
                searchKey="user_profiles"
                searchPlaceholder="Search users by name or email..."
                onExport={handleExport}
            />

            <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>User Profile</DialogTitle>
                    </DialogHeader>
                    {viewUser && (
                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="font-medium">Name:</span>{' '}
                                {viewUser.user_profiles.full_name}
                            </div>
                            <div>
                                <span className="font-medium">Email:</span>{' '}
                                {viewUser.user_profiles.email}
                            </div>
                            <div>
                                <span className="font-medium">Sessions:</span>{' '}
                                {viewUser.total_sessions}
                            </div>
                            <div>
                                <span className="font-medium">Engagement:</span>{' '}
                                {viewUser.engagement_score}/100
                            </div>
                            <div>
                                <span className="font-medium">Last Active:</span>{' '}
                                {new Date(viewUser.last_active).toLocaleString()}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User Segment</DialogTitle>
                    </DialogHeader>
                    {editUser && (
                        <div className="space-y-3">
                            <Input
                                value={editUser.user_profiles.full_name}
                                onChange={(event) =>
                                    setEditUser((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  user_profiles: {
                                                      ...prev.user_profiles,
                                                      full_name:
                                                          event.target.value,
                                                  },
                                              }
                                            : prev
                                    )
                                }
                                placeholder="Full name"
                            />
                            <Select
                                value={editUser.user_segment}
                                onValueChange={(value) =>
                                    setEditUser((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  user_segment: value as
                                                      | 'high'
                                                      | 'medium'
                                                      | 'low',
                                              }
                                            : prev
                                    )
                                }>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select segment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">High Value</SelectItem>
                                    <SelectItem value="medium">
                                        Medium Value
                                    </SelectItem>
                                    <SelectItem value="low">Low Value</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditUser(null)}>
                            Cancel
                        </Button>
                        <Button onClick={saveUserEdit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
