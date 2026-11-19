import { createHmac, timingSafeEqual } from "node:crypto";

export interface WhatsAppEventStore {
  createIfAbsent(
    eventId: string,
    event: Record<string, unknown>,
  ): Promise<boolean>;
}

export interface WhatsAppProcessingResult {
  receivedEvents: number;
  storedEvents: number;
  duplicateEvents: number;
}

export function constantTimeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyWebhookToken(
  suppliedToken: string | null,
  expectedToken: string | undefined,
) {
  return Boolean(
    suppliedToken && expectedToken && constantTimeEqual(suppliedToken, expectedToken),
  );
}

export function verifyMetaSignature(
  rawBody: string,
  signatureHeader: string | null,
  appSecret: string | undefined,
) {
  if (!signatureHeader || !appSecret) {
    return false;
  }

  const [algorithm, suppliedSignature] = signatureHeader.split("=", 2);

  if (algorithm !== "sha256" || !suppliedSignature) {
    return false;
  }

  const expectedSignature = createHmac("sha256", appSecret)
    .update(rawBody, "utf8")
    .digest("hex");

  return constantTimeEqual(suppliedSignature, expectedSignature);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function getObject(value: unknown) {
  return isRecord(value) ? value : undefined;
}

function getTextBody(message: Record<string, unknown>) {
  const text = getObject(message.text);
  return stringValue(text?.body);
}

function eventMetadata(
  entry: Record<string, unknown>,
  change: Record<string, unknown>,
  value: Record<string, unknown>,
) {
  const metadata = getObject(value.metadata);

  return {
    accountId: stringValue(entry.id),
    changeField: stringValue(change.field),
    phoneNumberId: stringValue(metadata?.phone_number_id),
    displayPhoneNumber: stringValue(metadata?.display_phone_number),
  };
}

export async function processWhatsAppPayload(
  payload: unknown,
  store: WhatsAppEventStore,
): Promise<WhatsAppProcessingResult> {
  if (!isRecord(payload)) {
    throw new Error("WhatsApp webhook payload must be an object");
  }

  const entries = Array.isArray(payload.entry) ? payload.entry : [];
  let receivedEvents = 0;
  let storedEvents = 0;
  let duplicateEvents = 0;

  for (const entryValue of entries) {
    const entry = getObject(entryValue);
    const changes = entry && Array.isArray(entry.changes) ? entry.changes : [];

    for (const changeValue of changes) {
      const change = getObject(changeValue);
      const value = change && getObject(change.value);

      if (!change || !value) {
        continue;
      }

      const metadata = eventMetadata(entry ?? {}, change, value);
      const messages = Array.isArray(value.messages) ? value.messages : [];
      const statuses = Array.isArray(value.statuses) ? value.statuses : [];

      for (const messageValue of messages) {
        const message = getObject(messageValue);
        const messageId = message && stringValue(message.id);

        if (!messageId) {
          continue;
        }

        receivedEvents += 1;
        const contact = Array.isArray(value.contacts)
          ? getObject(value.contacts[0])
          : undefined;
        const profile = contact && getObject(contact.profile);
        const eventId = `message:${messageId}`;
        const created = await store.createIfAbsent(eventId, {
          eventId,
          eventType: "message",
          messageId,
          messageType: stringValue(message.type) ?? "unknown",
          from: stringValue(message.from),
          contactId: stringValue(contact?.wa_id),
          contactName: stringValue(profile?.name),
          text: getTextBody(message),
          timestamp: stringValue(message.timestamp),
          ...metadata,
        });

        if (created) {
          storedEvents += 1;
        } else {
          duplicateEvents += 1;
        }
      }

      for (const statusValue of statuses) {
        const status = getObject(statusValue);
        const messageId = status && stringValue(status.id);
        const deliveryStatus = status && stringValue(status.status);

        if (!messageId || !deliveryStatus) {
          continue;
        }

        receivedEvents += 1;
        const eventId = `status:${messageId}:${deliveryStatus}`;
        const created = await store.createIfAbsent(eventId, {
          eventId,
          eventType: "status",
          messageId,
          status: deliveryStatus,
          recipientId: stringValue(status.recipient_id),
          timestamp: stringValue(status.timestamp),
          conversation: getObject(status.conversation),
          pricing: getObject(status.pricing),
          ...metadata,
        });

        if (created) {
          storedEvents += 1;
        } else {
          duplicateEvents += 1;
        }
      }
    }
  }

  return { receivedEvents, storedEvents, duplicateEvents };
}
