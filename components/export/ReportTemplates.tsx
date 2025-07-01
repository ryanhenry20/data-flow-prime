'use client';

import * as React from 'react';
import {
    FileText,
    Copy,
    Edit,
    Trash2,
    Plus,
    Eye,
    Star,
    Download,
    Calendar,
    Users,
    BarChart3,
    Settings,
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DataTable,
    SortableColumnHeader,
    RowActionsDropdown,
    selectColumn,
} from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { useNotifications } from '@/hooks/useNotifications';
import { format } from 'date-fns';

interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    category: 'analytics' | 'users' | 'revenue' | 'custom';
    template_type: 'standard' | 'custom' | 'favorite';
    sections: ReportSection[];
    default_filters?: Record<string, any>;
    export_options: {
        formats: ('csv' | 'pdf')[];
        include_charts: boolean;
        include_summary: boolean;
        include_insights: boolean;
    };
    is_public: boolean;
    is_favorite: boolean;
    usage_count: number;
    created_at: string;
    created_by: string;
    last_modified: string;
}

interface ReportSection {
    id: string;
    name: string;
    type: 'kpi' | 'table' | 'chart' | 'summary' | 'insights';
    order: number;
    config: Record<string, any>;
    is_enabled: boolean;
}

const templateCategories = {
    analytics: {
        icon: BarChart3,
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    },
    users: {
        icon: Users,
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    },
    revenue: {
        icon: FileText,
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    },
    custom: {
        icon: Settings,
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    },
};

const sectionTypes = {
    kpi: {
        name: 'KPI Cards',
        icon: BarChart3,
        description: 'Key performance indicators',
    },
    table: {
        name: 'Data Table',
        icon: FileText,
        description: 'Tabular data display',
    },
    chart: {
        name: 'Charts',
        icon: BarChart3,
        description: 'Visual data representations',
    },
    summary: {
        name: 'Summary',
        icon: FileText,
        description: 'Executive summary text',
    },
    insights: {
        name: 'AI Insights',
        icon: Star,
        description: 'AI-generated insights',
    },
};

