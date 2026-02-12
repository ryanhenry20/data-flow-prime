import { NextResponse } from 'next/server';
import { fetchPortfolioKPIMetrics } from '@/lib/portfolio-backend';

export async function GET() {
    try {
        const data = await fetchPortfolioKPIMetrics();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json('Failed to load KPI metrics', { status: 500 });
    }
}
