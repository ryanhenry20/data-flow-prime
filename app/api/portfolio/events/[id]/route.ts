import { NextRequest, NextResponse } from 'next/server';
import {
    deletePortfolioAnalyticsEvent,
    updatePortfolioAnalyticsEvent,
} from '@/lib/portfolio-backend';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const payload = await request.json();
        const updated = await updatePortfolioAnalyticsEvent(params.id, payload || {});
        if (!updated) {
            return NextResponse.json('Event not found', { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json('Failed to update event', { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await deletePortfolioAnalyticsEvent(params.id);
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json('Failed to delete event', { status: 500 });
    }
}
