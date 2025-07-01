import {
    Users,
    TrendingUp,
    DollarSign,
    Activity,
    ShoppingCart,
    Eye,
    MousePointer,
    Clock,
    BarChart3,
    PieChart,
    LineChart,
    Target,
} from 'lucide-react';
import { Widget } from './types';

// Mock data for different widgets
const mockKPIData = {
    users: { value: '12,549', change: 12.5, trend: 'up' as const, icon: Users },
    revenue: {
        value: '$45,231',
        change: 8.2,
        trend: 'up' as const,
        icon: DollarSign,
    },
    orders: {
        value: '1,423',
        change: -2.1,
        trend: 'down' as const,
        icon: ShoppingCart,
    },
    sessions: {
        value: '8,492',
        change: 15.3,
        trend: 'up' as const,
        icon: Activity,
    },
    views: { value: '24,758', change: 6.7, trend: 'up' as const, icon: Eye },
    clicks: {
        value: '3,821',
        change: -1.2,
        trend: 'down' as const,
        icon: MousePointer,
    },
    time: { value: '4m 32s', change: 22.1, trend: 'up' as const, icon: Clock },
    conversion: {
        value: '3.24%',
        change: 4.8,
        trend: 'up' as const,
        icon: Target,
    },
};

const mockChartData = {
    revenue: [
        { name: 'Jan', value: 4000 },
        { name: 'Feb', value: 3000 },
        { name: 'Mar', value: 5000 },
        { name: 'Apr', value: 4500 },
        { name: 'May', value: 6000 },
        { name: 'Jun', value: 5500 },
    ],
    users: [
        { name: 'Week 1', value: 1200 },
        { name: 'Week 2', value: 1500 },
        { name: 'Week 3', value: 1800 },
        { name: 'Week 4', value: 2100 },
    ],
    traffic: [
        { name: 'Direct', value: 35 },
        { name: 'Social', value: 25 },
        { name: 'Search', value: 20 },
        { name: 'Email', value: 15 },
        { name: 'Referral', value: 5 },
    ],
};

