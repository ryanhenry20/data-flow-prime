import { Layout } from '@/components/layout/Layout';

export default function UsersPage() {
    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">
                        Users
                    </h1>
                    <p className="text-neutral-600 mt-1">
                        Manage users and user analytics.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">
                            User Management
                        </h2>
                        <p className="text-neutral-600">
                            Add, edit, and manage user accounts.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">
                            User Analytics
                        </h2>
                        <p className="text-neutral-600">
                            Analyze user behavior and engagement.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
