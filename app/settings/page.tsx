'use client';

import { Layout } from '@/components/layout/Layout';
import { NotificationDemo } from '@/components/ui/notification-demo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        Settings
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                        Configure your application settings and test
                        notification features.
                    </p>
                </div>

                {/* Notification System Demo */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                            Notification System
                        </h2>
                        <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            ✅ Completed
                        </Badge>
                    </div>
                    <NotificationDemo />
                </div>

                <Separator />

                {/* Settings Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-neutral-900 dark:text-neutral-100">
                                General Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Configure general application settings. This
                                section will include API configurations, data
                                refresh intervals, and default preferences.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-neutral-900 dark:text-neutral-100">
                                User Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 dark:text-neutral-400">
                                Customize your user experience including theme
                                preferences, notification settings, and
                                dashboard layout options.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Development Progress Note */}
                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                    <CardHeader>
                        <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2">
                            🚀 Development Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-800 dark:text-blue-200">
                            The notification system has been successfully
                            implemented with comprehensive error handling, toast
                            notifications, and user feedback features. You can
                            test all notification types using the demo above.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
