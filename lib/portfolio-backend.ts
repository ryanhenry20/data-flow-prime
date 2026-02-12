import 'server-only';

import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import type {
    AggregatedUserMetric,
    AIInsight,
    AnalyticsEvent,
    AnalyticsMetric,
    CalendarEntry,
    EnrichedAnalyticsEvent,
    PredictionModel,
    SearchResultItem,
    SmartAlert,
    UserProfile,
} from '@/lib/portfolio-types';

const API_DELAY_MS = 80;
const MS_IN_MINUTE = 60 * 1000;
const MS_IN_HOUR = 60 * 60 * 1000;
const MS_IN_DAY = 24 * MS_IN_HOUR;

const seedUsers: Array<{
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    createdAt: Date;
}> = [
    {
        id: 'user_001',
        email: 'amelia.chang@northstar.com',
        fullName: 'Amelia Chang',
        createdAt: new Date('2024-11-04T09:10:00.000Z'),
    },
    {
        id: 'user_002',
        email: 'daniel.reyes@northstar.com',
        fullName: 'Daniel Reyes',
        createdAt: new Date('2024-11-19T13:25:00.000Z'),
    },
    {
        id: 'user_003',
        email: 'maya.patel@northstar.com',
        fullName: 'Maya Patel',
        createdAt: new Date('2024-12-02T07:42:00.000Z'),
    },
    {
        id: 'user_004',
        email: 'noah.smith@northstar.com',
        fullName: 'Noah Smith',
        createdAt: new Date('2024-12-15T15:01:00.000Z'),
    },
    {
        id: 'user_005',
        email: 'sophia.lee@northstar.com',
        fullName: 'Sophia Lee',
        createdAt: new Date('2025-01-10T08:55:00.000Z'),
    },
    {
        id: 'user_006',
        email: 'liam.walker@northstar.com',
        fullName: 'Liam Walker',
        createdAt: new Date('2025-01-28T11:36:00.000Z'),
    },
    {
        id: 'user_007',
        email: 'isabella.khan@northstar.com',
        fullName: 'Isabella Khan',
        createdAt: new Date('2025-02-11T18:20:00.000Z'),
    },
    {
        id: 'user_008',
        email: 'oliver.nguyen@northstar.com',
        fullName: 'Oliver Nguyen',
        createdAt: new Date('2025-03-05T10:14:00.000Z'),
    },
];

const aiInsightsSeed: AIInsight[] = [
    {
        id: 'insight_01',
        type: 'opportunity',
        title: 'Pricing Page Lift Opportunity',
        description:
            'Visitors from LinkedIn show 18% higher intent. Consider testing a focused CTA variant on the pricing page for this segment.',
        confidence: 88,
        impact_level: 'High',
        created_at: new Date(Date.now() - 3 * MS_IN_HOUR).toISOString(),
    },
    {
        id: 'insight_02',
        type: 'recommendation',
        title: 'Improve Checkout Completion',
        description:
            'Session recordings suggest friction on the final payment step. Simplifying the billing form could recover 6-9% of drop-offs.',
        confidence: 82,
        impact_level: 'High',
        created_at: new Date(Date.now() - 9 * MS_IN_HOUR).toISOString(),
    },
    {
        id: 'insight_03',
        type: 'insight',
        title: 'Top Performing Acquisition Channel',
        description:
            'Organic search drove the most sustained traffic this week, with stronger average session duration than paid traffic.',
        confidence: 76,
        impact_level: 'Medium',
        created_at: new Date(Date.now() - 16 * MS_IN_HOUR).toISOString(),
    },
    {
        id: 'insight_04',
        type: 'alert',
        title: 'Spike in Validation Errors',
        description:
            'A temporary increase in form validation failures was detected during peak traffic. Error volume normalized after 35 minutes.',
        confidence: 71,
        impact_level: 'Low',
        created_at: new Date(Date.now() - 25 * MS_IN_HOUR).toISOString(),
    },
];