export function ReportTemplates() {
    const [templates, setTemplates] = React.useState<ReportTemplate[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [showCreateDialog, setShowCreateDialog] = React.useState(false);
    const [selectedCategory, setSelectedCategory] =
        React.useState<string>('all');
    const { success: showSuccess, error: showError } = useNotifications();

    React.useEffect(() => {
        fetchReportTemplates();
    }, []);

    const fetchReportTemplates = async () => {
        try {
            setLoading(true);

            // Mock data for report templates
            const mockTemplates: ReportTemplate[] = [
                {
                    id: '1',
                    name: 'Executive Dashboard',
                    description:
                        'High-level overview for executives with key metrics and trends',
                    category: 'analytics',
                    template_type: 'standard',
                    sections: [
                        {
                            id: 's1',
                            name: 'Key Metrics',
                            type: 'kpi',
                            order: 1,
                            config: {
                                metrics: ['revenue', 'users', 'conversion'],
                            },
                            is_enabled: true,
                        },
                        {
                            id: 's2',
                            name: 'Revenue Trends',
                            type: 'chart',
                            order: 2,
                            config: { chart_type: 'line', timeframe: '30d' },
                            is_enabled: true,
                        },
                        {
                            id: 's3',
                            name: 'Executive Summary',
                            type: 'summary',
                            order: 3,
                            config: { auto_generate: true },
                            is_enabled: true,
                        },
                    ],
                    export_options: {
                        formats: ['pdf'],
                        include_charts: true,
                        include_summary: true,
                        include_insights: true,
                    },
                    is_public: true,
                    is_favorite: false,
                    usage_count: 45,
                    created_at: new Date(
                        Date.now() - 30 * 24 * 60 * 60 * 1000
                    ).toISOString(),
                    created_by: 'system',
                    last_modified: new Date(
                        Date.now() - 7 * 24 * 60 * 60 * 1000
                    ).toISOString(),
                },
                {
                    id: '2',
                    name: 'User Engagement Analysis',
                    description:
                        'Detailed user behavior and engagement metrics',
                    category: 'users',
                    template_type: 'standard',
                    sections: [
                        {
                            id: 's4',
                            name: 'User Metrics',
                            type: 'kpi',
                            order: 1,
                            config: {
                                metrics: [
                                    'active_users',
                                    'new_users',
                                    'retention',
                                ],
                            },
                            is_enabled: true,
                        },
                        {
                            id: 's5',
                            name: 'User Details Table',
                            type: 'table',
                            order: 2,
                            config: {
                                columns: [
                                    'name',
                                    'email',
                                    'last_login',
                                    'engagement_score',
                                ],
                            },
                            is_enabled: true,
                        },
                        {
                            id: 's6',
                            name: 'Engagement Insights',
                            type: 'insights',
                            order: 3,
                            config: { focus: 'user_behavior' },
                            is_enabled: true,
                        },
                    ],
                    export_options: {
                        formats: ['csv', 'pdf'],
                        include_charts: true,
                        include_summary: false,
                        include_insights: true,
                    },
                    is_public: true,
                    is_favorite: true,
                    usage_count: 23,
                    created_at: new Date(
                        Date.now() - 15 * 24 * 60 * 60 * 1000
                    ).toISOString(),
                    created_by: 'admin',
                    last_modified: new Date(
                        Date.now() - 2 * 24 * 60 * 60 * 1000
                    ).toISOString(),
                },
                {
                    id: '3',
                    name: 'Weekly Performance Summary',
                    description:
                        'Comprehensive weekly performance report with all key metrics',
                    category: 'analytics',
                    template_type: 'favorite',
                    sections: [
                        {
                            id: 's7',
                            name: 'Weekly KPIs',
                            type: 'kpi',
                            order: 1,
                            config: {
                                metrics: [
                                    'revenue',
                                    'users',
                                    'conversion',
                                    'sessions',
                                ],
                            },
                            is_enabled: true,
                        },
                        {
                            id: 's8',
                            name: 'Trend Analysis',
                            type: 'chart',
                            order: 2,
                            config: {
                                chart_type: 'bar',
                                comparison: 'week_over_week',
                            },
                            is_enabled: true,
                        },
                        {
                            id: 's9',
                            name: 'Top Events',
                            type: 'table',
                            order: 3,
                            config: { limit: 10, sort_by: 'count' },
                            is_enabled: true,
                        },
                        {
                            id: 's10',
                            name: 'Performance Insights',
                            type: 'insights',
                            order: 4,
                            config: { timeframe: 'week' },
                            is_enabled: true,
                        },
                    ],
                    export_options: {
                        formats: ['pdf', 'csv'],
                        include_charts: true,
                        include_summary: true,
                        include_insights: true,
                    },
                    is_public: false,
                    is_favorite: true,
                    usage_count: 67,
                    created_at: new Date(
                        Date.now() - 45 * 24 * 60 * 60 * 1000
                    ).toISOString(),
                    created_by: 'user_123',
                    last_modified: new Date(
                        Date.now() - 1 * 24 * 60 * 60 * 1000
                    ).toISOString(),
                },
            ];

            setTemplates(mockTemplates);
        } catch (error) {
            console.error('Error fetching report templates:', error);
            showError('Failed to load report templates');
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (templateId: string) => {
        try {
            setTemplates((prev) =>
                prev.map((template) =>
                    template.id === templateId
                        ? { ...template, is_favorite: !template.is_favorite }
                        : template
                )
            );
            showSuccess('Template favorite status updated');
        } catch (error) {
            showError('Failed to update favorite status');
        }
    };

    const duplicateTemplate = async (templateId: string) => {
        try {
            const template = templates.find((t) => t.id === templateId);
            if (template) {
                const newTemplate: ReportTemplate = {
                    ...template,
                    id: Date.now().toString(),
                    name: `${template.name} (Copy)`,
                    is_public: false,
                    usage_count: 0,
                    created_at: new Date().toISOString(),
                    created_by: 'current_user',
                    last_modified: new Date().toISOString(),
                };
                setTemplates((prev) => [newTemplate, ...prev]);
                showSuccess('Template duplicated successfully');
            }
        } catch (error) {
            showError('Failed to duplicate template');
        }
    };

    const deleteTemplate = async (templateId: string) => {
        try {
            setTemplates((prev) =>
                prev.filter((template) => template.id !== templateId)
            );
            showSuccess('Template deleted successfully');
        } catch (error) {
            showError('Failed to delete template');
        }
    };

    const columns: ColumnDef<ReportTemplate>[] = [
        selectColumn,
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <SortableColumnHeader column={column} title="Template Name" />
            ),
            cell: ({ row }) => {
                const template = row.original;
                const categoryConfig = templateCategories[template.category];
                const IconComponent = categoryConfig.icon;

                return (
                    <div className="flex items-center gap-3">
                        <IconComponent className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">
                                    {template.name}
                                </span>
                                {template.is_favorite && (
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {template.description}
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'category',
            header: 'Category',
            cell: ({ row }) => {
                const category = row.getValue('category') as string;
                const config =
                    templateCategories[
                        category as keyof typeof templateCategories
                    ];

                return (
                    <Badge className={config.color} variant="secondary">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'sections',
            header: 'Sections',
            cell: ({ row }) => {
                const sections = row.getValue('sections') as ReportSection[];
                const enabledSections = sections.filter((s) => s.is_enabled);

                return (
                    <div className="text-sm">
                        <span className="font-medium">
                            {enabledSections.length}
                        </span>
                        <span className="text-muted-foreground">
                            {' '}
                            of {sections.length} sections
                        </span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'usage_count',
            header: ({ column }) => (
                <SortableColumnHeader column={column} title="Usage" />
            ),
            cell: ({ row }) => {
                const count = row.getValue('usage_count') as number;
                return <div className="text-sm">{count} times</div>;
            },
        },
        {
            accessorKey: 'last_modified',
            header: ({ column }) => (
                <SortableColumnHeader column={column} title="Last Modified" />
            ),
            cell: ({ row }) => {
                const date = new Date(row.getValue('last_modified') as string);
                return (
                    <div className="text-sm text-muted-foreground">
                        {format(date, 'MMM dd, yyyy')}
                    </div>
                );
            },
        },
        {
            accessorKey: 'is_public',
            header: 'Visibility',
            cell: ({ row }) => {
                const isPublic = row.getValue('is_public') as boolean;
                return (
                    <Badge variant={isPublic ? 'default' : 'secondary'}>
                        {isPublic ? 'Public' : 'Private'}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const template = row.original;

                const actions = [
                    {
                        label: 'Preview Template',
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => {
                            showSuccess(
                                'Template preview (feature coming soon)'
                            );
                        },
                    },
                    {
                        label: 'Use Template',
                        icon: <Download className="h-4 w-4" />,
                        onClick: () => {
                            showSuccess(
                                'Generate report from template (feature coming soon)'
                            );
                        },
                    },
                    {
                        label: template.is_favorite
                            ? 'Remove from Favorites'
                            : 'Add to Favorites',
                        icon: <Star className="h-4 w-4" />,
                        onClick: () => toggleFavorite(template.id),
                    },
                    {
                        label: 'Duplicate Template',
                        icon: <Copy className="h-4 w-4" />,
                        onClick: () => duplicateTemplate(template.id),
                    },
                    {
                        label: 'Edit Template',
                        icon: <Edit className="h-4 w-4" />,
                        onClick: () => {
                            showSuccess('Edit template (feature coming soon)');
                        },
                    },
                    {
                        label: 'Delete Template',
                        icon: <Trash2 className="h-4 w-4" />,
                        variant: 'destructive' as const,
                        onClick: () => deleteTemplate(template.id),
                    },
                ];

                return <RowActionsDropdown row={row} actions={actions} />;
            },
        },
    ];

    const filteredTemplates = React.useMemo(() => {
        if (selectedCategory === 'all') return templates;
        if (selectedCategory === 'favorites')
            return templates.filter((t) => t.is_favorite);
        return templates.filter((t) => t.category === selectedCategory);
    }, [templates, selectedCategory]);

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="h-8 bg-muted animate-pulse rounded" />
                <div className="h-[400px] bg-muted animate-pulse rounded" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Report Templates
                    </h2>
                    <p className="text-muted-foreground">
                        Create and manage reusable report templates
                    </p>
                </div>
                <Dialog
                    open={showCreateDialog}
                    onOpenChange={setShowCreateDialog}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Create Template
                        </Button>
                    </DialogTrigger>
                    <CreateTemplateDialog
                        onClose={() => setShowCreateDialog(false)}
                    />
                </Dialog>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
                <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}>
                    All Templates
                </Button>
                <Button
                    variant={
                        selectedCategory === 'favorites' ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => setSelectedCategory('favorites')}>
                    <Star className="h-3 w-3 mr-1" />
                    Favorites
                </Button>
                {Object.entries(templateCategories).map(([key, config]) => {
                    const IconComponent = config.icon;
                    return (
                        <Button
                            key={key}
                            variant={
                                selectedCategory === key ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setSelectedCategory(key)}>
                            <IconComponent className="h-3 w-3 mr-1" />
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Button>
                    );
                })}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Templates
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {templates.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {templates.filter((t) => t.is_public).length} public
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Favorites
                        </CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {templates.filter((t) => t.is_favorite).length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Starred templates
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Usage
                        </CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {templates.reduce(
                                (sum, t) => sum + t.usage_count,
                                0
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Times used
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Categories
                        </CardTitle>
                        <Settings className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {Object.keys(templateCategories).length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Template types
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Templates Table */}
            <DataTable
                columns={columns}
                data={filteredTemplates}
                title="Report Templates"
                description="Manage your custom report templates"
                searchKey="name"
                searchPlaceholder="Search templates..."
            />
        </div>
    );
}

// Create Template Dialog Component
function CreateTemplateDialog({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = React.useState({
        name: '',
        description: '',
        category: 'analytics',
        is_public: false,
    });

    const { success: showSuccess } = useNotifications();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        showSuccess('Template created successfully!');
        onClose();
    };

    return (
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Create Report Template</DialogTitle>
                <DialogDescription>
                    Create a reusable template for generating reports
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Template Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            placeholder="Enter template name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            placeholder="Describe what this template is for"
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    category: value,
                                }))
                            }>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="analytics">
                                    Analytics
                                </SelectItem>
                                <SelectItem value="users">Users</SelectItem>
                                <SelectItem value="revenue">Revenue</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={formData.is_public}
                            onCheckedChange={(checked) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    is_public: checked,
                                }))
                            }
                        />
                        <Label>Make template public</Label>
                    </div>
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Create Template</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
