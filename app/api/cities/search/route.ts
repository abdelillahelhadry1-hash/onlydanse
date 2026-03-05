export const dynamic = "force-dynamic";

import { createSupabaseClient } from "@/lib/supabaseClient";
import { normalizeCity } from "@/lib/normalizeCity";
import { aliasMap } from "@/lib/aliasMap";
import { fuzzyMatch } from "@/lib/fuzzyMatch";
import { getGooglePlace } from "@/lib/googlePlaces";
import { formatCity } from "@/lib/formatCity";

export async function GET(req: Request) {
  const supabase = createSupabaseClient();

  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("q") || "";
  const normalized = normalizeCity(raw);

  if (!normalized) return Response.json([]);

  const english = aliasMap[normalized] || normalized;

  let { data: cities } = await supabase
    .from("cities")
    .select("*")
    .ilike("city_name", english);

  if (cities?.length) return Response.json(cities);

  let { data: allCities } = await supabase.from("cities").select("*");
  const fuzzy = allCities?.find((c) => fuzzyMatch(c.city_name, english));
  if (fuzzy) return Response.json([fuzzy]);

  const place = await getGooglePlace(english);
  if (!place?.city || !place?.country) return Response.json([]);

  const formatted = formatCity(place.city, place.state, place.country);

  const { data: existing } = await supabase
    .from("cities")
    .select("*")
    .eq("google_place_id", place.place_id)
    .maybeSingle();

  if (existing) return Response.json([existing]);

  const { data: inserted } = await supabase
    .from("cities")
    .insert({
      city_name: place.city.toLowerCase(),
      state_code: place.state,
      country_name: place.country.toLowerCase(),
      formatted_name: formatted,
      google_place_id: place.place_id,
      lat: place.lat,
      lng: place.lng,
    })
    .select()
    .single();

  return Response.json([inserted]);
}
