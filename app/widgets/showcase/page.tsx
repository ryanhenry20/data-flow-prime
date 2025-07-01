'use client';

import { WidgetShowcase } from '@/components/widgets/WidgetShowcase';
import { Layout } from '@/components/layout/Layout';

export default function WidgetShowcasePage() {
    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        Widget Showcase
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                        Explore all available widgets with different sizes and
                        configurations.
                    </p>
                </div>
                <WidgetShowcase />
            </div>
        </Layout>
    );
}
