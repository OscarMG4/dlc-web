"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { submitWeb3Form } from "@/lib/web3forms";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const fieldClasses =
  "w-full rounded-sm border border-ink/10 bg-[#fafaf8] px-4 py-3.5 text-sm text-ink placeholder:text-ink-300 transition-colors duration-200 focus:border-brand focus:bg-white focus:outline-none";

type ContactFormProps = {
  compact?: boolean;
  onSuccess?: () => void;
};

export function ContactForm({ compact = false, onSuccess }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", phone: "", email: "", message: "", website: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("sending");
    setErrorMessage("");

    if (values.website) {
      setStatus("success");
      reset();
      onSuccess?.();
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "El envío por correo aún no está activo. Escríbenos por WhatsApp mientras tanto."
      );
      return;
    }

    try {
      await submitWeb3Form({
        access_key: accessKey,
        subject: `Contacto web Finca Algarrobo — ${values.fullName}`,
        from_name: "Grupo DLC",
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        message: [
          `Nombre: ${values.fullName}`,
          `Celular: ${values.phone}`,
          `Correo del cliente: ${values.email}`,
          "",
          values.message,
        ].join("\n"),
        replyto: values.email,
      });

      setStatus("success");
      reset();
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "No pudimos enviar tu mensaje."
      );
    }
  });

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-brand-soft px-6 py-10 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand text-ink">
          <CheckIcon className="size-6" />
        </span>
        <div>
          <p className="font-display text-lg font-semibold text-ink">
            ¡Mensaje enviado!
          </p>
          <p className="mt-2 text-sm text-ink-500">
            Un asesor de Grupo DLC se comunicará contigo muy pronto.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("website")}
      />

      <div className={cn(compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2")}>
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-ink-500"
          >
            Nombres y apellidos
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Ej. María Pérez Díaz"
            className={fieldClasses}
            aria-invalid={Boolean(errors.fullName)}
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p className="mt-1.5 text-xs text-red-600">{errors.fullName.message}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-ink-500"
          >
            Celular
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Ej. 983 771 968"
            className={fieldClasses}
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          {errors.phone ? (
            <p className="mt-1.5 text-xs text-red-600">{errors.phone.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-ink-500"
        >
          Tu correo electrónico
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Ej. tu@correo.com"
          className={fieldClasses}
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email ? (
          <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-ink-500"
        >
          Mensaje
        </label>
        <textarea
          id="message"
          rows={compact ? 3 : 4}
          required
          placeholder="Cuéntanos qué información necesitas sobre los lotes."
          className={cn(fieldClasses, "resize-none")}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message ? (
          <p className="mt-1.5 text-xs text-red-600">{errors.message.message}</p>
        ) : null}
      </div>

      {status === "error" ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        size={compact ? "md" : "lg"}
        disabled={status === "sending"}
        className="w-full"
      >
        {status === "sending" ? "Enviando..." : "Quiero más información"}
      </Button>

      <p className="text-center text-[11px] leading-relaxed text-ink-300">
        Al enviar aceptas que un asesor de Grupo DLC te contacte por celular o
        correo.
      </p>
    </form>
  );
}