function createPredictionSeed(): PredictionModel[] {
    const periods = ['Q1', 'Q2', 'Q3', 'Q4'];

    return [
        {
            id: 'pred_traffic',
            metric: 'Monthly Active Users',
            current_value: 12454,
            projected_value: 14680,
            projected_change: 17.9,
            confidence: 84,
            horizon: 'Next 90 days',
            recommendation:
                'Increase paid-retargeting budget for high-intent segments to accelerate projected growth.',
            points: periods.map((period, idx) => ({
                period,
                actual: [11200, 11820, 12140, 12454][idx],
                forecast: [11880, 12840, 13790, 14680][idx],
            })),
        },
        {
            id: 'pred_conversion',
            metric: 'Conversion Rate',
            current_value: 3.84,
            projected_value: 4.62,
            projected_change: 20.3,
            confidence: 78,
            horizon: 'Next 60 days',
            recommendation:
                'Prioritize checkout simplification and form UX fixes to capture the expected conversion uplift.',
            points: periods.map((period, idx) => ({
                period,
                actual: [3.12, 3.41, 3.67, 3.84][idx],
                forecast: [3.44, 3.88, 4.24, 4.62][idx],
            })),
        },
        {
            id: 'pred_revenue',
            metric: 'Monthly Recurring Revenue',
            current_value: 104600,
            projected_value: 126900,
            projected_change: 21.3,
            confidence: 81,
            horizon: 'Next 120 days',
            recommendation:
                'Bundle premium onboarding with growth plans to improve average order value and retention.',
            points: periods.map((period, idx) => ({
                period,
                actual: [93250, 98850, 101200, 104600][idx],
                forecast: [101900, 110300, 118100, 126900][idx],
            })),
        },
    ];
}

function createAlertSeed(): Array<{
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    status: 'open' | 'acknowledged' | 'resolved';
    source: string;
    createdAt: Date;
    recommendation: string;
    affectedMetric?: string;
}> {
    const now = Date.now();
    return [
        {
            id: 'alert_001',
            title: 'Checkout Drop-off Elevated',
            description:
                'Drop-off on payment confirmation exceeded the baseline by 14% in the last 2 hours.',
            severity: 'high',
            status: 'open',
            source: 'Conversion Monitor',
            createdAt: new Date(now - 2 * MS_IN_HOUR),
            recommendation:
                'Review payment-provider response times and test fallback for card validation.',
            affectedMetric: 'conversion_rate',
        },
        {
            id: 'alert_002',
            title: 'Unusual Error Burst',
            description:
                'Validation errors spiked on the contact form following latest content release.',
            severity: 'medium',
            status: 'acknowledged',
            source: 'Error Monitor',
            createdAt: new Date(now - 6 * MS_IN_HOUR),
            recommendation:
                'Validate required fields in CMS template and re-run smoke tests.',
            affectedMetric: 'form_submit',
        },
        {
            id: 'alert_003',
            title: 'Traffic Spike from Organic',
            description:
                'Organic traffic increased by 23% with above-average engagement.',
            severity: 'low',
            status: 'open',
            source: 'Traffic Intelligence',
            createdAt: new Date(now - 10 * MS_IN_HOUR),
            recommendation:
                'Promote the top-performing landing page and capture leads with a contextual CTA.',
            affectedMetric: 'active_users',
        },
        {
            id: 'alert_004',
            title: 'Scheduled Data Sync Delayed',
            description:
                'Nightly metrics sync completed 11 minutes later than expected.',
            severity: 'low',
            status: 'resolved',
            source: 'Pipeline Monitor',
            createdAt: new Date(now - 20 * MS_IN_HOUR),
            recommendation:
                'No action required. Continue monitoring pipeline latency trends.',
            affectedMetric: 'total_revenue',
        },
    ];
}

