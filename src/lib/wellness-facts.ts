import { getSupabaseServerClient } from "@/lib/supabase/server";

export interface WellnessFact {
  topic: string;
  vetted_content: string;
  source: string;
}

export async function getWellnessFactsByTags(tags: string[]): Promise<WellnessFact[]> {
  if (tags.length === 0) return [];

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("wellness_facts")
    .select("topic, vetted_content, source")
    .overlaps("tags", tags);

  if (error || !data) return [];

  return data;
}
