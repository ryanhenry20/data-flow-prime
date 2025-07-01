'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { 
    Calendar, 
    Clock, 
    Mail, 
    Play, 
    Trash2, 
    Edit, 
    Plus,
    FileText,
    Users,
    BarChart3,
    CheckCircle
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable, SortableColumnHeader, RowActionsDropdown, selectColumn } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { useNotifications } from '@/hooks/useNotifications';

interface ScheduledReport {
    id: string;
    name: string;
    description?: string;
    report_type: 'analytics' | 'users' | 'custom';
    schedule_type: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    schedule_time: string;
    schedule_day?: number;
    email_recipients: string[];
    export_formats: ('csv' | 'pdf')[];
    is_active: boolean;
    last_run?: string;
    next_run?: string;
    created_at: string;
    created_by: string;
    run_count: number;
}

export function ScheduledReports() {
    const [reports, setReports] = React.useState<ScheduledReport[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [showCreateDialog, setShowCreateDialog] = React.useState(false);
    const { success: showSuccess, error: showError } = useNotifications();

    React.useEffect(() => {
        fetchScheduledReports();
    }, []);

    const fetchScheduledReports = async () => {
        try {
            setLoading(true);
            // Mock data for scheduled reports
            const mockReports: ScheduledReport[] = [
                {
                    id: '1',
                    name: 'Daily Analytics Summary',
                    description: 'Daily overview of key metrics and user activity',
                    report_type: 'analytics',
                    schedule_type: 'daily',
                    schedule_time: '09:00',
                    email_recipients: ['admin@company.com'],
                    export_formats: ['pdf', 'csv'],
                    is_active: true,
                    last_run: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                    next_run: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                    created_by: 'system',
                    run_count: 7,
                }
            ];
            setReports(mockReports);
        } catch (error) {
            console.error('Error fetching scheduled reports:', error);
            showError('Failed to load scheduled reports');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="h-[400px] bg-muted animate-pulse rounded" />;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Scheduled Reports</h2>
                    <p className="text-muted-foreground">
                        Automate report generation and delivery to your team
                    </p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Report
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{reports.length}</div>
                        <p className="text-xs text-muted-foreground">
                            {reports.filter(r => r.is_active).length} active
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