function createCalendarSeed(): Array<{
    id: string;
    title: string;
    type: 'report' | 'meeting' | 'experiment' | 'release';
    owner: string;
    date: Date;
    startTime: string;
    endTime: string;
    attendees: number;
    status: 'scheduled' | 'in_progress' | 'completed';
}> {
    const now = new Date();
    const day = (offset: number) =>
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);

    return [
        {
            id: 'cal_001',
            title: 'Weekly Analytics Review',
            type: 'meeting',
            owner: 'Amelia Chang',
            date: day(1),
            startTime: '09:30',
            endTime: '10:15',
            attendees: 6,
            status: 'scheduled',
        },
        {
            id: 'cal_002',
            title: 'Conversion Experiment Launch',
            type: 'experiment',
            owner: 'Maya Patel',
            date: day(2),
            startTime: '13:00',
            endTime: '14:00',
            attendees: 4,
            status: 'scheduled',
        },
        {
            id: 'cal_003',
            title: 'Monthly Performance Report',
            type: 'report',
            owner: 'Daniel Reyes',
            date: day(4),
            startTime: '11:00',
            endTime: '11:45',
            attendees: 8,
            status: 'scheduled',
        },
        {
            id: 'cal_004',
            title: 'Dashboard UI Release Window',
            type: 'release',
            owner: 'Noah Smith',
            date: day(6),
            startTime: '15:00',
            endTime: '16:30',
            attendees: 5,
            status: 'scheduled',
        },
    ];
}

const eventPattern = [
    'page_view',
    'click',
    'page_view',
    'page_view',
    'form_submit',
    'click',
    'purchase',
    'login',
    'page_view',
    'logout',
    'page_view',
    'error',
] as const;

const knownPages = [
    '/',
    '/pricing',
    '/features',
    '/analytics',
    '/reports',
    '/contact',
    '/checkout',
    '/docs',
];

function createEventProperties(
    eventType: string,
    index: number,
    pageUrl: string
): Record<string, any> {
    const device = ['desktop', 'mobile', 'tablet'][index % 3];
    const browser = ['Chrome', 'Safari', 'Firefox'][index % 3];

    switch (eventType) {
        case 'page_view':
            return {
                path: pageUrl,
                device,
                browser,
                time_on_page: 25 + (index % 210),
            };
        case 'click':
            return {
                element: ['primary_cta', 'nav_link', 'pricing_card'][index % 3],
                page: pageUrl,
                device,
            };
        case 'form_submit':
            return {
                form_id: ['newsletter', 'contact', 'demo_request'][index % 3],
                success: true,
                source: ['landing_page', 'blog', 'pricing'][index % 3],
            };
        case 'purchase':
            return {
                plan: ['Starter', 'Growth', 'Scale'][index % 3],
                order_value: 79 + (index % 5) * 30,
                currency: 'USD',
            };
        case 'error':
            return {
                code: ['API_TIMEOUT', 'VALIDATION_ERROR', 'AUTH_FAILURE'][
                    index % 3
                ],
                severity: ['low', 'medium', 'high'][index % 3],
                page: pageUrl,
            };
        default:
            return { page: pageUrl, device };
    }
}

function createAnalyticsEventsSeed() {
    const now = Date.now();
    const events: Array<{
        id: string;
        userId: string;
        eventType: string;
        properties: Record<string, any>;
        timestamp: Date;
        sessionId?: string;
        userAgent?: string;
        ipAddress?: string;
        pageUrl?: string;
        referrer?: string;
    }> = [];

    for (let i = 0; i < 360; i++) {
        const profile = seedUsers[i % seedUsers.length];
        const eventType = eventPattern[i % eventPattern.length];
        const pageUrl = `https://demo.northstar-analytics.com${
            knownPages[(i * 7) % knownPages.length]
        }`;
        const timestamp = new Date(now - i * 6 * MS_IN_MINUTE);
        const sessionId = `sess_${profile.id.slice(-3)}_${Math.floor(i / 3).toString(
            36
        )}`;

        events.push({
            id: `evt_${String(i + 1).padStart(4, '0')}`,
            userId: profile.id,
            eventType,
            properties: createEventProperties(eventType, i, pageUrl),
            timestamp,
            sessionId,
            userAgent:
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            ipAddress: `192.168.1.${(i % 200) + 1}`,
            pageUrl,
            referrer:
                i % 4 === 0
                    ? 'https://www.google.com/'
                    : 'https://www.linkedin.com/',
        });
    }

    return events;
}

