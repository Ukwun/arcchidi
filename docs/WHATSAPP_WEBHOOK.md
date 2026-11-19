# WhatsApp Cloud API webhook

The App Router endpoint is:

```text
GET  /api/webhooks/whatsapp
POST /api/webhooks/whatsapp
```

It is server-only. No Firebase Admin credential, Meta app secret, verify
token, or access token is exposed to browser code.

## Environment variables

Set these locally in `.env.local` and in Netlify under Site configuration →
Environment variables. Never commit the values.

```text
WHATSAPP_VERIFY_TOKEN=long-random-string
META_APP_SECRET=your-meta-app-secret
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Generate a dedicated Firebase service account key in Firebase/Google Cloud IAM
and grant only the Firestore permissions needed by this application. Rotate it
if it is ever exposed. The private key must retain escaped newlines when added
to Netlify; the server converts `\\n` to real newlines.

## Meta configuration

In the Meta developer dashboard, configure the WhatsApp webhook callback URL:

```text
https://YOUR_DOMAIN/api/webhooks/whatsapp
```

Use the exact same value as `WHATSAPP_VERIFY_TOKEN` for the callback verify
token. Subscribe the WhatsApp Business Account to the `messages` field. Meta
will call GET to verify the callback, then POST signed event payloads.

The POST handler checks `X-Hub-Signature-256` against the raw body using
`META_APP_SECRET` and constant-time comparison. It stores messages and status
updates in the `whatsappWebhookEvents` Firestore collection. Document IDs are
deterministic (`message:<id>` and `status:<id>:<status>`), and a transaction
prevents duplicate deliveries from creating duplicate documents.

The handler does not send replies. Add a separate, explicit business workflow
only after customer consent, approved WhatsApp templates, opt-out handling,
and authorization rules are defined.

## Local testing

Start the app:

```bash
npm run dev
```

Expose localhost through an HTTPS tunnel such as ngrok or Cloudflare Tunnel,
then use the public callback URL in Meta. Do not use a production Firebase
service-account key in an untrusted shared environment.

Verify the GET challenge:

```bash
curl "http://localhost:3000/api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=long-random-string&hub.challenge=test-challenge"
```

The response must be exactly `test-challenge`. A wrong token must return 403.

For a POST, compute the HMAC-SHA256 digest over the exact bytes sent and send:

```text
X-Hub-Signature-256: sha256=<hex digest>
```

The automated tests cover token verification, invalid signatures, valid
messages/statuses, unknown event shapes, and duplicate deliveries:

```bash
npm test
```

## Netlify deployment

1. Deploy the repository with the Next.js build command `npm run build`.
2. Add all five environment variables for the Production context.
3. Trigger a fresh deploy after saving variables.
4. Confirm the callback GET challenge against the deployed URL.
5. Send a real test WhatsApp message and confirm one message document and any
   status documents appear in Firestore.
6. Send/replay the same signed payload and confirm no duplicate documents are
   created.
7. Monitor Netlify function logs and Firestore usage.

Netlify environment variables used by server-rendered/runtime code must be
available to both the build and Functions scopes. The endpoint must remain on
a runtime that supports Node crypto and Firebase Admin SDK.
