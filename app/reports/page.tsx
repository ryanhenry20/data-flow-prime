'use client';

import { Layout } from '@/components/layout/Layout';

export default function ReportsPage() {
    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">
                        Reports
                    </h1>
                    <p className="text-neutral-600 mt-1">
                        Generate and view comprehensive reports.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">
                            Monthly Reports
                        </h2>
                        <p className="text-neutral-600">
                            Generate monthly performance reports.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">
                            Custom Reports
                        </h2>
                        <p className="text-neutral-600">
                            Create custom reports with specific metrics.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
