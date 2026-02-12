import { NextRequest, NextResponse } from 'next/server';
import { fetchPortfolioSearchResults } from '@/lib/portfolio-backend';

export async function GET(request: NextRequest) {
    try {
        const query = request.nextUrl.searchParams.get('q') || '';
        const data = await fetchPortfolioSearchResults(query);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json('Failed to run search', { status: 500 });
    }
}
