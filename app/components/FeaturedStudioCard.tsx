import Link from "next/link";

export default function FeaturedStudioCard({ studio }: { studio: any }) {
  // ⭐ Prevent broken links like /studios/undefined
  if (!studio?.id) return null;

  return (
    <Link
      href={`/studios/${studio.id}`}
      className="min-w-[220px] bg-white rounded-xl shadow p-4 block"
    >
      <h3 className="font-semibold">{studio.name}</h3>
      <p className="text-gray-600 text-sm mt-1">Studio</p>
    </Link>
  );
}
