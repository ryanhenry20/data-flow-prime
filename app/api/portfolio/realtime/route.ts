import { NextResponse } from 'next/server';
import { fetchPortfolioRealtimeMetrics } from '@/lib/portfolio-backend';

export async function GET() {
    try {
        const data = await fetchPortfolioRealtimeMetrics();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json('Failed to load realtime metrics', { status: 500 });
    }
}
