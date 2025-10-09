import { NextResponse } from "next/server";

const WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ??
  "https://weliakcay.app.n8n.cloud/webhook/f7432f35-9e06-4e30-ba57-e8618cf3f9f5";

const FINAL_CTA_WEBHOOK_URL =
  process.env.N8N_FINAL_CTA_WEBHOOK_URL ??
  "https://weliakcay.app.n8n.cloud/webhook-test/f7432f35-9e06-4e30-ba57-e8618cf3f9f5";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const candidateUrls: string[] = [];
    if (payload.source === "final-cta") {
      candidateUrls.push(FINAL_CTA_WEBHOOK_URL);
      if (FINAL_CTA_WEBHOOK_URL.includes("/webhook-test/")) {
        candidateUrls.push(FINAL_CTA_WEBHOOK_URL.replace("/webhook-test/", "/webhook/"));
      }
    } else {
      candidateUrls.push(WEBHOOK_URL);
    }

    const forwardedPayload = {
      ...payload,
      receivedAt: new Date().toISOString(),
    };

    let lastError: { status: number; body: string } | null = null;
    for (const webhookUrl of candidateUrls) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain;q=0.9",
          },
          body: JSON.stringify(forwardedPayload),
        });

        const responseText = await response.text();

        if (!response.ok) {
          lastError = { status: response.status, body: responseText };
          console.error("Webhook isteği başarısız:", response.status, responseText, webhookUrl);
          continue;
        }

        return NextResponse.json(
          {
            status: "ok",
            forwarded: true,
            webhookStatus: response.status,
            webhookResponse: responseText || null,
            webhookUrl,
          },
          { status: 200 },
        );
      } catch (error) {
        console.error("Webhook isteği gönderilirken hata oluştu:", error);
        lastError = { status: 0, body: (error as Error).message };
        continue;
      }
    }

    const errorPayload =
      lastError ??
      ({
        status: 500,
        body: "Bilinmeyen hata",
      } as const);

    return NextResponse.json(
      {
        status: "error",
        message: "Webhook isteği başarısız oldu.",
        webhookStatus: errorPayload.status,
        webhookResponse: errorPayload.body,
      },
      { status: 502 },
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
