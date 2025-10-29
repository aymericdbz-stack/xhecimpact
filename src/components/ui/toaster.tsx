"use client";

import { Toaster as SonnerToaster, toast as sonnerToast, type ExternalToast } from "sonner";

export const toast = sonnerToast;

export type ToastOptions = ExternalToast;

export const Toaster = () => (
  <SonnerToaster
    position="top-center"
    richColors
    closeButton
    toastOptions={{
      style: {
        background: "var(--popover)",
        color: "var(--popover-foreground)",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        boxShadow: "0 20px 25px -5px rgb(15 23 42 / 0.1), 0 10px 10px -5px rgb(15 23 42 / 0.04)",
      },
    }}
  />
);
