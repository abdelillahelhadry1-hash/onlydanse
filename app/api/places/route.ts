import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { formatCity } from "@/lib/formatCity";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json({ predictions: [] });
  }

  // 1️⃣ SEARCH DATABASE FIRST
  const { data: dbCities, error: dbError } = await supabase
    .from("cities")
    .select("*")
    .ilike("formatted_name", `%${input}%`)
    .limit(5);

  if (dbError) {
    console.error("DB error:", dbError);
  }

  // If DB has results → return them immediately
  if (dbCities && dbCities.length > 0) {
    return NextResponse.json({
      predictions: dbCities.map((c) => ({
        description: c.formatted_name,
        city_name: c.city_name,
        state_code: c.state_code,
        country_name: c.country_name,
        lat: c.lat,
        lng: c.lng,
        google_place_id: c.google_place_id,
      })),
    });
  }

  // 2️⃣ GOOGLE PLACES FALLBACK
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing Google Maps API key" },
      { status: 500 }
    );
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&types=(cities)&key=${apiKey}`;

  const googleRes = await fetch(url);
  const googleData = await googleRes.json();

  if (!googleData.predictions || googleData.predictions.length === 0) {
    return NextResponse.json({ predictions: [] });
  }

  const first = googleData.predictions[0];

  // 3️⃣ GET PLACE DETAILS (lat/lng + structured info)
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${first.place_id}&key=${apiKey}`;
  const detailsRes = await fetch(detailsUrl);
  const detailsData = await detailsRes.json();

  const components = detailsData.result.address_components;

  const city =
    components.find((c: any) => c.types.includes("locality"))?.long_name ||
    components.find((c: any) =>
      c.types.includes("administrative_area_level_2")
    )?.long_name;

  const state_code = components.find((c: any) =>
    c.types.includes("administrative_area_level_1")
  )?.short_name;

  const country = components.find((c: any) =>
    c.types.includes("country")
  )?.long_name;

  const lat = detailsData.result.geometry.location.lat;
  const lng = detailsData.result.geometry.location.lng;

  // 4️⃣ APPLY USA RULE
  let city_name = city;
  if (country === "United States" && state_code) {
    city_name = `${city}, ${state_code}`;
  }

  // 5️⃣ FORMAT NAME
  const formatted_name = formatCity(city, state_code, country);

  // 6️⃣ INSERT INTO DATABASE
  const { data: inserted, error: insertError } = await supabase
    .from("cities")
    .insert({
      city_name: city_name.toLowerCase(),
      state_code: state_code || null,
      country_name: country.toLowerCase(),
      formatted_name,
      google_place_id: first.place_id,
      lat,
      lng,
    })
    .select()
    .single();

  if (insertError) {
    console.error("Insert error:", insertError);
  }

  // 7️⃣ RETURN THE NEW CITY
  return NextResponse.json({
    predictions: [
      {
        description: formatted_name,
        city_name,
        state_code,
        country_name: country,
        lat,
        lng,
        google_place_id: first.place_id,
      },
    ],
  });
}
