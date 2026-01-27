export async function getGooglePlace(query: string) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query
  )}&key=${process.env.GOOGLE_API_KEY}`;

  const res = await fetch(url);
  const json = await res.json();

  if (!json.results || json.results.length === 0) return null;

  const place = json.results[0];

  const cityComponent = place.address_components?.find((c: any) =>
    c.types.includes("locality")
  );
  const stateComponent = place.address_components?.find((c: any) =>
    c.types.includes("administrative_area_level_1")
  );
  const countryComponent = place.address_components?.find((c: any) =>
    c.types.includes("country")
  );

  const city = cityComponent?.long_name || null;
  const state = stateComponent?.short_name || null;
  const country =
    countryComponent?.short_name || countryComponent?.long_name || null;

  return {
    city,
    state,
    country,
    place_id: place.place_id,
    lat: place.geometry.location.lat,
    lng: place.geometry.location.lng,
  };
}
