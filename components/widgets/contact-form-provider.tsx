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
import { ContactForm } from "@/components/forms/contact-form";
import { CloseIcon, MailIcon, MinusIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { company } from "@/lib/content";
import { WhatsAppFab } from "@/components/widgets/whatsapp-provider";

type ContactFormContextValue = {
  openForm: () => void;
  closeForm: () => void;
};

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

function useContactForm() {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error("useContactForm debe usarse dentro de ContactFormProvider");
  }
  return context;
}

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const openForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => setIsFormOpen(false), []);

  useEffect(() => {
    if (!isFormOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeForm();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeForm, isFormOpen]);

  const transition = {
    duration: shouldReduceMotion ? 0 : 0.4,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <ContactFormContext.Provider value={{ openForm, closeForm }}>
      {children}

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-end p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-6">
        <div className="pointer-events-auto flex w-full max-w-[min(100%,24rem)] flex-col items-end gap-2.5 sm:max-w-md sm:gap-3">
          <AnimatePresence>
            {isFormOpen ? (
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={transition}
                role="dialog"
                aria-label="Formulario de contacto por correo"
                className="w-full overflow-hidden rounded-[1.75rem] border border-ink/5 bg-white shadow-elevated sm:max-w-sm"
              >
                <div className="flex items-start justify-between gap-4 bg-ink px-6 py-5">
                  <div>
                    <p className="font-display text-[10px] font-semibold uppercase tracking-brand text-brand">
                      {company.name}
                    </p>
                    <p className="mt-1 font-display text-base font-semibold text-white">
                      Escríbenos por correo
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeForm}
                    aria-label="Minimizar formulario"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand hover:bg-brand hover:text-ink"
                  >
                    <MinusIcon className="size-4" />
                  </button>
                </div>

                <div className="max-h-[65vh] overflow-y-auto px-6 py-6">
                  <ContactForm compact />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <button
                  type="button"
                  onClick={() => (isFormOpen ? closeForm() : openForm())}
                  aria-expanded={isFormOpen}
                  aria-label={isFormOpen ? "Cerrar formulario de correo" : "Abrir formulario de correo"}
                  className="flex size-12 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-700 sm:size-auto sm:px-5 sm:py-3.5"
                >
                  {isFormOpen ? (
                    <CloseIcon className="size-4" />
                  ) : (
                    <MailIcon className="size-4" />
                  )}
                  <span className="hidden sm:inline">
                    {isFormOpen ? "Cerrar" : "Correo"}
                  </span>
                </button>

                <WhatsAppFab
                  ariaLabel="Abrir consultas por WhatsApp de Grupo DLC"
                  suppressBubble={isFormOpen}
                />
          </div>
        </div>
      </div>
    </ContactFormContext.Provider>
  );
}

type ContactFormButtonProps = {
  variant?: "primary" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children" | "onClick">;

export function ContactFormButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ContactFormButtonProps) {
  const { openForm } = useContactForm();

  return (
    <button
      type="button"
      className={buttonClasses({ variant, size, className })}
      onClick={openForm}
      {...props}
    >
      {children}
    </button>
  );
}

export { useContactForm };
