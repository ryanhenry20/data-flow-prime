import { NextRequest, NextResponse } from 'next/server';
import {
    createPortfolioCalendarEntry,
    fetchPortfolioCalendarEntries,
} from '@/lib/portfolio-backend';
import type { CalendarEntry } from '@/lib/portfolio-types';

export async function GET() {
    try {
        const data = await fetchPortfolioCalendarEntries();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json('Failed to load calendar', { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const payload = (await request.json()) as Omit<CalendarEntry, 'id' | 'status'>;
        const created = await createPortfolioCalendarEntry(payload);
        return NextResponse.json(created);
    } catch (error) {
        return NextResponse.json('Failed to create calendar entry', { status: 500 });
    }
}
