'use client';

import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';

export default function NotFound() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <h1 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
                    Page Not Found
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved.
                </p>
                <Link
                    href="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Return Home
                </Link>
            </div>
        </Layout>
    );
}
