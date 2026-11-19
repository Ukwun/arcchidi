import { FieldValue } from "firebase-admin/firestore";
import { getFirebaseFirestore } from "@/lib/firebase-admin";
import {
  processWhatsAppPayload,
  verifyMetaSignature,
  verifyWebhookToken,
} from "@/lib/whatsapp-webhook";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const verifyToken = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (
    mode !== "subscribe" ||
    !challenge ||
    !verifyWebhookToken(verifyToken, process.env.WHATSAPP_VERIFY_TOKEN)
  ) {
    return new Response("Forbidden", { status: 403 });
  }

  return new Response(challenge, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function POST(request: Request) {
  const appSecret = process.env.META_APP_SECRET;

  if (!appSecret) {
    console.error("WhatsApp webhook is missing META_APP_SECRET");
    return Response.json({ error: "Webhook unavailable" }, { status: 503 });
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch (error) {
    console.error("WhatsApp webhook body read failed", error);
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (
    !verifyMetaSignature(
      rawBody,
      request.headers.get("x-hub-signature-256"),
      appSecret,
    )
  ) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const firestore = getFirebaseFirestore();
    const result = await processWhatsAppPayload(payload, {
      async createIfAbsent(eventId, event) {
        const document = firestore.collection("whatsappWebhookEvents").doc(eventId);

        return firestore.runTransaction(async (transaction) => {
          const existing = await transaction.get(document);

          if (existing.exists) {
            return false;
          }

          transaction.create(document, {
            ...event,
            receivedAt: FieldValue.serverTimestamp(),
          });

          return true;
        });
      },
    });

    return Response.json({ received: true, ...result }, { status: 200 });
  } catch (error) {
    console.error("WhatsApp webhook processing failed", error);
    return Response.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
