import Link from "next/link";

export default function FeaturedEventCard({ event }: { event: any }) {
  // ⭐ Prevent rendering broken events (fixes /events/undefined)
  if (!event?.id) return null;

  // ⭐ Safe date formatting
  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(event.start_time));

  return (
    <Link
      href={`/events/${event.id}`}
      className="min-w-[260px] bg-white rounded-xl shadow p-4 block"
    >
      <h3 className="font-semibold text-lg">{event.name}</h3>

      <p className="text-gray-600 text-sm mt-1">
        {event.cities?.formatted_name ?? "Unknown location"}
      </p>

      <p className="text-gray-500 text-sm mt-2">
        {date}
      </p>
    </Link>
  );
}
