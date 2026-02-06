"use client";

import { usePathname } from "next/navigation";

import Header from "@/app/components/Header";
import SearchBar from "@/app/components/SearchBar";
import CategoryNav from "@/app/components/CategoryNav";
import Footer from "@/app/components/Footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Header />

      {isHome && (
        <>
          <SearchBar />
          <CategoryNav />
        </>
      )}

      <main className="pt-10 px-4">
        {children}
      </main>

      <Footer />
    </>
  );
}
