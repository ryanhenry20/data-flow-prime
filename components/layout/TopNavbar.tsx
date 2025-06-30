'use client';

import { useState } from 'react';
import { Bell, Search, Settings, User, Menu, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CommandPalette } from '@/components/ui/command-palette';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';

export function TopNavbar() {
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const { toggleSidebar } = useSidebar();

    return (
        <>
            <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white/80 backdrop-blur-md px-6">
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
                        className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100">
                        <Search className="w-4 h-4" />
                        <span className="text-sm">Search...</span>
                        <div className="hidden sm:flex items-center gap-1 ml-auto">
                            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-neutral-100 px-1.5 font-mono text-[10px] font-medium text-neutral-600">
                                <Command className="w-3 h-3" />K
                            </kbd>
                        </div>
                    </Button>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="relative">
                        <Bell className="w-5 h-5" />
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                            3
                        </Badge>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="relative">
                                <User className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <CommandPalette
                open={showCommandPalette}
                onOpenChange={setShowCommandPalette}
            />
        </>
    );
}
