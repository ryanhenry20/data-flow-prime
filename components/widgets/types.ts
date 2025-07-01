import { LucideIcon } from 'lucide-react';

export type WidgetCategory =
    | 'analytics'
    | 'kpi'
    | 'chart'
    | 'table'
    | 'custom'
    | 'ai';

export type WidgetSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface WidgetConfig {
    title: string;
    subtitle?: string;
    color?: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'yellow';
    size: WidgetSize;
    refreshInterval?: number; // seconds
    dataSource?: string;
    customProps?: Record<string, any>;
}

export interface WidgetMetadata {
    id: string;
    name: string;
    description: string;
    category: WidgetCategory;
    version: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    downloads: number;
    rating: number;
    ratingCount: number;
    isPublic: boolean;
    isFavorite?: boolean;
    tags: string[];
    previewImage?: string;
    minSize: WidgetSize;
    maxSize: WidgetSize;
}

export interface Widget {
    metadata: WidgetMetadata;
    config: WidgetConfig;
    componentType: string; // Changed from React.ComponentType to string identifier
    componentData?: any; // Optional data for the widget
    chartType?: 'line' | 'area' | 'bar' | 'pie';
    dataKey?: string;
    xAxisKey?: string;
}

export interface WidgetInstance {
    id: string;
    widgetId: string;
    config: WidgetConfig;
    position: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    dashboardId: string;
}

export interface WidgetTemplate {
    id: string;
    name: string;
    description: string;
    category: WidgetCategory;
    widgets: WidgetInstance[];
    isPublic: boolean;
    author: string;
    downloads: number;
    rating: number;
    tags: string[];
    previewImage?: string;
}

export interface WidgetMarketplaceState {
    widgets: Widget[];
    templates: WidgetTemplate[];
    favorites: string[];
    searchQuery: string;
    selectedCategory: WidgetCategory | 'all';
    selectedWidget: Widget | null;
    isLoading: boolean;
    error: string | null;
}
