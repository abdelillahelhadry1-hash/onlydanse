import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Incoming filters
  let city_id = searchParams.get("city_id");
  const rawCityName = searchParams.get("city");
  const style_id = searchParams.get("style_id");
  const event_type_id = searchParams.get("event_type_id");
  const from = searchParams.get("from"); // frontend should send `from`
  const to = searchParams.get("to");     // and `to`

  // Normalize city name
  const cityName = rawCityName ? rawCityName.trim().toLowerCase() : null;

  // If no city_id but a city name is provided → resolve it
  if (!city_id && cityName) {
    const { data: cityData, error: cityError } = await supabase
      .from("cities")
      .select("id, formatted_name")
      .ilike("formatted_name", `%${cityName}%`);

    if (cityError) {
      console.error("City lookup error:", cityError);
      return NextResponse.json(
        { error: "Error looking up city" },
        { status: 500 }
      );
    }

    if (!cityData || cityData.length === 0) {
      // No city match → no events
      return NextResponse.json([], { status: 200 });
    }

    // If multiple matches, pick the first for now
    city_id = cityData[0].id;
  }

  // Base query: all events, enriched with relations
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
        style_id,
        styles(*)
      ),
      event_images(*)
    `
    )
    .order("start_time", { ascending: true });

  // Optional city filter
  if (city_id) {
    query = query.eq("city_id", city_id);
  }

  // Optional event type filter
  if (event_type_id) {
    query = query.eq("event_type_id", event_type_id);
  }

  // Optional date range filters
  if (from) {
    query = query.gte("start_time", from);
  }

  if (to) {
    query = query.lte("start_time", to);
  }

  // Optional style filter (via join table event_styles)
  if (style_id) {
    // First, get all event_ids that have this style
    const { data: styleLinks, error: styleError } = await supabase
      .from("event_styles")
      .select("event_id")
      .eq("style_id", style_id);

    if (styleError) {
      console.error("Style lookup error:", styleError);
      return NextResponse.json(
        { error: "Error looking up styles" },
        { status: 500 }
      );
    }

    if (!styleLinks || styleLinks.length === 0) {
      // No events with this style → empty result
      return NextResponse.json([], { status: 200 });
    }

    const eventIds = styleLinks.map((row) => row.event_id);
    query = query.in("id", eventIds);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Events query error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
