import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import {
  processWhatsAppPayload,
  verifyMetaSignature,
  verifyWebhookToken,
  type WhatsAppEventStore,
} from "../src/lib/whatsapp-webhook";

class MemoryEventStore implements WhatsAppEventStore {
  readonly events = new Map<string, Record<string, unknown>>();

  async createIfAbsent(eventId: string, event: Record<string, unknown>) {
    if (this.events.has(eventId)) {
      return false;
    }

    this.events.set(eventId, event);
    return true;
  }
}

const payload = {
  object: "whatsapp_business_account",
  entry: [
    {
      id: "business-account-1",
      changes: [
        {
          field: "messages",
          value: {
            messaging_product: "whatsapp",
            metadata: {
              display_phone_number: "+2347000000000",
              phone_number_id: "phone-number-1",
            },
            contacts: [{ profile: { name: "Ada" }, wa_id: "2347000000000" }],
            messages: [
              {
                from: "2347000000000",
                id: "wamid.message-1",
                timestamp: "1760000000",
                text: { body: "I want to discuss a project" },
                type: "text",
              },
            ],
            statuses: [
              {
                id: "wamid.outbound-1",
                recipient_id: "2347000000000",
                status: "delivered",
                timestamp: "1760000001",
              },
            ],
          },
        },
      ],
    },
  ],
};

test("accepts Meta webhook verification only with the configured token", () => {
  assert.equal(verifyWebhookToken("secret", "secret"), true);
  assert.equal(verifyWebhookToken("wrong", "secret"), false);
  assert.equal(verifyWebhookToken("secret", undefined), false);
});

test("verifies the raw body with X-Hub-Signature-256", () => {
  const rawBody = JSON.stringify(payload);
  const digest = createHmac("sha256", "app-secret")
    .update(rawBody)
    .digest("hex");

  assert.equal(verifyMetaSignature(rawBody, `sha256=${digest}`, "app-secret"), true);
  assert.equal(verifyMetaSignature(rawBody, `sha256=${digest}0`, "app-secret"), false);
  assert.equal(verifyMetaSignature(rawBody, `sha1=${digest}`, "app-secret"), false);
});

test("stores valid messages and statuses and deduplicates delivery retries", async () => {
  const store = new MemoryEventStore();
  const first = await processWhatsAppPayload(payload, store);
  const second = await processWhatsAppPayload(payload, store);

  assert.deepEqual(first, {
    receivedEvents: 2,
    storedEvents: 2,
    duplicateEvents: 0,
  });
  assert.deepEqual(second, {
    receivedEvents: 2,
    storedEvents: 0,
    duplicateEvents: 2,
  });
  assert.equal(store.events.get("message:wamid.message-1")?.text, "I want to discuss a project");
  assert.equal(store.events.get("status:wamid.outbound-1:delivered")?.status, "delivered");
});

test("ignores unknown event shapes without sending a reply", async () => {
  const store = new MemoryEventStore();
  const result = await processWhatsAppPayload(
    { object: "whatsapp_business_account", entry: [{ changes: [{ field: "unknown", value: {} }] }] },
    store,
  );

  assert.deepEqual(result, {
    receivedEvents: 0,
    storedEvents: 0,
    duplicateEvents: 0,
  });
});
