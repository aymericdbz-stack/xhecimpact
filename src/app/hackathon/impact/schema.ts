import { z } from "zod";

export const profiles = ["tech", "business", "other"] as const;
export const teamOptions = ["yes", "no"] as const;

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
    hasTeam: z.enum(teamOptions, {
      message: "Indiquez si vous avez une équipe.",
    }),
    teamMembers: z
      .string()
      .trim()
      .optional(),
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
  .superRefine((data, ctx) => {
    if (data.hasTeam === "yes") {
      if (!data.teamMembers || data.teamMembers.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Merci d’indiquer les membres de votre équipe.",
          path: ["teamMembers"],
        });
      }
    }
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Les emails doivent être identiques.",
    path: ["confirmEmail"],
  });

export const applicationSchema = registrationSchema;

export type RegistrationSchema = z.infer<typeof registrationSchema>;
export type ApplicationSchema = z.infer<typeof applicationSchema>;
