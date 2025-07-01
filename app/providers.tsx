'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { DashboardWidgetsProvider } from '@/hooks/useDashboardWidgets';

export function ReactQueryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>
                <DashboardWidgetsProvider>{children}</DashboardWidgetsProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
