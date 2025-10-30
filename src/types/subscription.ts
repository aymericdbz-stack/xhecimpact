export type ProfileCategory = "tech" | "business" | "other";

export interface Subscription {
  id: string;
  created_at: string;
  updated_at?: string | null;
  user_id?: string | null;
  event_slug: string;
  first_name: string;
  last_name: string;
  email: string;
  profile: ProfileCategory;
  motivation: string;
  status?: string | null;
}
