// app/events/page.tsx

import EventCard from "../components/EventCard";

export default async function EventsPage() {
  const cityId = "306e6fa3-e169-4eb8-925a-aada6cab3fe1"; // Toronto for now

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events?city_id=${cityId}`,
    { cache: "no-store" }
  );

  const events = await res.json();

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Events in Toronto</h1>

      {events.length === 0 && (
        <p className="text-gray-500">No events found.</p>
      )}

      <div className="space-y-4">
        {events.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

