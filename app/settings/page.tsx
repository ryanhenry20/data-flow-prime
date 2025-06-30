import { Layout } from '@/components/layout/Layout';

export default function SettingsPage() {
    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">
                        Settings
                    </h1>
                    <p className="text-neutral-600 mt-1">
                        Configure your application settings.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">
                            General Settings
                        </h2>
                        <p className="text-neutral-600">
                            Configure general application settings.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">
                            User Preferences
                        </h2>
                        <p className="text-neutral-600">
                            Customize your user experience.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
