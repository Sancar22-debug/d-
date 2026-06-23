import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500,
});

export async function POST(request: NextRequest) {
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
    const { name, phone, message } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

    // TODO: Connect to CRM / database / email service
    console.log("New lead received:", { name, phone, message });

    return NextResponse.json(
      { success: true, message: "Заявка успешно отправлена" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
