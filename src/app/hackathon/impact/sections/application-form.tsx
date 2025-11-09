"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { applicationSchema, countWords, profiles, type ApplicationSchema } from "../schema";

interface ApplicationFormProps {
  email: string;
  defaultFirstName: string;
  defaultLastName: string;
  onSuccess: () => void;
}

export function ApplicationForm({ email, defaultFirstName, defaultLastName, onSuccess }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ApplicationSchema>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: defaultFirstName,
      lastName: defaultLastName,
      email,
      confirmEmail: email,
      profile: "tech",
      motivation: "",
    },
  });

  const motivationValue = form.watch("motivation");
  const wordCount = useMemo(() => countWords(motivationValue ?? ""), [motivationValue]);
  const remainingWords = Math.max(0, 100 - wordCount);

  const handleSubmit = async (values: ApplicationSchema) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, motivation: values.motivation.trim() }),
      });

      if (response.status === 409) {
        toast("you already applied", {
          description: "we kept your first submission on file",
        });
        onSuccess();
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message ?? "unexpected error while submitting");
      }

      onSuccess();
    } catch (error) {
      const message = error instanceof Error ? error.message : "something went wrong";
      toast("submission failed", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>first name</FormLabel>
                <FormControl>
                  <Input placeholder="alex" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>last name</FormLabel>
                <FormControl>
                  <Input placeholder="dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input {...field} readOnly aria-readonly type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>repeat email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="confirm your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="profile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>profile</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="choose your focus" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {profiles.map((profile) => (
                    <SelectItem key={profile} value={profile} className="capitalize">
                      {profile}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="motivation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>motivation</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="tell us why this hackathon matters to you"
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>100 words max — {remainingWords} left</span>
                <span>{wordCount} used</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "apply now"}
        </Button>
      </form>
    </Form>
  );
}
