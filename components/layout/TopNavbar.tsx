'use client';

import { useState, useEffect } from 'react';
import { Search, Menu, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommandPalette } from '@/components/ui/command-palette';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { NotificationCenter } from '@/components/ui/notification-center';
import { UserProfileDropdown } from '@/components/ui/user-profile-dropdown';
import { useSidebar } from '@/components/ui/sidebar';

export function TopNavbar() {
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const { toggleSidebar } = useSidebar();

    // Global keyboard shortcut for command palette
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowCommandPalette(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <header className="flex h-16 items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md px-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSidebar}
                        className="lg:hidden">
                        <Menu className="w-5 h-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={() => setShowCommandPalette(true)}
                        className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <Search className="w-4 h-4" />
                        <span className="text-sm">Search...</span>
                        <div className="hidden sm:flex items-center gap-1 ml-auto">
                            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-neutral-100 dark:bg-neutral-800 px-1.5 font-mono text-[10px] font-medium text-neutral-600 dark:text-neutral-400">
                                <Command className="w-3 h-3" />K
                            </kbd>
                        </div>
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <NotificationCenter />
                    <UserProfileDropdown />
                </div>
            </header>

            {/* Breadcrumb Navigation */}
            <div className="px-6 py-3 border-b border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-gray-950/50">
                <BreadcrumbNav />
            </div>

            <CommandPalette
                open={showCommandPalette}
                onOpenChange={setShowCommandPalette}
            />
        </>
    );
}
