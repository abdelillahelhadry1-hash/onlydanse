import Link from "next/link";

export default function FeaturedInstructorCard({ instructor }: { instructor: any }) {
  // ⭐ Prevent broken links like /instructors/undefined
  if (!instructor?.id) return null;

  return (
    <Link
      href={`/instructors/${instructor.id}`}
      className="min-w-[220px] bg-white rounded-xl shadow p-4 block"
    >
      <h3 className="font-semibold">{instructor.name}</h3>
      <p className="text-gray-600 text-sm mt-1">Instructor</p>
    </Link>
  );
}
