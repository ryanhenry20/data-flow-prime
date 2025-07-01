'use client';

import React from 'react';
import { KPIWidget } from './prebuilt/KPIWidget';
import { ChartWidget } from './prebuilt/ChartWidget';
import { WidgetConfig } from './types';

interface WidgetFactoryProps {
    type: string;
    config: WidgetConfig;
    data?: any;
    chartType?: 'line' | 'area' | 'bar' | 'pie';
    dataKey?: string;
    xAxisKey?: string;
}

export function WidgetFactory({
    type,
    config,
    data,
    chartType = 'line',
    dataKey = 'value',
    xAxisKey = 'name',
}: WidgetFactoryProps) {
    switch (type) {
        case 'kpi':
            return <KPIWidget config={config} data={data} />;

        case 'chart-line':
            return (
                <ChartWidget
                    config={config}
                    data={data}
                    chartType="line"
                    dataKey={dataKey}
                    xAxisKey={xAxisKey}
                />
            );

        case 'chart-area':
            return (
                <ChartWidget
                    config={config}
                    data={data}
                    chartType="area"
                    dataKey={dataKey}
                    xAxisKey={xAxisKey}
                />
            );

        case 'chart-bar':
            return (
                <ChartWidget
                    config={config}
                    data={data}
                    chartType="bar"
                    dataKey={dataKey}
                    xAxisKey={xAxisKey}
                />
            );

        case 'chart-pie':
            return (
                <ChartWidget
                    config={config}
                    data={data}
                    chartType="pie"
                    dataKey={dataKey}
                    xAxisKey={xAxisKey}
                />
            );

        default:
            return (
                <div className="p-4 border border-dashed border-muted-foreground/50 rounded-lg text-center text-muted-foreground">
                    Unknown widget type: {type}
                </div>
            );
    }
}
