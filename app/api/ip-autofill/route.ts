export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    if (!data?.city || !data?.country_name) {
      return Response.json({ city: null, country: null });
    }

    return Response.json({
      city: data.city,
      country: data.country_name,
    });
  } catch (error) {
    return Response.json({ city: null, country: null });
  }
}
