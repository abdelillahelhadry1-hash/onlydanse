export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${id}`;
  const res = await fetch(url, { cache: "no-store" });
  const event = res.ok ? await res.json() : null;

  if (!event) {
    return {
      title: "Event not found | OnlyDanse",
      description: "The event you're looking for doesn't exist.",
    };
  }

  return {
    title: `${event.name} | OnlyDanse`,
    description: event.description,
  };
}
