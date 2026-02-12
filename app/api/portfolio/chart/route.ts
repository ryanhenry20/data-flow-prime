import { NextRequest, NextResponse } from 'next/server';
import { fetchPortfolioChartMetrics } from '@/lib/portfolio-backend';

export async function GET(request: NextRequest) {
    try {
        const metric = request.nextUrl.searchParams.get('metric');
        if (!metric) {
            return NextResponse.json('Missing metric query param', { status: 400 });
        }

        const data = await fetchPortfolioChartMetrics(metric);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json('Failed to load chart metrics', { status: 500 });
    }
}
