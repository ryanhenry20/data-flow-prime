'use client';

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    ReactNode,
} from 'react';
import { Widget } from '@/components/widgets/types';

export interface DashboardWidget {
    id: string;
    widgetId: string;
    position: { x: number; y: number; w: number; h: number };
    config?: any;
}

interface DashboardWidgetsContextType {
    dashboardWidgets: DashboardWidget[];
    addWidget: (
        widget: Widget,
        position?: { x: number; y: number; w: number; h: number }
    ) => void;
    removeWidget: (id: string) => void;
    updateWidget: (id: string, updates: Partial<DashboardWidget>) => void;
    isWidgetOnDashboard: (widgetId: string) => boolean;
}

const DashboardWidgetsContext = createContext<
    DashboardWidgetsContextType | undefined
>(undefined);

const DASHBOARD_WIDGETS_STORAGE_KEY = 'data-flow-prime.dashboard-widgets.v1';

function isValidDashboardWidget(value: unknown): value is DashboardWidget {
    if (!value || typeof value !== 'object') return false;

    const candidate = value as Partial<DashboardWidget>;
    return (
        typeof candidate.id === 'string' &&
        typeof candidate.widgetId === 'string' &&
        !!candidate.position &&
        typeof candidate.position.x === 'number' &&
        typeof candidate.position.y === 'number' &&
        typeof candidate.position.w === 'number' &&
        typeof candidate.position.h === 'number'
    );
}

function loadPersistedWidgets(): DashboardWidget[] {
    if (typeof window === 'undefined') return [];

    try {
        const raw = window.localStorage.getItem(DASHBOARD_WIDGETS_STORAGE_KEY);
        if (!raw) return [];

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        return parsed.filter(isValidDashboardWidget);
    } catch {
        return [];
    }
}

export function DashboardWidgetsProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [dashboardWidgets, setDashboardWidgets] = useState<DashboardWidget[]>(
        []
    );
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setDashboardWidgets(loadPersistedWidgets());
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated || typeof window === 'undefined') return;

        window.localStorage.setItem(
            DASHBOARD_WIDGETS_STORAGE_KEY,
            JSON.stringify(dashboardWidgets)
        );
    }, [dashboardWidgets, isHydrated]);

    const addWidget = useCallback(
        (
            widget: Widget,
            position?: { x: number; y: number; w: number; h: number }
        ) => {
            const defaultPosition = position || {
                x: 0,
                y: 0,
                w:
                    widget.config.size === 'small'
                        ? 2
                        : widget.config.size === 'medium'
                        ? 3
                        : widget.config.size === 'large'
                        ? 4
                        : 6,
                h:
                    widget.config.size === 'small'
                        ? 2
                        : widget.config.size === 'medium'
                        ? 3
                        : widget.config.size === 'large'
                        ? 4
                        : 5,
            };

            const newWidget: DashboardWidget = {
                id: `widget-${Date.now()}-${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                widgetId: widget.metadata.id,
                position: defaultPosition,
                config: widget.config,
            };

            setDashboardWidgets((prev) => [...prev, newWidget]);
        },
        []
    );

    const removeWidget = useCallback((id: string) => {
        setDashboardWidgets((prev) => prev.filter((w) => w.id !== id));
    }, []);

    const updateWidget = useCallback(
        (id: string, updates: Partial<DashboardWidget>) => {
            setDashboardWidgets((prev) =>
                prev.map((w) => (w.id === id ? { ...w, ...updates } : w))
            );
        },
        []
    );

    const isWidgetOnDashboard = useCallback(
        (widgetId: string) => {
            return dashboardWidgets.some((w) => w.widgetId === widgetId);
        },
        [dashboardWidgets]
    );

    const value: DashboardWidgetsContextType = {
        dashboardWidgets,
        addWidget,
        removeWidget,
        updateWidget,
        isWidgetOnDashboard,
    };

    return React.createElement(
        DashboardWidgetsContext.Provider,
        { value },
        children
    );
}

export function useDashboardWidgets() {
    const context = useContext(DashboardWidgetsContext);
    if (context === undefined) {
        throw new Error(
            'useDashboardWidgets must be used within a DashboardWidgetsProvider'
        );
    }
    return context;
}
