'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNotifications } from '@/hooks/useNotifications';
import {
    CheckCircle,
    AlertCircle,
    AlertTriangle,
    Info,
    Loader2,
    Trash2,
    Save,
    Download,
    Upload,
    Wifi,
    WifiOff,
} from 'lucide-react';

export function NotificationDemo() {
    const {
        success,
        error,
        warning,
        info,
        loading,
        promise,
        withSuccess,
        notifyFormSave,
        notifyFormDelete,
        confirmDeletion,
        handleError,
        handleApiError,
        notifyNetworkError,
        notifyOffline,
        notifyBackOnline,
        dismiss,
        dismissAll,
        MESSAGES,
    } = useNotifications();

    const [loadingId, setLoadingId] = useState<string | number | null>(null);

    // Demo functions
    const handleBasicNotifications = () => {
        success('Operation completed successfully!');

        setTimeout(() => {
            info('This is an informational message');
        }, 1000);

        setTimeout(() => {
            warning('Warning: Please review your settings');
        }, 2000);

        setTimeout(() => {
            error('Something went wrong, please try again');
        }, 3000);
    };

    const handleLoadingNotification = () => {
        const id = loading('Processing your request...', { persistent: true });
        setLoadingId(id);

        // Auto dismiss after 3 seconds
        setTimeout(() => {
            dismiss(id);
            success('Processing complete!');
            setLoadingId(null);
        }, 3000);
    };

    const handlePromiseNotification = () => {
        const mockPromise = new Promise<{ count: number }>(
            (resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.3) {
                        resolve({ count: 42 });
                    } else {
                        reject(new Error('Random failure for demo'));
                    }
                }, 2000);
            }
        );

        promise(mockPromise, {
            loading: 'Fetching data...',
            success: (data) => `Successfully loaded ${data.count} items!`,
            error: 'Failed to fetch data',
        });
    };

    const handleSuccessWrapper = async () => {
        const mockOperation = () =>
            new Promise<string>((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.3) {
                        resolve('Data saved to server');
                    } else {
                        reject(new Error('Server error'));
                    }
                }, 2000);
            });

        await withSuccess(mockOperation, (result) => `Success: ${result}`, {
            loadingMessage: 'Saving to server...',
            errorMessage: 'Failed to save data',
            context: 'saving user data',
        });
    };

    const handleFormOperations = () => {
        // Simulate form save
        setTimeout(() => {
            notifyFormSave(Math.random() > 0.5, 'User Profile');
        }, 500);

        // Simulate form delete
        setTimeout(() => {
            notifyFormDelete(Math.random() > 0.5, 'Document');
        }, 1500);
    };

    const handleDeletionConfirmation = () => {
        confirmDeletion('document', () => {
            success('Document deleted successfully!');
        });
    };

    const handleErrorDemos = () => {
        // Generic error
        setTimeout(() => {
            handleError(new Error('Something went wrong'));
        }, 500);

        // API error
        setTimeout(() => {
            handleApiError(
                { status: 404, message: 'User not found' },
                'fetch user data'
            );
        }, 1500);

        // Network error
        setTimeout(() => {
            notifyNetworkError();
        }, 2500);
    };

    const handleNetworkStatus = () => {
        notifyOffline();

        setTimeout(() => {
            notifyBackOnline();
        }, 3000);
    };

    const handleCustomNotifications = () => {
        success('Custom success with longer duration', { duration: 8000 });

        setTimeout(() => {
            warning('Custom warning with title', {
                title: 'Important Notice',
                duration: 6000,
            });
        }, 1000);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Notification System Demo
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Comprehensive notification and error handling system
                    showcasing all available features.
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Basic Notifications */}
                <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                        Basic Notifications
                        <Badge variant="secondary">Core Features</Badge>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={() => success('Success message!')}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Success
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => error('Error message!')}>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Error
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => warning('Warning message!')}>
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Warning
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => info('Info message!')}>
                            <Info className="h-4 w-4 mr-2" />
                            Info
                        </Button>
                        <Button onClick={handleBasicNotifications}>
                            Show All Types
                        </Button>
                    </div>
                </div>

                <Separator />

                {/* Loading and Promise Notifications */}
                <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                        Advanced Notifications
                        <Badge variant="secondary">Promise Handling</Badge>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            onClick={handleLoadingNotification}
                            disabled={!!loadingId}>
                            <Loader2
                                className={`h-4 w-4 mr-2 ${
                                    loadingId ? 'animate-spin' : ''
                                }`}
                            />
                            Loading Demo
                        </Button>
                        <Button onClick={handlePromiseNotification}>
                            <Download className="h-4 w-4 mr-2" />
                            Promise Demo
                        </Button>
                        <Button onClick={handleSuccessWrapper}>
                            <Save className="h-4 w-4 mr-2" />
                            Success Wrapper
                        </Button>
                        {loadingId && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    dismiss(loadingId);
                                    setLoadingId(null);
                                }}>
                                Cancel Loading
                            </Button>
                        )}
                    </div>
                </div>

                <Separator />

                {/* Form Helpers */}
                <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                        Form Helpers
                        <Badge variant="secondary">CRUD Operations</Badge>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={handleFormOperations}>
                            <Save className="h-4 w-4 mr-2" />
                            Form Operations
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeletionConfirmation}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Confirmation
                        </Button>
                    </div>
                </div>

                <Separator />

                {/* Error Handling */}
                <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                        Error Handling
                        <Badge variant="destructive">Error Management</Badge>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" onClick={handleErrorDemos}>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Error Demos
                        </Button>
                        <Button variant="outline" onClick={handleNetworkStatus}>
                            <WifiOff className="h-4 w-4 mr-2" />
                            Network Status
                        </Button>
                    </div>
                </div>

                <Separator />

                {/* Custom and Control */}
                <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                        Custom & Control
                        <Badge variant="secondary">Advanced Features</Badge>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={handleCustomNotifications}>
                            <Upload className="h-4 w-4 mr-2" />
                            Custom Duration
                        </Button>
                        <Button variant="outline" onClick={dismissAll}>
                            Clear All
                        </Button>
                    </div>
                </div>

                <Separator />

                {/* Usage Examples */}
                <div className="space-y-3">
                    <h3 className="font-semibold">Usage Examples</h3>
                    <div className="bg-muted p-4 rounded-lg text-sm font-mono space-y-2">
                        <div className="text-green-600">{'//'} Basic usage</div>
                        <div>const notifications = useNotifications();</div>
                        <div>
                            notifications.success(&apos;Operation
                            completed!&apos;);
                        </div>
                        <br />
                        <div className="text-green-600">
                            {'//'} Promise handling
                        </div>
                        <div>
                            notifications.promise(apiCall(), {'{'}loading:
                            &apos;Saving...&apos;, success: &apos;Saved!&apos;,
                            error: &apos;Failed&apos;{'}'}
                            );
                        </div>
                        <br />
                        <div className="text-green-600">
                            {'//'} Error handling
                        </div>
                        <div>
                            notifications.handleApiError(error, &apos;save
                            data&apos;);
                        </div>
                    </div>
                </div>

                {/* Constants Reference */}
                <div className="space-y-3">
                    <h3 className="font-semibold">
                        Available Message Constants
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-medium text-green-600 mb-2">
                                Success Messages
                            </h4>
                            <ul className="space-y-1 text-muted-foreground">
                                <li>MESSAGES.SUCCESS.SAVE</li>
                                <li>MESSAGES.SUCCESS.DELETE</li>
                                <li>MESSAGES.SUCCESS.CREATE</li>
                                <li>MESSAGES.SUCCESS.UPDATE</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-red-600 mb-2">
                                Error Messages
                            </h4>
                            <ul className="space-y-1 text-muted-foreground">
                                <li>MESSAGES.ERROR.GENERIC</li>
                                <li>MESSAGES.ERROR.NETWORK</li>
                                <li>MESSAGES.ERROR.UNAUTHORIZED</li>
                                <li>MESSAGES.ERROR.NOT_FOUND</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
