'use client';

import React from 'react';
import { X, Star, Download, Heart, Plus, Share2, Info } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Widget } from './types';
import { format } from 'date-fns';
import { WidgetFactory } from './WidgetFactory';

interface WidgetPreviewModalProps {
    widget: Widget | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToDashboard: (widget: Widget) => void;
    onToggleFavorite: (widgetId: string) => void;
    isFavorite: boolean;
}

export function WidgetPreviewModal({
    widget,
    isOpen,
    onClose,
    onAddToDashboard,
    onToggleFavorite,
    isFavorite,
}: WidgetPreviewModalProps) {
    if (!widget) return null;

    const { metadata, config } = widget;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold">
                                    {metadata.name.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-bold">
                                    {metadata.name}
                                </DialogTitle>
                                <p className="text-muted-foreground">
                                    v{metadata.version} by {metadata.author}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onToggleFavorite(metadata.id)}
                                className={isFavorite ? 'text-red-500' : ''}>
                                <Heart
                                    className={`w-4 h-4 ${
                                        isFavorite ? 'fill-current' : ''
                                    }`}
                                />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">
                                    {metadata.rating}
                                </span>
                                <span>({metadata.ratingCount} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Download className="w-4 h-4" />
                                <span>
                                    {metadata.downloads.toLocaleString()}{' '}
                                    downloads
                                </span>
                            </div>
                            <div>
                                Updated{' '}
                                {format(
                                    new Date(metadata.updatedAt),
                                    'MMM dd, yyyy'
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline">
                                <Info className="w-4 h-4 mr-2" />
                                Details
                            </Button>
                            <Button onClick={() => onAddToDashboard(widget)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add to Dashboard
                            </Button>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                            Description
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {metadata.description}
                        </p>
                    </div>

                    {/* Tags */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {metadata.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Widget Preview */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Preview</h3>
                        <div className="border border-border rounded-lg p-6 bg-background">
                            <div className="max-w-md mx-auto">
                                <WidgetFactory
                                    type={widget.componentType}
                                    config={config}
                                    data={widget.componentData}
                                    chartType={widget.chartType}
                                    dataKey={widget.dataKey}
                                    xAxisKey={widget.xAxisKey}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Configuration Options */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Configuration
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Size Range:
                                    </span>
                                    <span className="font-medium">
                                        {metadata.minSize} - {metadata.maxSize}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Default Size:
                                    </span>
                                    <span className="font-medium">
                                        {config.size}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Color:
                                    </span>
                                    <span className="font-medium capitalize">
                                        {config.color}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Category:
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className="capitalize">
                                        {metadata.category}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Refresh Interval:
                                    </span>
                                    <span className="font-medium">
                                        {config.refreshInterval
                                            ? `${config.refreshInterval}s`
                                            : 'Manual'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Public:
                                    </span>
                                    <Badge
                                        variant={
                                            metadata.isPublic
                                                ? 'default'
                                                : 'secondary'
                                        }>
                                        {metadata.isPublic ? 'Yes' : 'No'}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                            <div>
                                <h4 className="font-medium mb-1">
                                    Widget Information
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    This widget can be customized after adding
                                    to your dashboard. You can modify colors,
                                    size, refresh intervals, and data sources to
                                    match your specific needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
