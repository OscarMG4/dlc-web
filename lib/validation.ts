import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Ingresa tus nombres y apellidos")
    .max(80, "Máximo 80 caracteres"),
  phone: z
    .string()
    .trim()
    .min(9, "Ingresa un número de celular válido")
    .max(20, "Máximo 20 caracteres")
    .regex(/^[0-9+\s()-]+$/, "Solo números y los símbolos + ( ) -"),
  email: z
    .string()
    .trim()
    .min(1, "Ingresa tu correo electrónico")
    .email("Ingresa un correo válido")
    .max(120, "Máximo 120 caracteres"),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntanos en al menos 10 caracteres qué información necesitas")
    .max(600, "Máximo 600 caracteres"),
  // Honeypot anti-bot (oculto en UI).
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
