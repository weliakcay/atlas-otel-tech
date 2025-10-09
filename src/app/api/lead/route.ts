import { NextResponse } from "next/server";

const WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ??
  "https://weliakcay.app.n8n.cloud/webhook/f7432f35-9e06-4e30-ba57-e8618cf3f9f5";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const forwardedPayload = {
      ...payload,
      receivedAt: new Date().toISOString(),
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain;q=0.9",
      },
      body: JSON.stringify(forwardedPayload),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Webhook isteği başarısız:", response.status, responseText);
      return NextResponse.json(
        {
          status: "error",
          message: "Webhook isteği başarısız oldu.",
          webhookStatus: response.status,
          webhookResponse: responseText,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        status: "ok",
        forwarded: true,
        webhookStatus: response.status,
        webhookResponse: responseText || null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lead API hata:", error);
    return NextResponse.json(
      { status: "error", message: "Geçersiz istek veya beklenmeyen bir hata oluştu." },
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
