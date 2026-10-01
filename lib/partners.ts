function trimUrl(value: string | undefined, fallback: string): string {
  return (value?.trim() || fallback).replace(/\/$/, "");
}

export const partnersConfig = {
  panelUrl: trimUrl(process.env.NEXT_PUBLIC_PANEL_URL, "http://localhost:3002"),
  apiUrl: trimUrl(process.env.NEXT_PUBLIC_API_URL, "http://localhost:8000/api/v1"),
  /** Vacío en local; en producción `.dlcperu.com.pe` para que el panel lea la cookie. */
  cookieDomain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN?.trim() || "",
  referralParam: "ref",
  referralCookie: "dlc_ref",
  referralCookieDays: 30,
} as const;

const REFERRAL_CODE = /^[A-Z0-9]{4,16}$/;

export function normalizeReferralCode(value: string | null | undefined): string | null {
  const code = value?.trim().toUpperCase() ?? "";
  return REFERRAL_CODE.test(code) ? code : null;
}

export function readStoredReferral(): string | null {
  const prefix = `${partnersConfig.referralCookie}=`;
  const entry = document.cookie.split("; ").find((part) => part.startsWith(prefix));
  return normalizeReferralCode(entry ? decodeURIComponent(entry.slice(prefix.length)) : null);
}

export function storeReferral(code: string): void {
  const parts = [
    `${partnersConfig.referralCookie}=${encodeURIComponent(code)}`,
    `Max-Age=${partnersConfig.referralCookieDays * 86400}`,
    "Path=/",
    "SameSite=Lax",
  ];
  if (partnersConfig.cookieDomain) parts.push(`Domain=${partnersConfig.cookieDomain}`);
  if (window.location.protocol === "https:") parts.push("Secure");
  document.cookie = parts.join("; ");
}

export function panelUrl(path: "/registro/" | "/login/", referral?: string | null): string {
  const url = `${partnersConfig.panelUrl}${path}`;
  return referral ? `${url}?${partnersConfig.referralParam}=${referral}` : url;
}
