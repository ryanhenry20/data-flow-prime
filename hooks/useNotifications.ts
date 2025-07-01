'use client';

import { useCallback } from 'react';
import { notifications, notify, NOTIFICATIONS } from '@/lib/notifications';
import {
    handleError,
    handleAsync,
    handlePromise,
    handleApiError,
} from '@/lib/error-handler';

/**
 * Custom hook for notifications and error handling
 */
export function useNotifications() {
    // Basic notification functions
    const showSuccess = useCallback(
        (message: string, options?: { title?: string; duration?: number }) =>
            notify.success(message, options),
        []
    );

    const showError = useCallback(
        (message: string, options?: { title?: string; duration?: number }) =>
            notify.error(message, options),
        []
    );

    const showWarning = useCallback(
        (message: string, options?: { title?: string; duration?: number }) =>
            notify.warning(message, options),
        []
    );

    const showInfo = useCallback(
        (message: string, options?: { title?: string; duration?: number }) =>
            notify.info(message, options),
        []
    );

    const showLoading = useCallback(
        (message: string, options?: { title?: string; persistent?: boolean }) =>
            notify.loading(message, options),
        []
    );

    // Advanced notification functions
    const notifyPromise = useCallback(
        <T>(
            promise: Promise<T>,
            messages: {
                loading: string;
                success: string | ((data: T) => string);
                error?: string;
            }
        ) =>
            notify.promise(promise, {
                loading: messages.loading,
                success: messages.success,
                error: messages.error || NOTIFICATIONS.ERROR.GENERIC,
            }),
        []
    );

    const dismiss = useCallback(
        (id: string | number) => notifications.dismiss(id),
        []
    );

    const dismissAll = useCallback(() => notifications.dismissAll(), []);

    // Error handling functions
    const handleErrorWithNotification = useCallback(
        (error: unknown, context?: string) => handleError(error, context),
        []
    );

    const handleAsyncOperation = useCallback(
        async <T>(
            operation: () => Promise<T>,
            context?: string
        ): Promise<T | null> => handleAsync(operation, context),
        []
    );

    const handlePromiseWithNotification = useCallback(
        <T>(
            promise: Promise<T>,
            messages: {
                loading: string;
                success: string | ((data: T) => string);
                error?: string;
            }
        ): Promise<T> => handlePromise(promise, messages),
        []
    );

    const handleApiErrorWithNotification = useCallback(
        (error: unknown, operation?: string) =>
            handleApiError(error, operation),
        []
    );

    // Common operation wrappers
    const withSuccessNotification = useCallback(
        async <T>(
            operation: () => Promise<T>,
            successMessage: string | ((data: T) => string),
            options?: {
                loadingMessage?: string;
                errorMessage?: string;
                context?: string;
            }
        ): Promise<T | null> => {
            const loadingId = options?.loadingMessage
                ? showLoading(options.loadingMessage)
                : null;

            try {
                const result = await operation();

                if (loadingId) {
                    dismiss(loadingId);
                }

                const message =
                    typeof successMessage === 'function'
                        ? successMessage(result)
                        : successMessage;
                showSuccess(message);

                return result;
            } catch (error) {
                if (loadingId) {
                    dismiss(loadingId);
                }

                if (options?.errorMessage) {
                    showError(options.errorMessage);
                } else {
                    handleErrorWithNotification(error, options?.context);
                }

                return null;
            }
        },
        [
            showSuccess,
            showError,
            showLoading,
            dismiss,
            handleErrorWithNotification,
        ]
    );

    // Form-specific helpers
    const notifyFormSave = useCallback(
        (success: boolean, itemName: string = 'item') => {
            if (success) {
                showSuccess(`${itemName} saved successfully`);
            } else {
                showError(`Failed to save ${itemName}`);
            }
        },
        [showSuccess, showError]
    );

    const notifyFormDelete = useCallback(
        (success: boolean, itemName: string = 'item') => {
            if (success) {
                showSuccess(`${itemName} deleted successfully`);
            } else {
                showError(`Failed to delete ${itemName}`);
            }
        },
        [showSuccess, showError]
    );

    const confirmDeletion = useCallback(
        (itemName: string = 'item', onConfirm: () => void) => {
            const message = `Are you sure you want to delete this ${itemName}?`;
            notifications.custom(message, [
                {
                    label: 'Delete',
                    onClick: onConfirm,
                    style: 'destructive' as const,
                },
                {
                    label: 'Cancel',
                    onClick: () => {},
                },
            ]);
        },
        []
    );

    // Network status helpers
    const notifyNetworkError = useCallback(() => {
        showError(NOTIFICATIONS.ERROR.NETWORK, {
            title: 'Connection Error',
            duration: 8000,
        });
    }, [showError]);

    const notifyOffline = useCallback(() => {
        showWarning(
            'You are currently offline. Some features may not be available.',
            {
                title: 'Offline',
                duration: 10000,
            }
        );
    }, [showWarning]);

    const notifyBackOnline = useCallback(() => {
        showSuccess('Connection restored!', {
            duration: 3000,
        });
    }, [showSuccess]);

    return {
        // Basic notifications
        success: showSuccess,
        error: showError,
        warning: showWarning,
        info: showInfo,
        loading: showLoading,

        // Advanced notifications
        promise: notifyPromise,
        dismiss,
        dismissAll,

        // Error handling
        handleError: handleErrorWithNotification,
        handleAsync: handleAsyncOperation,
        handlePromise: handlePromiseWithNotification,
        handleApiError: handleApiErrorWithNotification,

        // Operation wrappers
        withSuccess: withSuccessNotification,

        // Form helpers
        notifyFormSave,
        notifyFormDelete,
        confirmDeletion,

        // Network helpers
        notifyNetworkError,
        notifyOffline,
        notifyBackOnline,

        // Constants for easy access
        MESSAGES: NOTIFICATIONS,
    };
}
