import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    return NextResponse.json(
      {
        status: "received",
        receivedAt: new Date().toISOString(),
        payload,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lead API hata:", error);
    return NextResponse.json(
      { status: "error", message: "Geçersiz istek gövdesi" },
      { status: 400 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { status: "method_not_allowed", message: "Yalnızca POST istekleri kabul edilir." },
    { status: 405 },
  );
}
