import { NextResponse } from 'next/server';
import { fetchPortfolioAIInsights } from '@/lib/portfolio-backend';

export async function GET() {
    try {
        const data = await fetchPortfolioAIInsights();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json('Failed to load AI insights', { status: 500 });
    }
}
