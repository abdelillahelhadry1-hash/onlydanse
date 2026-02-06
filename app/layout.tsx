"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import SearchBar from "@/app/components/SearchBar";
import CategoryNav from "@/app/components/CategoryNav";
import Footer from "@/app/components/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">

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
      </body>
    </html>
  );
}
