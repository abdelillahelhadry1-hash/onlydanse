"use client";

import { usePathname } from "next/navigation";

import Header from "@/app/components/Header";
import SearchBar from "@/app/components/SearchBar";
import CategoryNav from "@/app/components/CategoryNav";
import Footer from "@/app/components/Footer";
import SearchModal from "@/app/components/SearchModal";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Header />
      <SearchModal />

      {/* Animated SearchBar */}
      <div
        className={`transition-all duration-300 ${
          isHome
            ? "mt-6 scale-100 opacity-100"
            : "mt-6 scale-95 opacity-95"   // ← FIXED: increased margin for compact mode
        }`}
      >
        <SearchBar compact={!isHome} />
      </div>

      {/* Sticky CategoryNav */}
      <CategoryNav />

      <main className="pt-10 px-4">
        {children}
      </main>

      <Footer />
    </>
  );
}
