'use client';

import React, { useState, useMemo } from 'react';
import {
    Search,
    Filter,
    Star,
    Download,
    Plus,
    Grid3X3,
    List,
    Heart,
    Tag,
    TrendingUp,
    Users,
    BarChart3,
    PieChart,
    Zap,
    Brain,
    Check,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { WidgetCategory, Widget } from './types';
import {
    widgetRegistry,
    getWidgetsByCategory,
    searchWidgets,
} from './registry';
import { useNotifications } from '@/hooks/useNotifications';
import { WidgetPreviewModal } from './WidgetPreviewModal';
import { WidgetFactory } from './WidgetFactory';
import { useDashboardWidgets } from '@/hooks/useDashboardWidgets';

const categoryIcons = {
    all: Grid3X3,
    kpi: TrendingUp,
    chart: BarChart3,
    table: List,
    analytics: PieChart,
    custom: Zap,
    ai: Brain,
};

const categoryColors = {
    all: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    kpi: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    chart: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    table: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    analytics:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    custom: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    ai: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
};

export function WidgetMarketplace() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<
        WidgetCategory | 'all'
    >('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<
        'name' | 'downloads' | 'rating' | 'recent'
    >('downloads');
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [previewWidget, setPreviewWidget] = useState<Widget | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const { success: showSuccess } = useNotifications();
    const { addWidget, isWidgetOnDashboard } = useDashboardWidgets();

    // Filter and sort widgets
    const filteredWidgets = useMemo(() => {
        let widgets = searchQuery
            ? searchWidgets(searchQuery)
            : getWidgetsByCategory(selectedCategory);

        // Sort widgets
        widgets = [...widgets].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.metadata.name.localeCompare(b.metadata.name);
                case 'downloads':
                    return b.metadata.downloads - a.metadata.downloads;
                case 'rating':
                    return b.metadata.rating - a.metadata.rating;
                case 'recent':
                    return (
                        new Date(b.metadata.updatedAt).getTime() -
                        new Date(a.metadata.updatedAt).getTime()
                    );
                default:
                    return 0;
            }
        });

        return widgets;
    }, [searchQuery, selectedCategory, sortBy]);

    const toggleFavorite = (widgetId: string) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(widgetId)) {
            newFavorites.delete(widgetId);
            showSuccess('Removed from favorites');
        } else {
            newFavorites.add(widgetId);
            showSuccess('Added to favorites');
        }
        setFavorites(newFavorites);
    };

    const addTodashboard = (widget: Widget) => {
        if (isWidgetOnDashboard(widget.metadata.id)) {
            showSuccess(
                `${widget.metadata.name} is already on your dashboard!`
            );
            return;
        }

        addWidget(widget);
        showSuccess(`${widget.metadata.name} added to dashboard!`);
        setShowPreview(false);
    };

    const openPreview = (widget: Widget) => {
        setPreviewWidget(widget);
        setShowPreview(true);
    };

    const renderWidgetCard = (widget: Widget) => {
        const IconComponent = categoryIcons[widget.metadata.category];
        const isFavorite = favorites.has(widget.metadata.id);
        const isOnDashboard = isWidgetOnDashboard(widget.metadata.id);

        return (
            <Card
                key={widget.metadata.id}
                className="group hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-10 h-10 rounded-lg ${
                                    categoryColors[widget.metadata.category]
                                } flex items-center justify-center`}>
                                <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg font-semibold truncate">
                                    {widget.metadata.name}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    v{widget.metadata.version} by{' '}
                                    {widget.metadata.author}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(widget.metadata.id)}
                            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                                isFavorite ? 'text-red-500 opacity-100' : ''
                            }`}>
                            <Heart
                                className={`w-4 h-4 ${
                                    isFavorite ? 'fill-current' : ''
                                }`}
                            />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Widget Preview */}
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <div className="h-full scale-75 origin-top-left">
                            <WidgetFactory
                                type={widget.componentType}
                                config={widget.config}
                                data={widget.componentData}
                                chartType={widget.chartType}
                                dataKey={widget.dataKey}
                                xAxisKey={widget.xAxisKey}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {widget.metadata.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                        {widget.metadata.tags.slice(0, 3).map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                        {widget.metadata.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                                +{widget.metadata.tags.length - 3}
                            </Badge>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{widget.metadata.rating}</span>
                                <span>({widget.metadata.ratingCount})</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                <span>
                                    {widget.metadata.downloads.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                        <Button
                            onClick={() => addTodashboard(widget)}
                            className="flex-1"
                            size="sm"
                            variant={isOnDashboard ? 'secondary' : 'default'}
                            disabled={isOnDashboard}>
                            {isOnDashboard ? (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Added
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add to Dashboard
                                </>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openPreview(widget)}>
                            Preview
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Widget Marketplace
                    </h1>
                    <p className="text-muted-foreground">
                        Discover and add powerful widgets to your dashboard
                    </p>
                </div>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Widget
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Search widgets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select
                    value={sortBy}
                    onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="downloads">
                            Most Downloaded
                        </SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="recent">Recently Updated</SelectItem>
                        <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex gap-2">
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}>
                        <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}>
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Category Tabs */}
            <Tabs
                value={selectedCategory}
                onValueChange={(value: any) => setSelectedCategory(value)}>
                <TabsList className="grid w-full grid-cols-7">
                    {Object.entries(categoryIcons).map(([category, Icon]) => (
                        <TabsTrigger
                            key={category}
                            value={category}
                            className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline capitalize">
                                {category}
                            </span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value={selectedCategory} className="mt-6">
                    {/* Results count */}
                    <div className="mb-4">
                        <p className="text-sm text-muted-foreground">
                            {filteredWidgets.length} widget
                            {filteredWidgets.length !== 1 ? 's' : ''} found
                        </p>
                    </div>

                    {/* Widget Grid */}
                    {filteredWidgets.length > 0 ? (
                        <div
                            className={
                                viewMode === 'grid'
                                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                                    : 'space-y-4'
                            }>
                            {filteredWidgets.map(renderWidgetCard)}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                                <Search className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                                No widgets found
                            </h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or browse different
                                categories
                            </p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* Preview Modal */}
            <WidgetPreviewModal
                widget={previewWidget}
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
                onAddToDashboard={addTodashboard}
                onToggleFavorite={toggleFavorite}
                isFavorite={
                    previewWidget
                        ? favorites.has(previewWidget.metadata.id)
                        : false
                }
            />
        </div>
    );
}
