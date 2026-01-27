import { supabase } from "@/lib/supabaseClient";
import { normalizeCity } from "@/lib/normalizeCity";
import { aliasMap } from "@/lib/aliasMap";
import { fuzzyMatch } from "@/lib/fuzzyMatch";
import { getGooglePlace } from "@/lib/googlePlaces";
import { formatCity } from "@/lib/formatCity";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("q") || "";
  const normalized = normalizeCity(raw);

  if (!normalized) {
    return Response.json([]);
  }

  const english = aliasMap[normalized] || normalized;

  // 1) Exact match in Supabase
  let { data: cities } = await supabase
    .from("cities")
    .select("*")
    .ilike("city_name", english);

  if (cities && cities.length > 0) {
    return Response.json(cities);
  }

  // 2) Fuzzy match
  let { data: allCities } = await supabase.from("cities").select("*");
  const fuzzy = allCities?.find((c) => fuzzyMatch(c.city_name, english));
  if (fuzzy) return Response.json([fuzzy]);

  // 3) Google Places fallback
  const place = await getGooglePlace(english);
  if (!place || !place.city || !place.country) {
    return Response.json([]);
  }

  const formatted = formatCity(place.city, place.state, place.country);

  // 4) Check by google_place_id
  const { data: existing } = await supabase
    .from("cities")
    .select("*")
    .eq("google_place_id", place.place_id)
    .maybeSingle();

  if (existing) return Response.json([existing]);

  // 5) Insert new city
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
