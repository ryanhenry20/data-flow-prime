import { Layout } from '@/components/layout/Layout';
import { UserMetricsTable } from '@/components/analytics/UserMetricsTable';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Users, UserCheck, UserPlus, Activity } from 'lucide-react';

export default function UsersPage() {
    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        User Management
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage users and analyze their engagement metrics and
                        behavior patterns.
                    </p>
                </div>

                {/* User Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Users
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8,549</div>
                            <p className="text-xs text-muted-foreground">
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Users
                            </CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">6,423</div>
                            <p className="text-xs text-muted-foreground">
                                75.1% engagement rate
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                New Signups
                            </CardTitle>
                            <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">324</div>
                            <p className="text-xs text-muted-foreground">
                                This week
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Avg Session
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4m 32s</div>
                            <p className="text-xs text-muted-foreground">
                                +8% improvement
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* User Metrics Table */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            User Analytics
                        </h2>
                        <p className="text-muted-foreground">
                            Comprehensive view of user engagement, session data,
                            and behavioral metrics.
                        </p>
                    </div>
                    <UserMetricsTable />
                </div>

                {/* Feature Description */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Analytics Features</CardTitle>
                        <CardDescription>
                            Understanding user behavior through advanced
                            analytics
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-blue-500" />
                                    Engagement Scoring
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Advanced algorithms calculate user
                                    engagement scores based on session duration,
                                    page views, and interaction patterns.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Users className="h-4 w-4 text-green-500" />
                                    User Segmentation
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Automatic categorization of users into high,
                                    medium, and low value segments for targeted
                                    marketing and retention strategies.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <UserCheck className="h-4 w-4 text-purple-500" />
                                    Conversion Tracking
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Monitor user conversion rates and identify
                                    opportunities to improve the user journey
                                    and increase conversions.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <UserPlus className="h-4 w-4 text-orange-500" />
                                    Behavioral Analysis
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Track session patterns, page view trends,
                                    and user activity to understand how users
                                    interact with your platform.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
