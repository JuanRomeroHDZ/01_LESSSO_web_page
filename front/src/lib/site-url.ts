/** Set NEXT_PUBLIC_SITE_URL to the final HTTPS origin before indexing. */
export function getSiteUrl(): string | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return undefined;
    return url.origin;
  } catch { return undefined; }
}
