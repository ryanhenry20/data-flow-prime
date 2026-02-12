import { NextResponse } from 'next/server';
import { fetchPortfolioAlerts } from '@/lib/portfolio-backend';

export async function GET() {
    try {
        const data = await fetchPortfolioAlerts();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json('Failed to load alerts', { status: 500 });
    }
}
