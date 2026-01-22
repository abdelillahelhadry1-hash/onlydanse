"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearchBar() {
  const router = useRouter();

  // Auto‑detected values
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [timezone, setTimezone] = useState("");

  // Filters
  const [danceStyle, setDanceStyle] = useState("");
  const [eventType, setEventType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Dance styles (priority first)
  const danceStyles = [
    "Bachata",
    "Salsa",
    "Kizomba",
    "Zouk",
    "Tango",
    "Ballroom",
    "Hip-Hop",
    "K-Pop",
    "Afro",
    "Other",
  ];

  const eventTypes = ["Event", "Workshop", "Class", "Festival"];

  // Auto-detect city, language, timezone
  useEffect(() => {
    setLanguage(navigator.language || "en");
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setCity(data.city || "");
        setCountry(data.country_name || "");
      })
      .catch(() => {});
  }, []);

  // Default date range: today → +7 days
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    setStartDate(today.toISOString().split("T")[0]);
    setEndDate(nextWeek.toISOString().split("T")[0]);
  }, []);

  // Build search URL
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (danceStyle) params.set("style", danceStyle);
    if (eventType) params.set("type", eventType);
    if (city) params.set("city", city);
    if (startDate) params.set("start", startDate);
    if (endDate) params.set("end", endDate);

    router.push(`/events?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-col items-center px-4 mt-10">
      {/* HERO TITLE */}
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">
        Find dance classes & events near you
      </h1>

      {/* SEARCH BOX */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl space-y-4">

        {/* Row 1: Dance Style + Event Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={danceStyle}
            onChange={(e) => setDanceStyle(e.target.value)}
            className="border rounded-lg p-3 w-full"
          >
            <option value="">Dance style (optional)</option>
            {danceStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="border rounded-lg p-3 w-full"
          >
            <option value="">Event type (optional)</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Row 2: Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-lg p-3 w-full mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">End date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-lg p-3 w-full mt-1"
            />
          </div>
        </div>

        {/* Row 3: Location */}
        <div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="border rounded-lg p-3 w-full"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
