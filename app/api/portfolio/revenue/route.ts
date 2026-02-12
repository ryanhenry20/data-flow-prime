import { NextResponse } from 'next/server';
import { fetchPortfolioRevenueMetrics } from '@/lib/portfolio-backend';

export async function GET() {
    try {
        const data = await fetchPortfolioRevenueMetrics();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json('Failed to load revenue metrics', { status: 500 });
    }
}
