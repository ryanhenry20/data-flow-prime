'use client';

import * as React from 'react';
import { format } from 'date-fns';
import {
    Download,
    Mail,
    Eye,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    User,
    FileText,
    Search,
    Filter,
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
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNotifications } from '@/hooks/useNotifications';

interface ReportHistoryItem {
    id: string;
    reportName: string;
    type: 'monthly' | 'custom' | 'scheduled';
    status: 'completed' | 'failed' | 'pending' | 'cancelled';
    generatedAt: Date;
    generatedBy: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    size: string;
    format: 'pdf' | 'csv' | 'excel' | 'html';
    downloadCount: number;
    emailsSent: number;
    version: string;
    executionTime: number; // in seconds
    recipients?: string[];
}

export function ReportHistory() {
    const [historyItems, setHistoryItems] = React.useState<ReportHistoryItem[]>(
        []
    );
    const [filteredItems, setFilteredItems] = React.useState<
        ReportHistoryItem[]
    >([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState<string>('all');
    const [typeFilter, setTypeFilter] = React.useState<string>('all');
    const { success, error } = useNotifications();

    // Mock data for demonstration
    React.useEffect(() => {
        const mockHistory: ReportHistoryItem[] = [
            {
                id: '1',
                reportName: 'Monthly Analytics Report - November 2024',
                type: 'monthly',
                status: 'completed',
                generatedAt: new Date('2024-12-01T09:00:00'),
                generatedBy: {
                    id: '1',
                    name: 'System Automation',
                    email: 'system@company.com',
                },
                size: '2.4 MB',
                format: 'pdf',
                downloadCount: 12,
                emailsSent: 8,
                version: '1.0',
                executionTime: 45,
                recipients: ['team@company.com', 'ceo@company.com'],
            },
            {
                id: '2',
                reportName: 'Custom User Engagement Report',
                type: 'custom',
                status: 'completed',
                generatedAt: new Date('2024-11-28T14:30:00'),
                generatedBy: {
                    id: '2',
                    name: 'John Smith',
                    email: 'john@company.com',
                    avatar: '/avatars/john.jpg',
                },
                size: '1.8 MB',
                format: 'excel',
                downloadCount: 5,
                emailsSent: 3,
                version: '2.1',
                executionTime: 32,
            },
            {
                id: '3',
                reportName: 'Weekly Traffic Sources Report',
                type: 'scheduled',
                status: 'failed',
                generatedAt: new Date('2024-11-27T10:15:00'),
                generatedBy: {
                    id: '1',
                    name: 'System Automation',
                    email: 'system@company.com',
                },
                size: '0 MB',
                format: 'pdf',
                downloadCount: 0,
                emailsSent: 0,
                version: '1.3',
                executionTime: 0,
            },
            {
                id: '4',
                reportName: 'Quarterly Revenue Analysis',
                type: 'custom',
                status: 'pending',
                generatedAt: new Date('2024-11-26T16:45:00'),
                generatedBy: {
                    id: '3',
                    name: 'Sarah Johnson',
                    email: 'sarah@company.com',
                    avatar: '/avatars/sarah.jpg',
                },
                size: '- MB',
                format: 'pdf',
                downloadCount: 0,
                emailsSent: 0,
                version: '1.0',
                executionTime: 0,
            },
            {
                id: '5',
                reportName: 'Monthly Analytics Report - October 2024',
                type: 'monthly',
                status: 'completed',
                generatedAt: new Date('2024-11-01T09:00:00'),
                generatedBy: {
                    id: '1',
                    name: 'System Automation',
                    email: 'system@company.com',
                },
                size: '2.2 MB',
                format: 'pdf',
                downloadCount: 18,
                emailsSent: 8,
                version: '1.0',
                executionTime: 42,
                recipients: ['team@company.com', 'ceo@company.com'],
            },
        ];

        setHistoryItems(mockHistory);
        setFilteredItems(mockHistory);
    }, []);

    // Filter logic
    React.useEffect(() => {
        let filtered = historyItems;

        if (searchTerm) {
            filtered = filtered.filter(
                (item) =>
                    item.reportName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    item.generatedBy.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((item) => item.status === statusFilter);
        }

        if (typeFilter !== 'all') {
            filtered = filtered.filter((item) => item.type === typeFilter);
        }

        setFilteredItems(filtered);
    }, [historyItems, searchTerm, statusFilter, typeFilter]);

    const getStatusIcon = (status: ReportHistoryItem['status']) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'failed':
                return <XCircle className="h-4 w-4 text-red-500" />;
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'cancelled':
                return <AlertCircle className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: ReportHistoryItem['status']) => {
        const variants = {
            completed: 'default',
            failed: 'destructive',
            pending: 'secondary',
            cancelled: 'outline',
        } as const;

        return (
            <Badge
                variant={variants[status]}
                className="flex items-center gap-1">
                {getStatusIcon(status)}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const getTypeBadge = (type: ReportHistoryItem['type']) => {
        const colors = {
            monthly:
                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            custom: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
            scheduled:
                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        };

        return (
            <Badge variant="secondary" className={colors[type]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
        );
    };

    const handleDownload = (item: ReportHistoryItem) => {
        success(`Downloading ${item.reportName}`);
    };

    const handleResend = (item: ReportHistoryItem) => {
        success(`Resending ${item.reportName} to recipients`);
    };

    const handlePreview = (item: ReportHistoryItem) => {
        success(`Opening preview for ${item.reportName}`);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Report Generation History</CardTitle>
                <CardDescription>
                    Track all generated reports with detailed audit trail and
                    versioning
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search reports or users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-40">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-full sm:w-40">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Results Summary */}
                <div className="text-sm text-muted-foreground">
                    Showing {filteredItems.length} of {historyItems.length}{' '}
                    reports
                </div>

                {/* History Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Report</TableHead>
                                <TableHead>Generated By</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Generated</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Downloads</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="font-medium">
                                                {item.reportName}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getTypeBadge(item.type)}
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs">
                                                    v{item.version}
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs">
                                                    {item.format.toUpperCase()}
                                                </Badge>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={
                                                        item.generatedBy.avatar
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {item.generatedBy.name.charAt(
                                                        0
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-sm">
                                                    {item.generatedBy.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {item.generatedBy.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(item.status)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="text-sm">
                                                {format(
                                                    item.generatedAt,
                                                    'MMM dd, yyyy'
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {format(
                                                    item.generatedAt,
                                                    'HH:mm'
                                                )}
                                                {item.executionTime > 0 &&
                                                    ` • ${item.executionTime}s`}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            {item.size}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="text-sm">
                                                {item.downloadCount} downloads
                                            </div>
                                            {item.emailsSent > 0 && (
                                                <div className="text-xs text-muted-foreground">
                                                    {item.emailsSent} emails
                                                    sent
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            {item.status === 'completed' && (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handlePreview(item)
                                                        }>
                                                        <Eye className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDownload(item)
                                                        }>
                                                        <Download className="h-3 w-3" />
                                                    </Button>
                                                    {item.recipients && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleResend(
                                                                    item
                                                                )
                                                            }>
                                                            <Mail className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-8">
                        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">
                            No reports found
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {searchTerm ||
                            statusFilter !== 'all' ||
                            typeFilter !== 'all'
                                ? 'Try adjusting your filters to see more results'
                                : 'No reports have been generated yet'}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
