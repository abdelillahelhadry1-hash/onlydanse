import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json({ predictions: [] });
  }

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

  try {
    const res = await fetch(url);
    const data = await res.json();

    return NextResponse.json({
      predictions: data.predictions || [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch from Google Places API" },
      { status: 500 }
    );
  }
}
