import { NextResponse } from 'next/server';

export const runtime = 'edge';
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500,
});

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    
    try {
      await limiter.check(5, ip); // 5 requests per minute
    } catch {
      return NextResponse.json(
        { success: false, error: "Слишком много запросов. Попробуйте позже." },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // The Webhook URL is loaded from an environment variable for maximum safety
    const BITRIX_WEBHOOK_URL = process.env.BITRIX_WEBHOOK_URL;

    if (!BITRIX_WEBHOOK_URL) {
      console.error("Missing BITRIX_WEBHOOK_URL environment variable.");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const response = await fetch(BITRIX_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: body.fields
      })
    });

    if (!response.ok) {
      throw new Error(`Bitrix24 API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending lead to Bitrix24:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
