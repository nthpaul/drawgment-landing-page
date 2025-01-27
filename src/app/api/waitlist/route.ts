// app/api/waitlist/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email } = await request.json();

    // Trigger GitHub Actions workflow
    const response = await fetch(
        `https://api.github.com/repos/nthpaul/waitlist-data/dispatches`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                Accept: 'application/vnd.github+json',
            },
            body: JSON.stringify({
                event_type: 'add_to_waitlist',
                client_payload: {
                    email,
                    timestamp: new Date().toISOString(),
                },
            }),
        }
    );

    if (!response.ok) {
        return NextResponse.json(
            { error: 'Failed to add to waitlist' },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true });
}