export const widgetRegistry: Widget[] = [
    // KPI Widgets
    {
        metadata: {
            id: 'kpi-users',
            name: 'Active Users',
            description: 'Display total active users with trend indicator',
            category: 'kpi',
            version: '1.0.0',
            author: 'Data Flow Prime',
            createdAt: '2024-12-31T00:00:00Z',
            updatedAt: '2024-12-31T00:00:00Z',
            downloads: 1250,
            rating: 4.8,
            ratingCount: 127,
            isPublic: true,
            tags: ['users', 'metrics', 'kpi'],
            minSize: 'small',
            maxSize: 'large',
        },
        config: {
            title: 'Active Users',
            subtitle: 'Last 30 days',
            color: 'blue',
            size: 'medium',
            refreshInterval: 300,
        },
        componentType: 'kpi',
        componentData: mockKPIData.users,
    },
    {
        metadata: {
            id: 'kpi-revenue',
            name: 'Revenue',
            description: 'Total revenue with growth percentage',
            category: 'kpi',
            version: '1.0.0',
            author: 'Data Flow Prime',
            createdAt: '2024-12-31T00:00:00Z',
            updatedAt: '2024-12-31T00:00:00Z',
            downloads: 980,
            rating: 4.9,
            ratingCount: 89,
            isPublic: true,
            tags: ['revenue', 'finance', 'kpi'],
            minSize: 'small',
            maxSize: 'large',
        },
        config: {
            title: 'Total Revenue',
            subtitle: 'This month',
            color: 'green',
            size: 'medium',
            refreshInterval: 300,
        },
        componentType: 'kpi',
        componentData: mockKPIData.revenue,
    },
    {
        metadata: {
            id: 'kpi-orders',
            name: 'Orders',
            description: 'Total orders count with trend',
            category: 'kpi',
            version: '1.0.0',
            author: 'Data Flow Prime',
            createdAt: '2024-12-31T00:00:00Z',
            updatedAt: '2024-12-31T00:00:00Z',
            downloads: 756,
            rating: 4.6,
            ratingCount: 64,
            isPublic: true,
            tags: ['orders', 'sales', 'kpi'],
            minSize: 'small',
            maxSize: 'large',
        },
        config: {
            title: 'Total Orders',
            subtitle: 'Last 7 days',
            color: 'orange',
            size: 'medium',
            refreshInterval: 600,
        },
        componentType: 'kpi',
        componentData: mockKPIData.orders,
    },
    {
        metadata: {
            id: 'kpi-conversion',
            name: 'Conversion Rate',
            description: 'Conversion rate percentage with trend',
            category: 'kpi',
            version: '1.0.0',
            author: 'Data Flow Prime',
            createdAt: '2024-12-31T00:00:00Z',
            updatedAt: '2024-12-31T00:00:00Z',
            downloads: 892,
            rating: 4.7,
            ratingCount: 78,
            isPublic: true,
            tags: ['conversion', 'rate', 'analytics'],
            minSize: 'small',
            maxSize: 'large',
        },
        config: {
            title: 'Conversion Rate',
            subtitle: 'This week',
            color: 'purple',
            size: 'medium',
            refreshInterval: 300,
        },
        componentType: 'kpi',
        componentData: mockKPIData.conversion,
    },

    // Chart Widgets
    {
        metadata: {
            id: 'chart-revenue-line',
            name: 'Revenue Trend',
            description: 'Line chart showing revenue over time',
            category: 'chart',
            version: '1.0.0',
            author: 'Data Flow Prime',
            createdAt: '2024-12-31T00:00:00Z',
            updatedAt: '2024-12-31T00:00:00Z',
            downloads: 1450,
            rating: 4.9,
            ratingCount: 156,
            isPublic: true,
            tags: ['revenue', 'chart', 'line', 'trends'],
            minSize: 'medium',
            maxSize: 'xlarge',
        },
        config: {
            title: 'Revenue Trend',
            subtitle: 'Monthly revenue over time',
            color: 'green',
            size: 'large',
            refreshInterval: 1800,
        },
        componentType: 'chart-line',
        componentData: mockChartData.revenue,
        chartType: 'line',
        dataKey: 'value',
        xAxisKey: 'name',
    },
    {
        metadata: {
            id: 'chart-users-area',
            name: 'User Growth',
            description: 'Area chart showing user growth over time',
            category: 'chart',
            version: '1.0.0',
            author: 'Data Flow Prime',
            createdAt: '2024-12-31T00:00:00Z',
            updatedAt: '2024-12-31T00:00:00Z',
            downloads: 1123,
            rating: 4.7,
            ratingCount: 98,
            isPublic: true,
            tags: ['users', 'growth', 'chart', 'area'],
            minSize: 'medium',
            maxSize: 'xlarge',
        },
        config: {
            title: 'User Growth',
            subtitle: 'Weekly user acquisition',
            color: 'blue',
            size: 'large',
            refreshInterval: 3600,
        },
        componentType: 'chart-area',
        componentData: mockChartData.users,
        chartType: 'area',
        dataKey: 'value',
        xAxisKey: 'name',
    },
    {
        metadata: {
            id: 'chart-traffic-pie',
            name: 'Traffic Sources',
            description: 'Pie chart showing traffic source distribution',
            category: 'chart',
            version: '1.0.0',
            author: 'Data Flow Prime',
            createdAt: '2024-12-31T00:00:00Z',
            updatedAt: '2024-12-31T00:00:00Z',
            downloads: 834,
            rating: 4.5,
            ratingCount: 67,
            isPublic: true,
            tags: ['traffic', 'sources', 'pie', 'distribution'],
            minSize: 'medium',
            maxSize: 'large',
        },
        config: {
            title: 'Traffic Sources',
            subtitle: 'Visitor source breakdown',
            color: 'purple',
            size: 'medium',
            refreshInterval: 3600,
        },
        componentType: 'chart-pie',
        componentData: mockChartData.traffic,
        chartType: 'pie',
        dataKey: 'value',
        xAxisKey: 'name',
    },
];

// Helper functions
export const getWidgetById = (id: string): Widget | undefined => {
    return widgetRegistry.find((widget) => widget.metadata.id === id);
};

export const getWidgetsByCategory = (category: string): Widget[] => {
    if (category === 'all') return widgetRegistry;
    return widgetRegistry.filter(
        (widget) => widget.metadata.category === category
    );
};

export const searchWidgets = (query: string): Widget[] => {
    const searchTerm = query.toLowerCase();
    return widgetRegistry.filter(
        (widget) =>
            widget.metadata.name.toLowerCase().includes(searchTerm) ||
            widget.metadata.description.toLowerCase().includes(searchTerm) ||
            widget.metadata.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm)
            )
    );
};
