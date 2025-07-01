'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WidgetMarketplace, WidgetShowcase } from '@/components/widgets';
import { WidgetStats } from '@/components/widgets/WidgetStats';
import { Layout } from '@/components/layout/Layout';

export default function WidgetDemoPage() {
    return (
        <Layout>
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Widget System Demo
                    </h1>
                    <p className="text-muted-foreground">
                        Comprehensive demonstration of the widget marketplace
                        system
                    </p>
                </div>

                <Tabs defaultValue="marketplace" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="marketplace">
                            Marketplace
                        </TabsTrigger>
                        <TabsTrigger value="showcase">
                            Widget Showcase
                        </TabsTrigger>
                        <TabsTrigger value="stats">Statistics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="marketplace" className="space-y-4">
                        <WidgetMarketplace />
                    </TabsContent>

                    <TabsContent value="showcase" className="space-y-4">
                        <WidgetShowcase />
                    </TabsContent>

                    <TabsContent value="stats" className="space-y-4">
                        <WidgetStats />
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}
