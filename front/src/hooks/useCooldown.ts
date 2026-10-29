"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "lessso_contact_cooldown_expiry";
const TOTAL_DURATION_KEY = "lessso_contact_cooldown_duration";

/** The server enforces the limit; this timer only informs the visitor. */
export function useCooldown(defaultDurationSeconds: number = 90) {
  const [expiry, setExpiry] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(defaultDurationSeconds);

  useEffect(() => {
    try {
      const storedExpiry = Number(sessionStorage.getItem(STORAGE_KEY));
      const storedDuration = Number(sessionStorage.getItem(TOTAL_DURATION_KEY));
      if (Number.isFinite(storedExpiry) && storedExpiry > Date.now()) {
        setExpiry(storedExpiry);
        setRemainingSeconds(Math.ceil((storedExpiry - Date.now()) / 1000));
        if (Number.isFinite(storedDuration) && storedDuration > 0) setTotalSeconds(storedDuration);
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(TOTAL_DURATION_KEY);
      }
    } catch {
      // Browsers may block storage; the server still enforces the limit.
    }
  }, []);

  useEffect(() => {
    if (expiry === null) return;
    const update = () => {
      const remaining = Math.max(0, Math.ceil((expiry - Date.now()) / 1000));
      setRemainingSeconds(remaining);
      if (remaining === 0) {
        setExpiry(null);
        try {
          sessionStorage.removeItem(STORAGE_KEY);
          sessionStorage.removeItem(TOTAL_DURATION_KEY);
        } catch { /* Storage is optional. */ }
      }
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [expiry]);

  const startCooldown = useCallback((duration: number = defaultDurationSeconds) => {
    const seconds = Number.isFinite(duration) && duration > 0 ? Math.ceil(duration) : defaultDurationSeconds;
    const nextExpiry = Date.now() + seconds * 1000;
    setExpiry(nextExpiry);
    setTotalSeconds(seconds);
    setRemainingSeconds(seconds);
    try {
      sessionStorage.setItem(STORAGE_KEY, String(nextExpiry));
      sessionStorage.setItem(TOTAL_DURATION_KEY, String(seconds));
    } catch { /* Storage is optional. */ }
  }, [defaultDurationSeconds]);

  return {
    isCooldownActive: remainingSeconds > 0,
    remainingSeconds,
    totalSeconds,
    progressPercent: totalSeconds > 0 ? (remainingSeconds / totalSeconds) * 100 : 0,
    startCooldown,
  };
}
