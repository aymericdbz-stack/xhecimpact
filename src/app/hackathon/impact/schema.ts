import { z } from "zod";

export const profiles = ["tech", "business", "other"] as const;

export const countWords = (value: string) =>
  value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

export const registrationSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "Le prénom est obligatoire."),
    lastName: z
      .string()
      .trim()
      .min(1, "Le nom est obligatoire."),
    email: z
      .string()
      .trim()
      .min(1, "L’email est obligatoire.")
      .email("Merci d’indiquer un email valide."),
    confirmEmail: z
      .string()
      .trim()
      .min(1, "Merci de confirmer votre email.")
      .email("Merci d’indiquer un email valide."),
    profile: z.enum(profiles, {
      message: "Sélectionnez un profil.",
    }),
    motivation: z
      .string()
      .trim()
      .min(1, "Merci de partager votre motivation.")
      .superRefine((value, ctx) => {
        if (countWords(value) > 100) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "La motivation doit contenir au maximum 100 mots.",
          });
        }
      }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Les emails doivent être identiques.",
    path: ["confirmEmail"],
  });

export type RegistrationSchema = z.infer<typeof registrationSchema>;
