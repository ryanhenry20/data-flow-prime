import { NextResponse } from 'next/server';
import { fetchPortfolioPredictions } from '@/lib/portfolio-backend';

export async function GET() {
    try {
        const data = await fetchPortfolioPredictions();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json('Failed to load predictions', { status: 500 });
    }
}
