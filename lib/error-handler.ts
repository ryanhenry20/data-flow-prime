import { notifications, NOTIFICATIONS } from './notifications';

export interface AppError extends Error {
    code?: string;
    statusCode?: number;
    userMessage?: string;
    context?: Record<string, any>;
}

export class ApplicationError extends Error implements AppError {
    public code?: string;
    public statusCode?: number;
    public userMessage?: string;
    public context?: Record<string, any>;

    constructor(
        message: string,
        options?: {
            code?: string;
            statusCode?: number;
            userMessage?: string;
            context?: Record<string, any>;
        }
    ) {
        super(message);
        this.name = 'ApplicationError';
        this.code = options?.code;
        this.statusCode = options?.statusCode;
        this.userMessage = options?.userMessage;
        this.context = options?.context;

        // Maintain proper stack trace for where our error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApplicationError);
        }
    }
}

export class ValidationError extends ApplicationError {
    constructor(message: string, field?: string) {
        super(message, {
            code: 'VALIDATION_ERROR',
            statusCode: 400,
            userMessage: 'Please check your input and try again.',
            context: { field },
        });
        this.name = 'ValidationError';
    }
}

export class NetworkError extends ApplicationError {
    constructor(message: string, statusCode?: number) {
        super(message, {
            code: 'NETWORK_ERROR',
            statusCode: statusCode || 500,
            userMessage:
                'Network error. Please check your connection and try again.',
        });
        this.name = 'NetworkError';
    }
}

export class AuthenticationError extends ApplicationError {
    constructor(message: string = 'Authentication required') {
        super(message, {
            code: 'AUTH_ERROR',
            statusCode: 401,
            userMessage: 'You need to sign in to access this feature.',
        });
        this.name = 'AuthenticationError';
    }
}

export class AuthorizationError extends ApplicationError {
    constructor(message: string = 'Insufficient permissions') {
        super(message, {
            code: 'AUTHORIZATION_ERROR',
            statusCode: 403,
            userMessage: 'You are not authorized to perform this action.',
        });
        this.name = 'AuthorizationError';
    }
}

export class NotFoundError extends ApplicationError {
    constructor(resource: string = 'Resource') {
        super(`${resource} not found`, {
            code: 'NOT_FOUND',
            statusCode: 404,
            userMessage: `The requested ${resource.toLowerCase()} was not found.`,
        });
        this.name = 'NotFoundError';
    }
}

/**
 * Error handling service that integrates with notifications
 */
class ErrorHandlerService {
    /**
     * Handle an error and show appropriate notification
     */
    handle(error: unknown, context?: string): void {
        console.error(
            'Error occurred:',
            error,
            context ? `Context: ${context}` : ''
        );

        const appError = this.normalizeError(error);

        // Show user-friendly notification
        notifications.error(
            appError.userMessage || NOTIFICATIONS.ERROR.GENERIC,
            {
                title: 'Error',
                description: context ? `While ${context}` : undefined,
                duration: 6000,
            }
        );

        // Log error for debugging
        this.logError(appError, context);
    }

    /**
     * Handle errors from async operations
     */
    async handleAsync<T>(
        operation: () => Promise<T>,
        context?: string
    ): Promise<T | null> {
        try {
            return await operation();
        } catch (error) {
            this.handle(error, context);
            return null;
        }
    }

    /**
     * Handle promise and show appropriate notifications
     */
    handlePromise<T>(
        promise: Promise<T>,
        messages: {
            loading: string;
            success: string | ((data: T) => string);
            error?: string;
        }
    ): Promise<T> {
        notifications.promise(promise, {
            loading: messages.loading,
            success: messages.success,
            error: (error) => {
                const appError = this.normalizeError(error);
                return (
                    messages.error ||
                    appError.userMessage ||
                    NOTIFICATIONS.ERROR.GENERIC
                );
            },
        });
        return promise;
    }

    /**
     * Show validation errors for forms
     */
    handleValidation(errors: Record<string, string[]>): void {
        const firstError = Object.values(errors)[0]?.[0];
        if (firstError) {
            notifications.error(firstError, {
                title: 'Validation Error',
                duration: 5000,
            });
        }
    }

    /**
     * Handle network/API errors
     */
    handleApiError(error: unknown, operation?: string): void {
        const appError = this.normalizeError(error);

        let userMessage = appError.userMessage;

        // Customize message based on status code
        if (appError.statusCode) {
            switch (appError.statusCode) {
                case 400:
                    userMessage = NOTIFICATIONS.ERROR.VALIDATION;
                    break;
                case 401:
                    userMessage = 'Please sign in to continue.';
                    break;
                case 403:
                    userMessage = NOTIFICATIONS.ERROR.UNAUTHORIZED;
                    break;
                case 404:
                    userMessage = NOTIFICATIONS.ERROR.NOT_FOUND;
                    break;
                case 429:
                    userMessage =
                        'Too many requests. Please wait a moment and try again.';
                    break;
                case 500:
                case 502:
                case 503:
                case 504:
                    userMessage = 'Server error. Please try again later.';
                    break;
                default:
                    userMessage = NOTIFICATIONS.ERROR.NETWORK;
            }
        }

        notifications.error(userMessage || NOTIFICATIONS.ERROR.GENERIC, {
            title: operation ? `Failed to ${operation}` : 'Request Failed',
            duration: 6000,
        });
    }

    /**
     * Convert any error to ApplicationError
     */
    private normalizeError(error: unknown): ApplicationError {
        if (error instanceof ApplicationError) {
            return error;
        }

        if (error instanceof Error) {
            return new ApplicationError(error.message, {
                userMessage: NOTIFICATIONS.ERROR.GENERIC,
            });
        }

        if (typeof error === 'string') {
            return new ApplicationError(error, {
                userMessage: error,
            });
        }

        // Handle API response errors
        if (error && typeof error === 'object' && 'message' in error) {
            const apiError = error as any;
            return new ApplicationError(apiError.message, {
                statusCode: apiError.status || apiError.statusCode,
                userMessage:
                    apiError.userMessage || NOTIFICATIONS.ERROR.GENERIC,
            });
        }

        return new ApplicationError('Unknown error occurred', {
            userMessage: NOTIFICATIONS.ERROR.GENERIC,
        });
    }

    /**
     * Log error for debugging and monitoring
     */
    private logError(error: ApplicationError, context?: string): void {
        const errorInfo = {
            name: error.name,
            message: error.message,
            code: error.code,
            statusCode: error.statusCode,
            context: error.context,
            operationContext: context,
            stack: error.stack,
            timestamp: new Date().toISOString(),
        };

        // In production, you might want to send this to a logging service
        console.error('Application Error:', errorInfo);

        // Example: Send to monitoring service
        // this.sendToMonitoring(errorInfo);
    }
}

// Export singleton instance
export const errorHandler = new ErrorHandlerService();

// Convenience functions
export const handleError = errorHandler.handle.bind(errorHandler);
export const handleAsync = errorHandler.handleAsync.bind(errorHandler);
export const handlePromise = errorHandler.handlePromise.bind(errorHandler);
export const handleValidation =
    errorHandler.handleValidation.bind(errorHandler);
export const handleApiError = errorHandler.handleApiError.bind(errorHandler);
