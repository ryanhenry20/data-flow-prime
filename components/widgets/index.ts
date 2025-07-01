// Main components
export { WidgetMarketplace } from './WidgetMarketplace';
export { WidgetPreviewModal } from './WidgetPreviewModal';
export { WidgetShowcase } from './WidgetShowcase';
// Note: WidgetFactory is not exported here to avoid server-side Recharts import issues

// Widget types
export type {
    Widget,
    WidgetConfig,
    WidgetMetadata,
    WidgetInstance,
    WidgetTemplate,
    WidgetCategory,
    WidgetSize,
    WidgetMarketplaceState,
} from './types';

// Pre-built widgets
export { KPIWidget } from './prebuilt/KPIWidget';
// Note: ChartWidget is not exported here to avoid server-side Recharts import issues
// It's imported directly in WidgetFactory where needed

// Registry and utilities
export {
    widgetRegistry,
    getWidgetById,
    getWidgetsByCategory,
    searchWidgets,
} from './registry';
