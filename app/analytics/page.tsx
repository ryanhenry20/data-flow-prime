import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnalyticsEventsTable } from '@/components/analytics/AnalyticsEventsTable';
import { UserMetricsTable } from '@/components/analytics/UserMetricsTable';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Activity, Users, BarChart3, TrendingUp } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Analytics
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Deep dive into your data analytics and insights with
                        advanced data tables.
                    </p>
                </div>

                {/* Feature Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Advanced Tables
                            </CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">TanStack</div>
                            <p className="text-xs text-muted-foreground">
                                Powerful data table functionality
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Live Data
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Real-time</div>
                            <p className="text-xs text-muted-foreground">
                                Supabase integration
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Export Ready
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">CSV</div>
                            <p className="text-xs text-muted-foreground">
                                One-click data export
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                User Analytics
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Insights</div>
                            <p className="text-xs text-muted-foreground">
                                Comprehensive user metrics
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Tables */}
                <Tabs defaultValue="events" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                            value="events"
                            className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Analytics Events
                        </TabsTrigger>
                        <TabsTrigger
                            value="users"
                            className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            User Metrics
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="events" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Analytics Events
                                </h2>
                                <p className="text-muted-foreground">
                                    Track and analyze user interactions, page
                                    views, and behavioral data in real-time.
                                </p>
                            </div>
                            <AnalyticsEventsTable />
                        </div>
                    </TabsContent>

                    <TabsContent value="users" className="space-y-4">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    User Metrics
                                </h2>
                                <p className="text-muted-foreground">
                                    Comprehensive user analytics including
                                    sessions, engagement scores, and conversion
                                    rates.
                                </p>
                            </div>
                            <UserMetricsTable />
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Feature Highlights */}
                <Card>
                    <CardHeader>
                        <CardTitle>Advanced Data Table Features</CardTitle>
                        <CardDescription>
                            Explore the powerful capabilities of our TanStack
                            Table integration
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-blue-500" />
                                    Sorting & Filtering
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Multi-column sorting, search functionality,
                                    and advanced filtering options.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Users className="h-4 w-4 text-green-500" />
                                    Row Selection
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Bulk operations with multi-row selection and
                                    batch actions.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-purple-500" />
                                    Pagination
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Efficient data handling with customizable
                                    page sizes and navigation.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-orange-500" />
                                    Column Visibility
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Hide/show columns dynamically with
                                    persistent user preferences.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-red-500" />
                                    Export Functions
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    One-click CSV export with filtered data and
                                    proper formatting.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-indigo-500" />
                                    Real-time Updates
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Live data synchronization with Supabase
                                    real-time subscriptions.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