const wait = (ms: number = API_DELAY_MS) =>
    new Promise((resolve) => setTimeout(resolve, ms));

function toUserProfile(profile: {
    id: string;
    email: string;
    fullName: string;
    avatarUrl: string | null;
    createdAt: Date;
}): UserProfile {
    return {
        id: profile.id,
        email: profile.email,
        full_name: profile.fullName,
        avatar_url: profile.avatarUrl || undefined,
        created_at: profile.createdAt.toISOString(),
    };
}

function toAnalyticsEvent(event: {
    id: string;
    userId: string;
    eventType: string;
    properties: any;
    timestamp: Date;
    sessionId: string | null;
    userAgent: string | null;
    ipAddress: string | null;
    pageUrl: string | null;
    referrer: string | null;
    user?: {
        id: string;
        email: string;
        fullName: string;
        avatarUrl: string | null;
        createdAt: Date;
    };
}): EnrichedAnalyticsEvent {
    return {
        id: event.id,
        user_id: event.userId,
        event_type: event.eventType,
        properties: event.properties as Record<string, any>,
        timestamp: event.timestamp.toISOString(),
        session_id: event.sessionId || undefined,
        user_agent: event.userAgent || undefined,
        ip_address: event.ipAddress || undefined,
        page_url: event.pageUrl || undefined,
        referrer: event.referrer || undefined,
        user: event.user ? toUserProfile(event.user) : undefined,
    };
}

function formatPeriod(date: Date): string {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
        date
    );
    return `${month} ${date.getFullYear()}`;
}

function buildMonthlyPeriods(length: number): string[] {
    const periods: string[] = [];
    const now = new Date();
    for (let i = length - 1; i >= 0; i--) {
        periods.push(
            formatPeriod(new Date(now.getFullYear(), now.getMonth() - i, 1))
        );
    }
    return periods;
}

async function computeLiveSignals() {
    const now = Date.now();

    const eventsLastHour = await prisma.analyticsEvent.count({
        where: {
            timestamp: {
                gte: new Date(now - MS_IN_HOUR),
            },
        },
    });

    const pageViewsLastHour = await prisma.analyticsEvent.count({
        where: {
            timestamp: {
                gte: new Date(now - MS_IN_HOUR),
            },
            eventType: 'page_view',
        },
    });

    const distinctUsers = await prisma.analyticsEvent.findMany({
        where: {
            timestamp: {
                gte: new Date(now - 3 * MS_IN_HOUR),
            },
        },
        distinct: ['userId'],
        select: {
            userId: true,
        },
    });

    const liveUsers =
        180 + distinctUsers.length * 9 + eventsLastHour * 2 + Math.round(Math.sin(now / MS_IN_HOUR) * 10);

    const livePageViews =
        520 + pageViewsLastHour * 14 + Math.round(Math.cos(now / MS_IN_HOUR) * 12);

    return {
        liveUsers,
        livePageViews,
    };
}

function buildKpiMetrics(
    now: Date,
    liveUsers: number,
    livePageViews: number
): AnalyticsMetric[] {
    const minuteSignal = Math.sin(now.getTime() / MS_IN_HOUR);
    const activeUsers = 12450 + Math.round(minuteSignal * 120);

    return [
        {
            id: 'metric_active_users',
            metric_name: 'active_users',
            value: activeUsers,
            dimensions: { window: '30d' },
            timestamp: now.toISOString(),
        },
        {
            id: 'metric_conversion_rate',
            metric_name: 'conversion_rate',
            value: 3.84,
            dimensions: { window: '30d' },
            timestamp: now.toISOString(),
        },
        {
            id: 'metric_avg_session_duration',
            metric_name: 'avg_session_duration',
            value: 312,
            dimensions: { window: '30d', unit: 'seconds' },
            timestamp: now.toISOString(),
        },
        {
            id: 'metric_live_users',
            metric_name: 'live_users',
            value: liveUsers,
            dimensions: { window: '5m' },
            timestamp: now.toISOString(),
        },
        {
            id: 'metric_live_page_views',
            metric_name: 'live_page_views',
            value: livePageViews,
            dimensions: { window: '5m' },
            timestamp: now.toISOString(),
        },
    ];
}

