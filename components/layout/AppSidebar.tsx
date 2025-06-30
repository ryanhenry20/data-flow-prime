'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    TrendingUp,
    Users,
    Settings,
    Bell,
    FileText,
    PieChart,
    Calendar,
    Search,
    Star,
} from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
    { title: 'Dashboard', url: '/', icon: LayoutDashboard },
    { title: 'Analytics', url: '/analytics', icon: TrendingUp },
    { title: 'Reports', url: '/reports', icon: FileText },
    { title: 'Users', url: '/users', icon: Users },
];

const aiFeatures = [
    { title: 'AI Insights', url: '/ai-insights', icon: Star },
    { title: 'Predictions', url: '/predictions', icon: TrendingUp },
    { title: 'Smart Alerts', url: '/alerts', icon: Bell },
];

const otherItems = [
    { title: 'Calendar', url: '/calendar', icon: Calendar },
    { title: 'Search', url: '/search', icon: Search },
    { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
    const { state } = useSidebar();
    const pathname = usePathname();
    const collapsed = state === 'collapsed';

    const isActive = (path: string) => pathname === path;

    return (
        <Sidebar
            className={`${
                collapsed ? 'w-16' : 'w-64'
            } border-r border-neutral-200 bg-white`}
            collapsible="icon">
            <SidebarContent className="p-0">
                {/* Logo */}
                <div className="p-6 border-b border-neutral-200">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <PieChart className="w-4 h-4 text-white" />
                        </div>
                        {!collapsed && (
                            <div>
                                <h1 className="font-bold text-neutral-900">
                                    Analytics AI
                                </h1>
                                <p className="text-xs text-neutral-500">
                                    Enterprise Dashboard
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Navigation */}
                <SidebarGroup className="px-3 py-4">
                    <SidebarGroupLabel className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                        {!collapsed && 'Main'}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="h-10">
                                        <Link
                                            href={item.url}
                                            className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-neutral-700
                        ${
                            isActive(item.url)
                                ? 'bg-blue-50 !text-blue-600 font-medium border-r-2 border-blue-500'
                                : 'hover:bg-neutral-50 hover:!text-neutral-900'
                        }
                      `}>
                                            <item.icon className="w-5 h-5 flex-shrink-0" />
                                            {!collapsed && (
                                                <span className="text-sm">
                                                    {item.title}
                                                </span>
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* AI Features */}
                <SidebarGroup className="px-3 py-4">
                    <SidebarGroupLabel className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">
                        {!collapsed && 'AI Powered'}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {aiFeatures.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="h-10">
                                        <Link
                                            href={item.url}
                                            className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-neutral-700
                        ${
                            isActive(item.url)
                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 !text-white font-medium shadow-lg'
                                : 'hover:bg-purple-50 hover:!text-purple-600'
                        }
                      `}>
                                            <item.icon className="w-5 h-5 flex-shrink-0" />
                                            {!collapsed && (
                                                <span className="text-sm">
                                                    {item.title}
                                                </span>
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Other Items */}
                <SidebarGroup className="px-3 py-4 mt-auto">
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {otherItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="h-10">
                                        <Link
                                            href={item.url}
                                            className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-neutral-700
                        ${
                            isActive(item.url)
                                ? 'bg-blue-50 !text-blue-600 font-medium border-r-2 border-blue-500'
                                : 'hover:bg-neutral-50 hover:!text-neutral-900'
                        }
                      `}>
                                            <item.icon className="w-5 h-5 flex-shrink-0" />
                                            {!collapsed && (
                                                <span className="text-sm">
                                                    {item.title}
                                                </span>
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
