"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "lessso_contact_cooldown_expiry";
const TOTAL_DURATION_KEY = "lessso_contact_cooldown_duration";

/**
 * Hook para gestionar el periodo de Cooldown de 90 segundos tras envio del formulario
 */
export function useCooldown(defaultDurationSeconds: number = 90) {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(defaultDurationSeconds);

  // Inicializar estado revisando sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedExpiry = sessionStorage.getItem(STORAGE_KEY);
    const storedDuration = sessionStorage.getItem(TOTAL_DURATION_KEY);

    if (storedExpiry) {
      const expiryTimestamp = parseInt(storedExpiry, 10);
      const now = Date.now();
      const diffSecs = Math.ceil((expiryTimestamp - now) / 1000);

      if (diffSecs > 0) {
        setRemainingSeconds(diffSecs);
        if (storedDuration) {
          setTotalSeconds(parseInt(storedDuration, 10));
        }
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(TOTAL_DURATION_KEY);
      }
    }
  }, []);

  // Cuenta regresiva activa
  useEffect(() => {
    if (remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (typeof window !== "undefined") {
            sessionStorage.removeItem(STORAGE_KEY);
            sessionStorage.removeItem(TOTAL_DURATION_KEY);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds]);

  /**
   * Inicia el periodo de enfriamiento
   */
  const startCooldown = useCallback((duration: number = defaultDurationSeconds) => {
    const expiryTimestamp = Date.now() + duration * 1000;
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, expiryTimestamp.toString());
      sessionStorage.setItem(TOTAL_DURATION_KEY, duration.toString());
    }
    setTotalSeconds(duration);
    setRemainingSeconds(duration);
  }, [defaultDurationSeconds]);

  const isCooldownActive = remainingSeconds > 0;
  // Porcentaje restante para la barra de progreso dorada
  const progressPercent = totalSeconds > 0 ? (remainingSeconds / totalSeconds) * 100 : 0;

  return {
    isCooldownActive,
    remainingSeconds,
    totalSeconds,
    progressPercent,
    startCooldown,
  };
}
