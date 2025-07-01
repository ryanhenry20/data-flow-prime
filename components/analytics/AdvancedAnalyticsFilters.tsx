'use client';

import * as React from 'react';
import { CalendarIcon, Filter, X, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface AnalyticsFilters {
    eventTypes: string[];
    userSegments: string[];
    sources: string[];
}

interface AdvancedAnalyticsFiltersProps {
    dateRange: DateRange;
    onDateRangeChange: (range: DateRange) => void;
    filters: AnalyticsFilters;
    onFiltersChange: (filters: AnalyticsFilters) => void;
}

const eventTypes = [
    { value: 'page_view', label: 'Page Views' },
    { value: 'click', label: 'Clicks' },
    { value: 'form_submit', label: 'Form Submissions' },
    { value: 'purchase', label: 'Purchases' },
    { value: 'login', label: 'Logins' },
    { value: 'logout', label: 'Logouts' },
    { value: 'error', label: 'Errors' },
];

const userSegments = [
    { value: 'new_users', label: 'New Users' },
    { value: 'returning_users', label: 'Returning Users' },
    { value: 'high_value', label: 'High Value Users' },
    { value: 'low_engagement', label: 'Low Engagement' },
    { value: 'premium_users', label: 'Premium Users' },
];

const trafficSources = [
    { value: 'organic', label: 'Organic Search' },
    { value: 'paid', label: 'Paid Search' },
    { value: 'social', label: 'Social Media' },
    { value: 'email', label: 'Email Campaign' },
    { value: 'direct', label: 'Direct Traffic' },
    { value: 'referral', label: 'Referrals' },
];

const datePresets = [
    {
        label: 'Today',
        value: () => ({
            from: new Date(),
            to: new Date(),
        }),
    },
    {
        label: 'Yesterday',
        value: () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return {
                from: yesterday,
                to: yesterday,
            };
        },
    },
    {
        label: 'Last 7 days',
        value: () => ({
            from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            to: new Date(),
        }),
    },
    {
        label: 'Last 30 days',
        value: () => ({
            from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            to: new Date(),
        }),
    },
    {
        label: 'Last 90 days',
        value: () => ({
            from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            to: new Date(),
        }),
    },
];

