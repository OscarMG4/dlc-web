"use client";

import { useEffect } from "react";
import { normalizeReferralCode, partnersConfig, storeReferral } from "@/lib/partners";

const SESSION_KEY = "dlc_ref_visit";

/**
 * Guarda el código `?ref=` en una cookie (la lee el registro del panel) y
 * registra la visita una sola vez por sesión del navegador.
 */
export function ReferralCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = normalizeReferralCode(params.get(partnersConfig.referralParam));
    if (!code) return;

    storeReferral(code);

    try {
      if (sessionStorage.getItem(SESSION_KEY) === code) return;
      sessionStorage.setItem(SESSION_KEY, code);
    } catch {
      // Sin sessionStorage (modo privado estricto): se registra igual; el API deduplica por día.
    }

    fetch(`${partnersConfig.apiUrl}/referrals/${code}/visits`, {
      method: "POST",
      keepalive: true,
      headers: { Accept: "application/json" },
    }).catch(() => undefined);
  }, []);

  return null;
}
