import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
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