export function AdvancedAnalyticsFilters({
    dateRange,
    onDateRangeChange,
    filters,
    onFiltersChange,
}: AdvancedAnalyticsFiltersProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleEventTypeChange = (eventType: string, checked: boolean) => {
        const newEventTypes = checked
            ? [...filters.eventTypes, eventType]
            : filters.eventTypes.filter((type) => type !== eventType);

        onFiltersChange({
            ...filters,
            eventTypes: newEventTypes,
        });
    };

    const handleUserSegmentChange = (segment: string, checked: boolean) => {
        const newSegments = checked
            ? [...filters.userSegments, segment]
            : filters.userSegments.filter((seg) => seg !== segment);

        onFiltersChange({
            ...filters,
            userSegments: newSegments,
        });
    };

    const handleSourceChange = (source: string, checked: boolean) => {
        const newSources = checked
            ? [...filters.sources, source]
            : filters.sources.filter((src) => src !== source);

        onFiltersChange({
            ...filters,
            sources: newSources,
        });
    };

    const clearAllFilters = () => {
        onFiltersChange({
            eventTypes: [],
            userSegments: [],
            sources: [],
        });
    };

    const getTotalFilterCount = () => {
        return (
            filters.eventTypes.length +
            filters.userSegments.length +
            filters.sources.length
        );
    };

    const applyDatePreset = (presetValue: () => DateRange) => {
        onDateRangeChange(presetValue());
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Advanced Filters
                        </CardTitle>
                        <CardDescription>
                            Filter analytics data by date range, event types,
                            user segments, and traffic sources
                        </CardDescription>
                    </div>
                    {getTotalFilterCount() > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearAllFilters}
                            className="text-muted-foreground">
                            <X className="h-4 w-4 mr-2" />
                            Clear All ({getTotalFilterCount()})
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Date Range Selection */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">Date Range</Label>
                    <div className="flex flex-wrap gap-2">
                        {datePresets.map((preset) => (
                            <Button
                                key={preset.label}
                                variant="outline"
                                size="sm"
                                onClick={() => applyDatePreset(preset.value)}
                                className="text-sm">
                                {preset.label}
                            </Button>
                        ))}
                    </div>
                    <div className="grid gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant="outline"
                                    className={cn(
                                        'w-full justify-start text-left font-normal',
                                        !dateRange && 'text-muted-foreground'
                                    )}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateRange?.from ? (
                                        dateRange.to ? (
                                            <>
                                                {format(
                                                    dateRange.from,
                                                    'LLL dd, y'
                                                )}{' '}
                                                -{' '}
                                                {format(
                                                    dateRange.to,
                                                    'LLL dd, y'
                                                )}
                                            </>
                                        ) : (
                                            format(dateRange.from, 'LLL dd, y')
                                        )
                                    ) : (
                                        <span>Pick a date range</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={dateRange?.from}
                                    selected={dateRange}
                                    onSelect={(range) =>
                                        range && onDateRangeChange(range)
                                    }
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Filters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Event Types */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">
                            Event Types
                        </Label>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {eventTypes.map((eventType) => (
                                <div
                                    key={eventType.value}
                                    className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`event-${eventType.value}`}
                                        checked={filters.eventTypes.includes(
                                            eventType.value
                                        )}
                                        onCheckedChange={(checked) =>
                                            handleEventTypeChange(
                                                eventType.value,
                                                !!checked
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`event-${eventType.value}`}
                                        className="text-sm font-normal cursor-pointer">
                                        {eventType.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User Segments */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">
                            User Segments
                        </Label>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {userSegments.map((segment) => (
                                <div
                                    key={segment.value}
                                    className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`segment-${segment.value}`}
                                        checked={filters.userSegments.includes(
                                            segment.value
                                        )}
                                        onCheckedChange={(checked) =>
                                            handleUserSegmentChange(
                                                segment.value,
                                                !!checked
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`segment-${segment.value}`}
                                        className="text-sm font-normal cursor-pointer">
                                        {segment.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Traffic Sources */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">
                            Traffic Sources
                        </Label>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {trafficSources.map((source) => (
                                <div
                                    key={source.value}
                                    className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`source-${source.value}`}
                                        checked={filters.sources.includes(
                                            source.value
                                        )}
                                        onCheckedChange={(checked) =>
                                            handleSourceChange(
                                                source.value,
                                                !!checked
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor={`source-${source.value}`}
                                        className="text-sm font-normal cursor-pointer">
                                        {source.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Active Filters Display */}
                {getTotalFilterCount() > 0 && (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Active Filters
                        </Label>
                        <div className="flex flex-wrap gap-2">
                            {filters.eventTypes.map((type) => (
                                <Badge
                                    key={`event-${type}`}
                                    variant="secondary"
                                    className="text-xs">
                                    {
                                        eventTypes.find(
                                            (et) => et.value === type
                                        )?.label
                                    }
                                    <button
                                        className="ml-1 hover:text-destructive"
                                        onClick={() =>
                                            handleEventTypeChange(type, false)
                                        }>
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                            {filters.userSegments.map((segment) => (
                                <Badge
                                    key={`segment-${segment}`}
                                    variant="secondary"
                                    className="text-xs">
                                    {
                                        userSegments.find(
                                            (us) => us.value === segment
                                        )?.label
                                    }
                                    <button
                                        className="ml-1 hover:text-destructive"
                                        onClick={() =>
                                            handleUserSegmentChange(
                                                segment,
                                                false
                                            )
                                        }>
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                            {filters.sources.map((source) => (
                                <Badge
                                    key={`source-${source}`}
                                    variant="secondary"
                                    className="text-xs">
                                    {
                                        trafficSources.find(
                                            (ts) => ts.value === source
                                        )?.label
                                    }
                                    <button
                                        className="ml-1 hover:text-destructive"
                                        onClick={() =>
                                            handleSourceChange(source, false)
                                        }>
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
