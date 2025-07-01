'use client';

import * as React from 'react';
import {
    Bell,
    X,
    Info,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    Users,
    Settings,
    MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Notification {
    id: string;
    type: 'info' | 'warning' | 'success' | 'alert';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
}

interface NotificationCenterProps {
    notifications?: Notification[];
}

const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'success',
        title: 'Analytics Report Ready',
        message:
            'Your monthly analytics report has been generated successfully.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false,
        actionUrl: '/reports',
    },
    {
        id: '2',
        type: 'warning',
        title: 'High CPU Usage Detected',
        message: 'Server CPU usage has exceeded 80% for the past 10 minutes.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        read: false,
    },
    {
        id: '3',
        type: 'info',
        title: 'New User Registered',
        message: '127 new users have joined your platform today.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: true,
        actionUrl: '/users',
    },
    {
        id: '4',
        type: 'alert',
        title: 'Security Alert',
        message: 'Unusual login activity detected from a new location.',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        read: true,
    },
];

const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
        case 'success':
            return <CheckCircle className="w-4 h-4 text-green-500" />;
        case 'warning':
            return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
        case 'alert':
            return <AlertTriangle className="w-4 h-4 text-red-500" />;
        case 'info':
        default:
            return <Info className="w-4 h-4 text-blue-500" />;
    }
};

const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
        return `${minutes}m ago`;
    } else if (hours < 24) {
        return `${hours}h ago`;
    } else {
        return `${days}d ago`;
    }
};

export function NotificationCenter({
    notifications = mockNotifications,
}: NotificationCenterProps) {
    const [notificationList, setNotificationList] =
        React.useState(notifications);
    const unreadCount = notificationList.filter((n) => !n.read).length;

    const markAsRead = (id: string) => {
        setNotificationList((prev) =>
            prev.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotificationList((prev) =>
            prev.map((notification) => ({ ...notification, read: true }))
        );
    };

    const removeNotification = (id: string) => {
        setNotificationList((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between p-4">
                    <DropdownMenuLabel className="p-0 font-semibold">
                        Notifications
                    </DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs h-6 px-2">
                            Mark all read
                        </Button>
                    )}
                </div>
                <DropdownMenuSeparator />

                {notificationList.length === 0 ? (
                    <div className="p-6 text-center text-sm text-muted-foreground">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        No notifications
                    </div>
                ) : (
                    <ScrollArea className="max-h-96">
                        <div className="space-y-1">
                            {notificationList.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        'flex items-start gap-3 p-3 hover:bg-accent transition-colors cursor-pointer',
                                        !notification.read && 'bg-accent/50'
                                    )}
                                    onClick={() => markAsRead(notification.id)}>
                                    <div className="flex-shrink-0 mt-0.5">
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 space-y-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4
                                                className={cn(
                                                    'text-sm font-medium leading-none truncate',
                                                    !notification.read &&
                                                        'font-semibold'
                                                )}>
                                                {notification.title}
                                            </h4>
                                            <div className="flex items-center gap-1">
                                                {!notification.read && (
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeNotification(
                                                            notification.id
                                                        );
                                                    }}
                                                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground">
                                                    <X className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatTimestamp(
                                                notification.timestamp
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}

                {notificationList.length > 0 && (
                    <>
                        <DropdownMenuSeparator />
                        <div className="p-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full text-xs">
                                View all notifications
                            </Button>
                        </div>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
