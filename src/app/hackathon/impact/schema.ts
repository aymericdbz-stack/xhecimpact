import { z } from "zod";

export const profiles = ["tech", "business", "other"] as const;

export const countWords = (value: string) =>
  value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

export const applicationSchema = z
  .object({
    firstName: z.string().min(1, "first name is required"),
    lastName: z.string().min(1, "last name is required"),
    email: z.string().email("enter a valid email"),
    confirmEmail: z.string().email("enter a valid email"),
    profile: z.enum(profiles, "select a profile"),
    motivation: z
      .string()
      .min(1, "tell us a bit about your motivation")
      .refine((value) => countWords(value) <= 100, {
        message: "motivation must be 100 words or fewer",
      }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "emails must match",
    path: ["confirmEmail"],
  });

export type ApplicationSchema = z.infer<typeof applicationSchema>;
