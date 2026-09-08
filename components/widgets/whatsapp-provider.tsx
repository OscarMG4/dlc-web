"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { CloseIcon, WhatsAppIcon } from "@/components/icons";
import { Button, buttonClasses } from "@/components/ui/button";
import {
  buildWhatsAppUrl,
  company,
  whatsappLeadAvatars,
  whatsappLeadBubble,
  whatsappQuickQuestions,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import Image from "next/image";

type WhatsAppContextValue = {
  openPicker: () => void;
  closePicker: () => void;
  isOpen: boolean;
};

const WhatsAppContext = createContext<WhatsAppContextValue | null>(null);

function useWhatsAppPicker() {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error("useWhatsAppPicker debe usarse dentro de WhatsAppProvider");
  }
  return context;
}

function openWhatsApp(message: string) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const closePicker = useCallback(() => {
    setIsOpen(false);
    setCustomMessage("");
  }, []);

  const openPicker = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePicker();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closePicker, isOpen]);

  const sendCustom = () => {
    const text = customMessage.trim();
    if (!text) return;
    openWhatsApp(text);
    closePicker();
  };

  const sendPreset = (message: string) => {
    openWhatsApp(message);
    closePicker();
  };

  return (
    <WhatsAppContext.Provider value={{ openPicker, closePicker, isOpen }}>
      {children}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="whatsapp-picker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[70] flex items-end justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-picker-title"
          >
            <button
              type="button"
              aria-label="Cerrar selector de WhatsApp"
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
              onClick={closePicker}
            />

            <motion.div
              initial={{ y: shouldReduceMotion ? 0 : 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: shouldReduceMotion ? 0 : 24, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="relative flex max-h-[min(90vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-elevated ring-1 ring-ink/5"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-ink/8 bg-[#25D366]/10 px-6 py-5">
                <div className="flex gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                    <WhatsAppIcon className="size-6" />
                  </span>
                  <div>
                    <h2
                      id="whatsapp-picker-title"
                      className="font-display text-lg font-semibold text-ink"
                    >
                      Escríbenos por WhatsApp
                    </h2>
                    <p className="mt-1 text-sm text-ink-500">
                      Elige una consulta frecuente o redacta tu mensaje.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closePicker}
                  aria-label="Cerrar"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full text-ink-300 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <CloseIcon className="size-5" />
                </button>
              </div>

              <div className="overflow-y-auto px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-300">
                  Consultas frecuentes
                </p>

                <ul className="mt-3 space-y-2">
                  {whatsappQuickQuestions.map((question) => (
                    <li key={question.id}>
                      <button
                        type="button"
                        onClick={() => sendPreset(question.message)}
                        className="group w-full rounded-2xl border border-ink/8 bg-surface px-4 py-3.5 text-left transition-all duration-300 hover:border-[#25D366]/40 hover:bg-[#25D366]/5"
                      >
                        <span className="block font-display text-sm font-semibold text-ink group-hover:text-ink">
                          {question.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-ink-500">
                          {question.description}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-ink/8 pt-6">
                  <label
                    htmlFor="whatsapp-custom-message"
                    className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-300"
                  >
                    Mensaje personalizado
                  </label>
                  <textarea
                    id="whatsapp-custom-message"
                    rows={4}
                    value={customMessage}
                    onChange={(event) => setCustomMessage(event.target.value)}
                    placeholder="Escribe aquí tu consulta..."
                    className="mt-3 w-full resize-none rounded-2xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-300 transition-colors focus:border-[#25D366] focus:outline-none"
                  />
                  <Button
                    type="button"
                    size="lg"
                    disabled={!customMessage.trim()}
                    onClick={sendCustom}
                    className="mt-3 w-full bg-[#25D366] text-white shadow-[0_8px_28px_-8px_rgba(37,211,102,0.65)] hover:bg-[#1fb855] disabled:opacity-50"
                  >
                    <WhatsAppIcon className="size-4" />
                    Enviar mensaje personalizado
                  </Button>
                </div>
              </div>

              <p className="border-t border-ink/8 px-6 py-3 text-center text-[11px] text-ink-300">
                Te atiende {company.name} · {company.phoneDisplay}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </WhatsAppContext.Provider>
  );
}

type WhatsAppButtonProps = {
  variant?: "primary" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children" | "onClick">;

export function WhatsAppButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: WhatsAppButtonProps) {
  const { openPicker } = useWhatsAppPicker();

  return (
    <button
      type="button"
      className={buttonClasses({ variant, size, className })}
      onClick={openPicker}
      {...props}
    >
      {children}
    </button>
  );
}

type WhatsAppFabProps = {
  className?: string;
  ariaLabel?: string;
  suppressBubble?: boolean;
  children?: ReactNode;
};

const BUBBLE_DISMISS_KEY = "dlc-whatsapp-bubble-dismissed";
const BUBBLE_DELAY_MS = 1600;
const TYPING_MS = 1400;
const EXIT_MS = 220;
const BUBBLE_AUTO_HIDE_MS = 12000;

export function WhatsAppFab({
  className,
  ariaLabel = "Abrir opciones de WhatsApp",
  suppressBubble = false,
  children,
}: WhatsAppFabProps) {
  const { openPicker, isOpen } = useWhatsAppPicker();
  const shouldReduceMotion = useReducedMotion();
  const [showBubble, setShowBubble] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(BUBBLE_DISMISS_KEY) === "1") return;

    const appear = window.setTimeout(() => setShowBubble(true), BUBBLE_DELAY_MS);
    const reveal = window.setTimeout(
      () => setIsTyping(false),
      shouldReduceMotion ? BUBBLE_DELAY_MS : BUBBLE_DELAY_MS + TYPING_MS
    );

    return () => {
      window.clearTimeout(appear);
      window.clearTimeout(reveal);
    };
  }, [shouldReduceMotion]);

  const dismissBubble = useCallback(() => {
    sessionStorage.setItem(BUBBLE_DISMISS_KEY, "1");
    setIsLeaving(true);
    window.setTimeout(() => {
      setShowBubble(false);
      setIsLeaving(false);
    }, EXIT_MS);
  }, []);

  useEffect(() => {
    if (!showBubble || isTyping || isLeaving) return;

    const hide = window.setTimeout(dismissBubble, BUBBLE_AUTO_HIDE_MS);
    return () => window.clearTimeout(hide);
  }, [dismissBubble, isLeaving, isTyping, showBubble]);

  const openFromBubble = () => {
    dismissBubble();
    openPicker();
  };

  const bubbleVisible = showBubble && !isOpen && !suppressBubble;

  return (
    <div className="relative">
      {bubbleVisible ? (
        <div
          className={cn(
            "whatsapp-bubble absolute right-0 bottom-[calc(100%+0.9rem)] z-10 w-[min(19.5rem,calc(100vw-2.25rem))] overflow-visible rounded-[22px] bg-white shadow-[0_18px_50px_-12px_rgba(37,211,102,0.45),0_12px_28px_-8px_rgba(0,0,0,0.28)]",
            isLeaving ? "whatsapp-bubble-out" : "whatsapp-bubble-in"
          )}
        >
          <div className="relative flex items-center gap-3 rounded-t-[22px] bg-ink px-3.5 py-3 pr-10">
            <span className="absolute inset-x-0 top-0 h-0.5 rounded-t-[22px] bg-brand" />
            <div className="flex -space-x-2.5">
              {whatsappLeadAvatars.map((agent, index) => (
                <span
                  key={agent.src}
                  className="whatsapp-avatar relative inline-flex size-9"
                  style={{
                    animationDelay: `${140 + index * 90}ms`,
                    zIndex: whatsappLeadAvatars.length - index,
                  }}
                >
                  <span className="size-9 overflow-hidden rounded-full bg-brand ring-[2.5px] ring-white">
                    <Image
                      src={agent.src}
                      alt={agent.alt}
                      width={36}
                      height={36}
                      className="size-full object-cover"
                    />
                  </span>
                  {index === 0 ? (
                    <span className="whatsapp-online absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-white bg-[#25D366]" />
                  ) : null}
                </span>
              ))}
            </div>
            <div className="min-w-0 text-white">
              <p className="truncate font-display text-[13px] font-semibold leading-tight">
                {whatsappLeadBubble.title}
              </p>
              <p className="truncate text-[11px] font-medium leading-tight text-white/75">
                {isTyping
                  ? whatsappLeadBubble.typingLabel
                  : `en línea · ${whatsappLeadBubble.project}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={dismissBubble}
            aria-label="Cerrar mensaje de WhatsApp"
            className="absolute top-2 right-2 z-[2] flex size-8 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="size-4" />
          </button>

          <button
            type="button"
            onClick={openFromBubble}
            className="block min-h-[7.25rem] w-full px-3.5 pt-3 pb-3.5 text-left"
            aria-live="polite"
          >
            {isTyping ? (
              <div className="flex h-full items-center">
                <span className="inline-flex items-center gap-1 rounded-2xl bg-surface px-3.5 py-2.5">
                  <span className="whatsapp-dot" />
                  <span className="whatsapp-dot" />
                  <span className="whatsapp-dot" />
                </span>
              </div>
            ) : (
              <div className="whatsapp-message">
                <p className="mb-3 text-[15px] leading-snug font-medium text-ink">
                  {whatsappLeadBubble.message}
                </p>
                <span className="whatsapp-cta inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_18px_-6px_rgba(37,211,102,0.9)]">
                  <WhatsAppIcon className="size-4" />
                  {whatsappLeadBubble.cta}
                </span>
              </div>
            )}
          </button>
          <span className="whatsapp-tail" aria-hidden="true" />
        </div>
      ) : null}

      <button
        type="button"
        onClick={openPicker}
        aria-label={ariaLabel}
        className={cn(
          "group relative flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_36px_-14px_rgba(37,211,102,0.9)] transition-transform duration-300 hover:scale-105",
          children ? "gap-2 px-4 py-3.5 sm:px-5" : "size-14",
          className
        )}
      >
        {children ? (
          <>
            <span className="whatsapp-ring" aria-hidden="true" />
            <span className="whatsapp-ring whatsapp-ring-delayed" aria-hidden="true" />
            <span className="relative z-[1] flex items-center gap-2">
              {children}
            </span>
          </>
        ) : (
          <>
            <span className="whatsapp-ring" aria-hidden="true" />
            <span className="whatsapp-ring whatsapp-ring-delayed" aria-hidden="true" />
            <span className="whatsapp-button relative z-[1] flex size-full items-center justify-center">
              <WhatsAppIcon className="size-7" />
            </span>
            {bubbleVisible && !isTyping ? (
              <span className="whatsapp-badge absolute -top-0.5 -right-0.5 z-[2] flex size-5 min-w-5 items-center justify-center rounded-full bg-[#ff3b30] text-[11px] leading-none font-bold text-white shadow-md">
                1
              </span>
            ) : null}
          </>
        )}
      </button>
    </div>
  );
}

export { useWhatsAppPicker };
