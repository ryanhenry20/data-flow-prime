'use client';

import * as React from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import {
    Search,
    Calendar,
    Users,
    Settings,
    TrendingUp,
    FileText,
    Bell,
    LayoutDashboard,
    Star,
    Download,
    Moon,
    Sun,
    Monitor,
    Palette,
    History,
    Table,
    Activity,
    BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

const Command = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
    <CommandPrimitive
        ref={ref}
        className={cn(
            'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
            className
        )}
        {...props}
    />
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
    return (
        <Dialog {...props}>
            <DialogContent className="overflow-hidden p-0 shadow-lg [&>div]:max-w-[650px]">
                <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                    {children}
                </Command>
            </DialogContent>
        </Dialog>
    );
};

const CommandInput = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandPrimitive.Input
            ref={ref}
            className={cn(
                'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        />
    </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.List
        ref={ref}
        className={cn(
            'max-h-[400px] overflow-y-auto overflow-x-hidden',
            className
        )}
        {...props}
    />
));
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Empty>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ ...props }, ref) => (
    <CommandPrimitive.Empty
        ref={ref}
        className="py-6 text-center text-sm"
        {...props}
    />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Group>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Group
        ref={ref}
        className={cn(
            'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
            className
        )}
        {...props}
    />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
        ref={ref}
        className={cn('-mx-1 h-px bg-border', className)}
        {...props}
    />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Item
        ref={ref}
        className={cn(
            'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
            className
        )}
        {...props}
    />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn(
                'ml-auto text-xs tracking-widest text-muted-foreground',
                className
            )}
            {...props}
        />
    );
};
CommandShortcut.displayName = 'CommandShortcut';

interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
    const router = useRouter();
    const { setTheme } = useTheme();
    const [inputValue, setInputValue] = React.useState('');

    const commands = [
        {
            group: 'Recent',
            items: [
                {
                    icon: History,
                    label: 'Go to Analytics',
                    shortcut: '',
                    action: () => router.push('/analytics'),
                },
                {
                    icon: History,
                    label: 'Export Dashboard',
                    shortcut: '',
                    action: () => console.log('Export dashboard'),
                },
            ],
        },
        {
            group: 'Navigation',
            items: [
                {
                    icon: LayoutDashboard,
                    label: 'Dashboard',
                    shortcut: '⌘H',
                    action: () => router.push('/'),
                },
                {
                    icon: TrendingUp,
                    label: 'Analytics',
                    shortcut: '⌘A',
                    action: () => router.push('/analytics'),
                },
                {
                    icon: FileText,
                    label: 'Reports',
                    shortcut: '⌘R',
                    action: () => router.push('/reports'),
                },
                {
                    icon: Users,
                    label: 'Users',
                    shortcut: '⌘U',
                    action: () => router.push('/users'),
                },
                {
                    icon: Settings,
                    label: 'Settings',
                    shortcut: '⌘,',
                    action: () => router.push('/settings'),
                },
            ],
        },
        {
            group: 'Data Tables',
            items: [
                {
                    icon: Activity,
                    label: 'Analytics Events',
                    shortcut: '⌘⇧E',
                    action: () => router.push('/analytics'),
                },
                {
                    icon: Users,
                    label: 'User Metrics',
                    shortcut: '⌘⇧U',
                    action: () => router.push('/users'),
                },
                {
                    icon: Table,
                    label: 'Advanced Tables',
                    shortcut: '⌘T',
                    action: () => router.push('/analytics'),
                },
                {
                    icon: BarChart3,
                    label: 'Export Analytics Data',
                    shortcut: '⌘⇧X',
                    action: () => console.log('Export analytics data'),
                },
            ],
        },
        {
            group: 'AI Features',
            items: [
                {
                    icon: Star,
                    label: 'AI Insights',
                    shortcut: '⌘I',
                    action: () => router.push('/ai-insights'),
                },
                {
                    icon: TrendingUp,
                    label: 'Predictions',
                    shortcut: '⌘P',
                    action: () => router.push('/predictions'),
                },
                {
                    icon: Bell,
                    label: 'Smart Alerts',
                    shortcut: '⌘⇧A',
                    action: () => router.push('/alerts'),
                },
            ],
        },
        {
            group: 'Theme',
            items: [
                {
                    icon: Sun,
                    label: 'Light mode',
                    shortcut: '',
                    action: () => setTheme('light'),
                },
                {
                    icon: Moon,
                    label: 'Dark mode',
                    shortcut: '',
                    action: () => setTheme('dark'),
                },
                {
                    icon: Monitor,
                    label: 'System theme',
                    shortcut: '',
                    action: () => setTheme('system'),
                },
            ],
        },
        {
            group: 'Quick Actions',
            items: [
                {
                    icon: Download,
                    label: 'Export Dashboard',
                    shortcut: '⌘E',
                    action: () => console.log('Export dashboard'),
                },
                {
                    icon: Calendar,
                    label: 'Schedule Report',
                    shortcut: '⌘⇧S',
                    action: () => console.log('Schedule report'),
                },
                {
                    icon: Palette,
                    label: 'Customize Dashboard',
                    shortcut: '⌘⇧D',
                    action: () => console.log('Customize dashboard'),
                },
            ],
        },
    ];

    const handleSelect = (action: () => void) => {
        action();
        onOpenChange(false);
        setInputValue('');
    };

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput
                placeholder="Type a command or search..."
                value={inputValue}
                onValueChange={setInputValue}
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {commands.map((group) => (
                    <CommandGroup key={group.group} heading={group.group}>
                        {group.items.map((item, index) => (
                            <CommandItem
                                key={`${group.group}-${index}`}
                                onSelect={() => handleSelect(item.action)}
                                className="flex items-center gap-3 cursor-pointer">
                                <item.icon className="w-4 h-4" />
                                <span className="flex-1">{item.label}</span>
                                {item.shortcut && (
                                    <CommandShortcut>
                                        {item.shortcut}
                                    </CommandShortcut>
                                )}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                ))}
            </CommandList>
        </CommandDialog>
    );
}

export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
};
