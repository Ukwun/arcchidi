import { headers } from "next/headers";

export async function getSiteOrigin(): Promise<URL> {
  const configuredOrigin =
    process.env.URL ?? process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredOrigin) {
    return new URL(configuredOrigin);
  }

  const host = (await headers()).get("host");

  if (!host || !/^[a-z\d.-]+(?::\d+)?$/i.test(host)) {
    throw new Error(
      "Unable to determine the site origin. Configure URL or NEXT_PUBLIC_SITE_URL.",
    );
  }

  const protocol =
    host.startsWith("localhost") || host.startsWith("127.") ? "http:" : "https:";

  return new URL(`${protocol}//${host}`);
}
