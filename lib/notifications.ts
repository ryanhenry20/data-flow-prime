import { toast } from 'sonner';
import {
    CheckCircle,
    AlertTriangle,
    Info,
    XCircle,
    Loader2,
} from 'lucide-react';

export type NotificationType =
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'loading';

interface NotificationOptions {
    title?: string;
    description?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
    onDismiss?: () => void;
    persistent?: boolean;
}

class NotificationService {
    private activeToasts = new Map<string, string | number>();

    /**
     * Show a success notification
     */
    success(message: string, options?: NotificationOptions) {
        return this.show('success', message, options);
    }

    /**
     * Show an error notification
     */
    error(message: string, options?: NotificationOptions) {
        return this.show('error', message, {
            ...options,
            duration: options?.duration || 6000, // Longer duration for errors
        });
    }

    /**
     * Show a warning notification
     */
    warning(message: string, options?: NotificationOptions) {
        return this.show('warning', message, options);
    }

    /**
     * Show an info notification
     */
    info(message: string, options?: NotificationOptions) {
        return this.show('info', message, options);
    }

    /**
     * Show a loading notification
     */
    loading(message: string, options?: NotificationOptions) {
        return this.show('loading', message, {
            ...options,
            persistent: true,
        });
    }

    /**
     * Show a promise notification that updates based on promise state
     */
    promise<T>(
        promise: Promise<T>,
        {
            loading: loadingMessage,
            success: successMessage,
            error: errorMessage,
        }: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((error: any) => string);
        }
    ) {
        return toast.promise(promise, {
            loading: loadingMessage,
            success: (data) => {
                return typeof successMessage === 'function'
                    ? successMessage(data)
                    : successMessage;
            },
            error: (error) => {
                return typeof errorMessage === 'function'
                    ? errorMessage(error)
                    : errorMessage;
            },
        });
    }

    /**
     * Dismiss a specific notification by ID
     */
    dismiss(id: string | number) {
        toast.dismiss(id);
        this.activeToasts.delete(id.toString());
    }

    /**
     * Dismiss all notifications
     */
    dismissAll() {
        toast.dismiss();
        this.activeToasts.clear();
    }

    /**
     * Update an existing notification
     */
    update(
        id: string,
        type: NotificationType,
        message: string,
        options?: NotificationOptions
    ): string | number {
        const toastId = this.activeToasts.get(id);
        if (toastId) {
            toast.dismiss(toastId);
        }
        const newToastId = this.show(type, message, options);
        this.activeToasts.set(id, newToastId);
        return newToastId;
    }

    /**
     * Show a custom notification with actions
     */
    custom(
        message: string,
        actions: Array<{
            label: string;
            onClick: () => void;
            style?: 'default' | 'destructive';
        }>,
        options?: NotificationOptions
    ) {
        return toast(message, {
            description: options?.description,
            duration: options?.duration || 5000,
            action:
                actions.length > 0
                    ? {
                          label: actions[0].label,
                          onClick: actions[0].onClick,
                      }
                    : undefined,
            onDismiss: options?.onDismiss,
        });
    }

    private show(
        type: NotificationType,
        message: string,
        options?: NotificationOptions
    ): string | number {
        const { title, description, duration, action, onDismiss, persistent } =
            options || {};

        const config = {
            description: title ? description : undefined,
            duration: persistent ? Infinity : duration || 4000,
            action: action
                ? {
                      label: action.label,
                      onClick: action.onClick,
                  }
                : undefined,
            onDismiss,
        };

        let toastId: string | number;

        switch (type) {
            case 'success':
                toastId = toast.success(title || message, config);
                break;
            case 'error':
                toastId = toast.error(title || message, config);
                break;
            case 'warning':
                toastId = toast.warning(title || message, config);
                break;
            case 'info':
                toastId = toast.info(title || message, config);
                break;
            case 'loading':
                toastId = toast.loading(title || message, config);
                break;
            default:
                toastId = toast(title || message, config);
        }

        return toastId;
    }
}

// Export singleton instance
export const notifications = new NotificationService();

// Convenience functions for common use cases
export const notify = {
    success: (message: string, options?: NotificationOptions) =>
        notifications.success(message, options),
    error: (message: string, options?: NotificationOptions) =>
        notifications.error(message, options),
    warning: (message: string, options?: NotificationOptions) =>
        notifications.warning(message, options),
    info: (message: string, options?: NotificationOptions) =>
        notifications.info(message, options),
    loading: (message: string, options?: NotificationOptions) =>
        notifications.loading(message, options),
    promise: notifications.promise.bind(notifications),
};

// Common notification messages
export const NOTIFICATIONS = {
    SUCCESS: {
        SAVE: 'Changes saved successfully',
        DELETE: 'Item deleted successfully',
        CREATE: 'Item created successfully',
        UPDATE: 'Item updated successfully',
        EXPORT: 'Export completed successfully',
        IMPORT: 'Import completed successfully',
    },
    ERROR: {
        GENERIC: 'Something went wrong. Please try again.',
        NETWORK: 'Network error. Please check your connection.',
        UNAUTHORIZED: 'You are not authorized to perform this action.',
        NOT_FOUND: 'The requested item was not found.',
        VALIDATION: 'Please check your input and try again.',
        SAVE: 'Failed to save changes',
        DELETE: 'Failed to delete item',
        EXPORT: 'Export failed',
        IMPORT: 'Import failed',
    },
    WARNING: {
        UNSAVED_CHANGES: 'You have unsaved changes',
        DELETE_CONFIRM: 'This action cannot be undone',
        NETWORK_SLOW: 'Your connection seems slow',
    },
    INFO: {
        LOADING: 'Loading...',
        PROCESSING: 'Processing your request...',
        SAVED_DRAFT: 'Draft saved automatically',
    },
} as const;
