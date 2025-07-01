'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

interface BreadcrumbNavProps {
    className?: string;
}

export function BreadcrumbNav({ className }: BreadcrumbNavProps) {
    const pathname = usePathname();

    const generateBreadcrumbs = React.useMemo(() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const breadcrumbs: BreadcrumbItem[] = [
            {
                label: 'Dashboard',
                href: '/',
                icon: <Home className="w-4 h-4" />,
            },
        ];

        // Map path segments to readable labels
        const pathLabels: Record<string, string> = {
            analytics: 'Analytics',
            reports: 'Reports',
            users: 'Users',
            settings: 'Settings',
            'ai-insights': 'AI Insights',
            predictions: 'Predictions',
            alerts: 'Smart Alerts',
            calendar: 'Calendar',
            search: 'Search',
        };

        let currentPath = '';
        pathSegments.forEach((segment) => {
            currentPath += `/${segment}`;
            breadcrumbs.push({
                label:
                    pathLabels[segment] ||
                    segment.charAt(0).toUpperCase() + segment.slice(1),
                href: currentPath,
            });
        });

        return breadcrumbs;
    }, [pathname]);

    // Don't show breadcrumbs on home page
    if (pathname === '/') {
        return null;
    }

    return (
        <nav
            className={cn(
                'flex items-center space-x-1 text-sm text-muted-foreground',
                className
            )}
            aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1">
                {generateBreadcrumbs.map((item, index) => (
                    <li key={item.href} className="flex items-center">
                        {index > 0 && (
                            <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground/50" />
                        )}
                        {index === generateBreadcrumbs.length - 1 ? (
                            <span className="flex items-center gap-1.5 font-medium text-foreground">
                                {item.icon}
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                                {item.icon}
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
