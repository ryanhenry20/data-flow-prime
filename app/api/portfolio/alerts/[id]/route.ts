import { NextRequest, NextResponse } from 'next/server';
import { updatePortfolioAlertStatus } from '@/lib/portfolio-backend';
import type { SmartAlert } from '@/lib/portfolio-types';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = (await request.json()) as { status?: SmartAlert['status'] };
        if (!body?.status) {
            return NextResponse.json('Missing status', { status: 400 });
        }

        const updated = await updatePortfolioAlertStatus(params.id, body.status);
        if (!updated) {
            return NextResponse.json('Alert not found', { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json('Failed to update alert', { status: 500 });
    }
}
