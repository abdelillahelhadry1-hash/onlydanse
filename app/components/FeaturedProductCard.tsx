import Link from "next/link";

export default function FeaturedProductCard({ product }: { product: any }) {
  return (
    <Link
      href={`/shop/${product.id}`}
      className="min-w-[220px] bg-white rounded-xl shadow p-4 block"
    >
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600 text-sm mt-1">Dancing gear</p>
    </Link>
  );
}
