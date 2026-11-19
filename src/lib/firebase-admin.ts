import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

function requiredEnvironmentVariable(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }

  return value;
}

export function getFirebaseFirestore(): Firestore {
  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert({
        projectId: requiredEnvironmentVariable("FIREBASE_PROJECT_ID"),
        clientEmail: requiredEnvironmentVariable("FIREBASE_CLIENT_EMAIL"),
        privateKey: requiredEnvironmentVariable("FIREBASE_PRIVATE_KEY").replace(
          /\\n/g,
          "\n",
        ),
      }),
    });

  return getFirestore(app);
}
