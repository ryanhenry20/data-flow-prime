import { NextRequest, NextResponse } from 'next/server';
import { fetchPortfolioAnalyticsEvents } from '@/lib/portfolio-backend';

export async function GET(request: NextRequest) {
    try {
        const limitParam = request.nextUrl.searchParams.get('limit');
        const limit = Number(limitParam || '100');
        const data = await fetchPortfolioAnalyticsEvents(Number.isNaN(limit) ? 100 : limit);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json('Failed to load analytics events', { status: 500 });
    }
}
