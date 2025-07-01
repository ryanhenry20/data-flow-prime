'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { 
    Mail, 
    Send, 
    Clock, 
    CheckCircle, 
    XCircle,
    AlertCircle,
    Plus,
    Settings,
    Users,
    FileText,
    Download,
    Eye,
    Trash2,
    RotateCcw
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
import { DataTable, SortableColumnHeader, RowActionsDropdown, selectColumn } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { useNotifications } from '@/hooks/useNotifications';

interface EmailReport {
    id: string;
    subject: string;
    recipients: string[];
    status: 'pending' | 'sending' | 'sent' | 'failed' | 'scheduled';
    priority: 'low' | 'normal' | 'high' | 'urgent';
    scheduled_at?: string;
    sent_at?: string;
    delivery_attempts: number;
    error_message?: string;
    open_count: number;
    click_count: number;
    created_at: string;
    created_by: string;
}

const statusConfig = {
    pending: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300', icon: Clock },
    sending: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', icon: Send },
    sent: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: CheckCircle },
    failed: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', icon: XCircle },
    scheduled: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', icon: Clock },
};

export function EmailReports() {
    const [emails, setEmails] = React.useState<EmailReport[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [showSendDialog, setShowSendDialog] = React.useState(false);
    const { success: showSuccess, error: showError } = useNotifications();

    React.useEffect(() => {
        fetchEmailReports();
    }, []);

    const fetchEmailReports = async () => {
        try {
            setLoading(true);
            
            // Mock data for email reports
            const mockEmails: EmailReport[] = [
                {
                    id: '1',
                    subject: 'Daily Analytics Report - December 30, 2024',
                    recipients: ['admin@company.com', 'team@company.com'],
                    status: 'sent',
                    priority: 'normal',
                    sent_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    delivery_attempts: 1,
                    open_count: 2,
                    click_count: 1,
                    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
                    created_by: 'system',
                },
                {
                    id: '2',
                    subject: 'Weekly User Engagement Report',
                    recipients: ['executives@company.com'],
                    status: 'scheduled',
                    priority: 'high',
                    scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                    delivery_attempts: 0,
                    open_count: 0,
                    click_count: 0,
                    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                    created_by: 'admin',
                },
                {
                    id: '3',
                    subject: 'Critical Alert: Revenue Drop Detected',
                    recipients: ['ceo@company.com', 'cfo@company.com'],
                    status: 'failed',
                    priority: 'urgent',
                    delivery_attempts: 3,
                    error_message: 'SMTP server timeout',
                    open_count: 0,
                    click_count: 0,
                    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                    created_by: 'alert_system',
                },
            ];

            setEmails(mockEmails);
        } catch (error) {
            console.error('Error fetching email reports:', error);
            showError('Failed to load email reports');
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
                    <h2 className="text-2xl font-bold tracking-tight">Email Reports</h2>
                    <p className="text-muted-foreground">
                        Manage automated email report delivery and templates
                    </p>
                </div>
                <Button onClick={() => setShowSendDialog(true)}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Report
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{emails.length}</div>
                        <p className="text-xs text-muted-foreground">
                            {emails.filter(e => e.status === 'sent').length} sent successfully
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
