import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const city_id = searchParams.get("city_id");
  const style_id = searchParams.get("style_id");
  const event_type_id = searchParams.get("event_type_id");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!city_id) {
    return NextResponse.json(
      { error: "city_id is required" },
      { status: 400 }
    );
  }

  let query = supabase
    .from("events")
    .select(
      `
      *,
      cities:city_id(*),
      event_types:event_type_id(*),
      organizers:organizer_id(*),
      venues:venue_id(*),
      event_styles(
        styles(*)
      ),
      event_images(*)
    `
    )
    .eq("city_id", city_id)
    .order("start_time", { ascending: true });

  if (style_id) {
    query = query.contains("event_styles", [{ style_id }]);
  }

  if (event_type_id) {
    query = query.eq("event_type_id", event_type_id);
  }

  if (from) {
    query = query.gte("start_time", from);
  }

  if (to) {
    query = query.lte("start_time", to);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

