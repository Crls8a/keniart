"use client";

import { routes } from "@/lib/routes";

type ConversionEventName = "lead_whatsapp_click" | "instagram_click" | "dossier_download";

type ConversionEvent = {
  event: ConversionEventName;
  page_path: string;
  link_host: string;
  link_path: string;
  context: string;
};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
};

const safeContextPattern = /^[a-z0-9_-]{1,48}$/;

function getEventName(url: URL): ConversionEventName | null {
  const hostname = url.hostname.toLowerCase();

  if (hostname === "wa.me") return "lead_whatsapp_click";
  if (hostname === "instagram.com" || hostname.endsWith(".instagram.com")) return "instagram_click";
  if (url.origin === window.location.origin && url.pathname === routes.dossierPdf) return "dossier_download";

  return null;
}

function getSafeContext(context?: string) {
  return context && safeContextPattern.test(context) ? context : "site";
}

function getSafeLinkPath(url: URL, eventName: ConversionEventName) {
  return eventName === "lead_whatsapp_click" ? "/contact" : url.pathname;
}

export function trackConversion(url: URL, context?: string) {
  const eventName = getEventName(url);
  if (!eventName) return;

  const conversionEvent: ConversionEvent = {
    event: eventName,
    page_path: window.location.pathname,
    link_host: url.hostname.toLowerCase(),
    link_path: getSafeLinkPath(url, eventName),
    context: getSafeContext(context),
  };
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  analyticsWindow.dataLayer.push(conversionEvent);
}