function buildRevenueMetrics(now: Date): AnalyticsMetric[] {
    const periods = buildMonthlyPeriods(6);
    const values = [76400, 81200, 87900, 93250, 98850, 104600];

    return periods.map((period, index) => ({
        id: `metric_total_revenue_${index + 1}`,
        metric_name: 'total_revenue',
        value: values[index],
        dimensions: { period, currency: 'USD' },
        timestamp: new Date(
            now.getFullYear(),
            now.getMonth() - (periods.length - 1 - index),
            1
        ).toISOString(),
    }));
}

let seedPromise: Promise<void> | null = null;
let schemaPromise: Promise<void> | null = null;

async function ensureSchema(): Promise<void> {
    if (schemaPromise) return schemaPromise;

    schemaPromise = (async () => {
        await prisma.$executeRawUnsafe('PRAGMA foreign_keys = ON;');

        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "user_profiles" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "email" TEXT NOT NULL,
                "fullName" TEXT NOT NULL,
                "avatarUrl" TEXT,
                "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);
        await prisma.$executeRawUnsafe(`
            CREATE UNIQUE INDEX IF NOT EXISTS "user_profiles_email_key"
            ON "user_profiles"("email");
        `);

        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "analytics_events" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "userId" TEXT NOT NULL,
                "eventType" TEXT NOT NULL,
                "properties" JSON NOT NULL,
                "timestamp" DATETIME NOT NULL,
                "sessionId" TEXT,
                "userAgent" TEXT,
                "ipAddress" TEXT,
                "pageUrl" TEXT,
                "referrer" TEXT,
                FOREIGN KEY("userId") REFERENCES "user_profiles"("id")
                    ON DELETE CASCADE ON UPDATE CASCADE
            );
        `);
        await prisma.$executeRawUnsafe(`
            CREATE INDEX IF NOT EXISTS "analytics_events_timestamp_idx"
            ON "analytics_events"("timestamp");
        `);
        await prisma.$executeRawUnsafe(`
            CREATE INDEX IF NOT EXISTS "analytics_events_userId_idx"
            ON "analytics_events"("userId");
        `);

        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "smart_alerts" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "title" TEXT NOT NULL,
                "description" TEXT NOT NULL,
                "severity" TEXT NOT NULL,
                "status" TEXT NOT NULL,
                "source" TEXT NOT NULL,
                "createdAt" DATETIME NOT NULL,
                "recommendation" TEXT NOT NULL,
                "affectedMetric" TEXT
            );
        `);
        await prisma.$executeRawUnsafe(`
            CREATE INDEX IF NOT EXISTS "smart_alerts_status_createdAt_idx"
            ON "smart_alerts"("status", "createdAt");
        `);

        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "calendar_entries" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "title" TEXT NOT NULL,
                "type" TEXT NOT NULL,
                "owner" TEXT NOT NULL,
                "date" DATETIME NOT NULL,
                "startTime" TEXT NOT NULL,
                "endTime" TEXT NOT NULL,
                "attendees" INTEGER NOT NULL,
                "status" TEXT NOT NULL
            );
        `);
        await prisma.$executeRawUnsafe(`
            CREATE INDEX IF NOT EXISTS "calendar_entries_date_idx"
            ON "calendar_entries"("date");
        `);
    })().catch((error) => {
        schemaPromise = null;
        throw error;
    });

    return schemaPromise;
}

async function ensureSeedData(): Promise<void> {
    if (seedPromise) return seedPromise;

    seedPromise = (async () => {
        await ensureSchema();
        const existingUsers = await prisma.userProfile.count();
        if (existingUsers > 0) return;

        const alerts = createAlertSeed();
        const calendar = createCalendarSeed();
        const events = createAnalyticsEventsSeed();

        try {
            await prisma.$transaction(async (tx) => {
                await tx.userProfile.createMany({
                    data: seedUsers,
                });

                for (const event of events) {
                    await tx.analyticsEvent.create({
                        data: event,
                    });
                }

                await tx.smartAlert.createMany({
                    data: alerts,
                });

                await tx.calendarEntry.createMany({
                    data: calendar,
                });
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                return;
            }
            throw error;
        }
    })().catch((error) => {
        seedPromise = null;
        throw error;
    });

    return seedPromise;
}

export async function fetchPortfolioKPIMetrics(): Promise<AnalyticsMetric[]> {
    await ensureSeedData();
    await wait();
    const now = new Date();
    const signals = await computeLiveSignals();
    return buildKpiMetrics(now, signals.liveUsers, signals.livePageViews);
}

export async function fetchPortfolioRevenueMetrics(): Promise<AnalyticsMetric[]> {
    await ensureSeedData();
    await wait();
    return buildRevenueMetrics(new Date());
}

export async function fetchPortfolioAIInsights(): Promise<AIInsight[]> {
    await ensureSeedData();
    await wait();
    return [...aiInsightsSeed].sort(
        (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
    );
}

export async function fetchPortfolioRealtimeMetrics(): Promise<AnalyticsMetric[]> {
    await ensureSeedData();
    await wait(60);
    const now = new Date();
    const signals = await computeLiveSignals();
    return buildKpiMetrics(now, signals.liveUsers, signals.livePageViews).filter(
        (metric) => ['live_users', 'live_page_views'].includes(metric.metric_name)
    );
}

export async function fetchPortfolioChartMetrics(
    metricName: string
): Promise<AnalyticsMetric[]> {
    await ensureSeedData();
    await wait();

    if (metricName === 'total_revenue') {
        return buildRevenueMetrics(new Date());
    }

    const now = new Date();
    const signals = await computeLiveSignals();
    return buildKpiMetrics(now, signals.liveUsers, signals.livePageViews).filter(
        (metric) => metric.metric_name === metricName
    );
}

export async function fetchPortfolioAnalyticsEvents(
    limit: number = 100
): Promise<EnrichedAnalyticsEvent[]> {
    await ensureSeedData();
    await wait();

    const events = await prisma.analyticsEvent.findMany({
        take: limit,
        orderBy: {
            timestamp: 'desc',
        },
        include: {
            user: true,
        },
    });

    return events.map((event) => toAnalyticsEvent(event));
}

export async function deletePortfolioAnalyticsEvent(
    eventId: string
): Promise<void> {
    await ensureSeedData();
    await wait(60);

    await prisma.analyticsEvent.delete({
        where: {
            id: eventId,
        },
    });
}

export async function updatePortfolioAnalyticsEvent(
    eventId: string,
    updates: Partial<
        Pick<AnalyticsEvent, 'event_type' | 'page_url' | 'session_id'> & {
            properties: Record<string, any>;
        }
    >
): Promise<AnalyticsEvent | null> {
    await ensureSeedData();
    await wait(60);

    try {
        const updated = await prisma.analyticsEvent.update({
            where: {
                id: eventId,
            },
            data: {
                eventType: updates.event_type,
                pageUrl: updates.page_url,
                sessionId: updates.session_id,
                properties: updates.properties,
            },
        });

        return {
            id: updated.id,
            user_id: updated.userId,
            event_type: updated.eventType,
            properties: updated.properties as Record<string, any>,
            timestamp: updated.timestamp.toISOString(),
            session_id: updated.sessionId || undefined,
            user_agent: updated.userAgent || undefined,
            ip_address: updated.ipAddress || undefined,
            page_url: updated.pageUrl || undefined,
            referrer: updated.referrer || undefined,
        };
    } catch {
        return null;
    }
}

export async function fetchPortfolioUserMetrics(
    limit: number = 100
): Promise<AggregatedUserMetric[]> {
    await ensureSeedData();
    await wait();

    const users = await prisma.userProfile.findMany({
        orderBy: {
            createdAt: 'asc',
        },
    });

    const events = await prisma.analyticsEvent.findMany({
        orderBy: {
            timestamp: 'desc',
        },
    });

    const mapByUser = new Map<string, typeof events>();

    for (const event of events) {
        const list = mapByUser.get(event.userId) || [];
        list.push(event);
        mapByUser.set(event.userId, list);
    }

    return users
        .map((user) => {
            const userEvents = mapByUser.get(user.id) || [];
            const sessions = new Set(
                userEvents.map((event) => event.sessionId).filter(Boolean)
            ).size;
            const pageViews = userEvents.filter(
                (event) => event.eventType === 'page_view'
            ).length;
            const formSubmits = userEvents.filter(
                (event) => event.eventType === 'form_submit'
            ).length;

            const totalSessions = Math.max(6, sessions || Math.ceil(userEvents.length / 2));
            const conversionRate = Number(
                ((formSubmits / totalSessions) * 100 + 1.25).toFixed(2)
            );
            const avgSessionDuration =
                130 + ((user.id.charCodeAt(5) * 17) % 280);
            const engagementScore = Math.min(
                96,
                Math.max(
                    24,
                    Math.round(
                        totalSessions * 0.58 +
                            pageViews * 1.15 +
                            conversionRate * 4.2
                    )
                )
            );

            const userSegment: AggregatedUserMetric['user_segment'] =
                engagementScore >= 78
                    ? 'high'
                    : engagementScore >= 52
                    ? 'medium'
                    : 'low';

            return {
                user_id: user.id,
                user_profiles: toUserProfile(user),
                total_sessions: totalSessions,
                avg_session_duration: avgSessionDuration,
                page_views: Math.max(pageViews * 3, 20),
                conversion_rate: conversionRate,
                last_active:
                    userEvents[0]?.timestamp.toISOString() ||
                    new Date(Date.now() - 8 * MS_IN_DAY).toISOString(),
                engagement_score: engagementScore,
                user_segment: userSegment,
            };
        })
        .sort((a, b) => b.engagement_score - a.engagement_score)
        .slice(0, limit);
}

export async function fetchPortfolioPredictions(): Promise<PredictionModel[]> {
    await ensureSeedData();
    await wait();
    return createPredictionSeed();
}

export async function fetchPortfolioAlerts(): Promise<SmartAlert[]> {
    await ensureSeedData();
    await wait();

    const alerts = await prisma.smartAlert.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return alerts.map((alert) => ({
        id: alert.id,
        title: alert.title,
        description: alert.description,
        severity: alert.severity as SmartAlert['severity'],
        status: alert.status as SmartAlert['status'],
        source: alert.source,
        created_at: alert.createdAt.toISOString(),
        recommendation: alert.recommendation,
        affected_metric: alert.affectedMetric || undefined,
    }));
}

export async function updatePortfolioAlertStatus(
    alertId: string,
    status: SmartAlert['status']
): Promise<SmartAlert | null> {
    await ensureSeedData();
    await wait(60);

    try {
        const alert = await prisma.smartAlert.update({
            where: {
                id: alertId,
            },
            data: {
                status,
            },
        });

        return {
            id: alert.id,
            title: alert.title,
            description: alert.description,
            severity: alert.severity as SmartAlert['severity'],
            status: alert.status as SmartAlert['status'],
            source: alert.source,
            created_at: alert.createdAt.toISOString(),
            recommendation: alert.recommendation,
            affected_metric: alert.affectedMetric || undefined,
        };
    } catch {
        return null;
    }
}

export async function fetchPortfolioCalendarEntries(): Promise<CalendarEntry[]> {
    await ensureSeedData();
    await wait();

    const entries = await prisma.calendarEntry.findMany({
        orderBy: {
            date: 'asc',
        },
    });

    return entries.map((entry) => ({
        id: entry.id,
        title: entry.title,
        type: entry.type as CalendarEntry['type'],
        owner: entry.owner,
        date: entry.date.toISOString().slice(0, 10),
        start_time: entry.startTime,
        end_time: entry.endTime,
        attendees: entry.attendees,
        status: entry.status as CalendarEntry['status'],
    }));
}

export async function createPortfolioCalendarEntry(
    entry: Omit<CalendarEntry, 'id' | 'status'>
): Promise<CalendarEntry> {
    await ensureSeedData();
    await wait(80);

    const created = await prisma.calendarEntry.create({
        data: {
            id: `cal_${Date.now().toString(36)}`,
            title: entry.title,
            type: entry.type,
            owner: entry.owner,
            date: new Date(entry.date),
            startTime: entry.start_time,
            endTime: entry.end_time,
            attendees: entry.attendees,
            status: 'scheduled',
        },
    });

    return {
        id: created.id,
        title: created.title,
        type: created.type as CalendarEntry['type'],
        owner: created.owner,
        date: created.date.toISOString().slice(0, 10),
        start_time: created.startTime,
        end_time: created.endTime,
        attendees: created.attendees,
        status: created.status as CalendarEntry['status'],
    };
}

export async function fetchPortfolioSearchResults(
    query: string
): Promise<SearchResultItem[]> {
    await ensureSeedData();
    await wait(80);

    const q = query.trim().toLowerCase();
    if (!q) return [];

    const [users, events, alerts] = await Promise.all([
        prisma.userProfile.findMany(),
        prisma.analyticsEvent.findMany({
            take: 220,
            orderBy: {
                timestamp: 'desc',
            },
        }),
        prisma.smartAlert.findMany({
            take: 100,
            orderBy: {
                createdAt: 'desc',
            },
        }),
    ]);

    const userResults: SearchResultItem[] = users
        .filter(
            (profile) =>
                profile.fullName.toLowerCase().includes(q) ||
                profile.email.toLowerCase().includes(q)
        )
        .map((profile) => ({
            id: profile.id,
            type: 'user',
            title: profile.fullName,
            subtitle: profile.email,
            route: '/users',
            metadata: 'User profile',
        }));

    const insightResults: SearchResultItem[] = aiInsightsSeed
        .filter(
            (insight) =>
                insight.title.toLowerCase().includes(q) ||
                insight.description.toLowerCase().includes(q)
        )
        .map((insight) => ({
            id: insight.id,
            type: 'insight',
            title: insight.title,
            subtitle: insight.description,
            route: '/ai-insights',
            metadata: `Impact: ${insight.impact_level}`,
        }));

    const alertResults: SearchResultItem[] = alerts
        .filter(
            (alert) =>
                alert.title.toLowerCase().includes(q) ||
                alert.description.toLowerCase().includes(q)
        )
        .map((alert) => ({
            id: alert.id,
            type: 'alert',
            title: alert.title,
            subtitle: alert.description,
            route: '/alerts',
            metadata: `Severity: ${alert.severity}`,
        }));

    const predictionResults: SearchResultItem[] = createPredictionSeed()
        .filter(
            (prediction) =>
                prediction.metric.toLowerCase().includes(q) ||
                prediction.recommendation.toLowerCase().includes(q)
        )
        .map((prediction) => ({
            id: prediction.id,
            type: 'prediction',
            title: prediction.metric,
            subtitle: prediction.recommendation,
            route: '/predictions',
            metadata: prediction.horizon,
        }));

    const eventResults: SearchResultItem[] = events
        .filter(
            (event) =>
                event.eventType.toLowerCase().includes(q) ||
                event.pageUrl?.toLowerCase().includes(q) ||
                event.sessionId?.toLowerCase().includes(q)
        )
        .slice(0, 12)
        .map((event) => ({
            id: event.id,
            type: 'event',
            title: `${event.eventType.replace('_', ' ')} event`,
            subtitle: event.pageUrl || 'Unknown page',
            route: '/analytics',
            metadata: event.timestamp.toLocaleString(),
        }));

    return [
        ...userResults,
        ...insightResults,
        ...alertResults,
        ...predictionResults,
        ...eventResults,
    ].slice(0, 40);
}
