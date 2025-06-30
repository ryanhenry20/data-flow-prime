import { Layout } from '@/components/layout/Layout';

export default function AnalyticsPage() {
    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">
                        Analytics
                    </h1>
                    <p className="text-neutral-600 mt-1">
                        Deep dive into your data analytics and insights.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">
                            Advanced Analytics
                        </h2>
                        <p className="text-neutral-600">
                            Detailed analytics features will be implemented
                            here.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">
                            Data Insights
                        </h2>
                        <p className="text-neutral-600">
                            AI-powered insights and recommendations.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
