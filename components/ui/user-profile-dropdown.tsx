'use client';

import * as React from 'react';
import {
    User,
    Settings,
    LogOut,
    CreditCard,
    Bell,
    Shield,
    HelpCircle,
    Keyboard,
    Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
    DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/hooks/useNotifications';

interface UserProfileDropdownProps {
    user?: {
        name: string;
        email: string;
        avatar?: string;
        initials?: string;
    };
}

export function UserProfileDropdown({ user }: UserProfileDropdownProps) {
    const router = useRouter();
    const { info, success } = useNotifications();
    // Default user data for now
    const currentUser = user || {
        name: 'John Doe',
        email: 'john@example.com',
        initials: 'JD',
    };

    const handleAction = (action: string) => {
        switch (action) {
            case 'profile':
                router.push('/users');
                break;
            case 'billing':
                info('Billing workspace can be connected here.');
                break;
            case 'settings':
                router.push('/settings');
                break;
            case 'notifications':
                router.push('/alerts');
                break;
            case 'customize':
                router.push('/widgets');
                break;
            case 'shortcuts':
                info('Press Cmd/Ctrl + K to open command palette.');
                break;
            case 'security':
                info('Security center can be added in Settings.');
                break;
            case 'help':
                info('Open /search and type "help" to find support docs.');
                break;
            case 'logout':
                success('Session ended locally.');
                break;
            default:
                break;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src={currentUser.avatar}
                            alt={currentUser.name}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            {currentUser.initials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {currentUser.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {currentUser.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleAction('profile')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('billing')}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('settings')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => handleAction('notifications')}>
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Notifications</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleAction('customize')}>
                        <Palette className="mr-2 h-4 w-4" />
                        <span>Customize Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('shortcuts')}>
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Keyboard Shortcuts</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction('security')}>
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Security</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleAction('help')}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleAction('logout')}
                    className="text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
