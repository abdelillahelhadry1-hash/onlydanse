"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearchBar() {
  const router = useRouter();

  const [city, setCity] = useState("");
  const [danceStyle, setDanceStyle] = useState("");
  const [eventType, setEventType] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  // Auto-detect city
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setCity(data.city || "");
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ⭐ REAL AUTOCOMPLETE LOGIC
  useEffect(() => {
    if (city.length < 2) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    async function fetchCities() {
      try {
        const res = await fetch(`/api/cities/search?q=${city}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          setSuggestions([]);
          return;
        }

        const data = await res.json();
        setSuggestions(data || []);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setSuggestions([]);
        }
      }
    }

    fetchCities();
    return () => controller.abort();
  }, [city]);

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
    <div className="bg-white shadow-lg rounded-xl p-4 md:p-5 w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-center">

        {/* Dance Style */}
        <select
          value={danceStyle}
          onChange={(e) => setDanceStyle(e.target.value)}
          className="border rounded-lg p-3 text-gray-700 w-full md:w-40 bg-gray-50"
        >
          <option value="">Dance style</option>
          {danceStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>

        {/* Event Type */}
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="border rounded-lg p-3 text-gray-700 w-full md:w-40 bg-gray-50"
        >
          <option value="">Event type</option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Date Range */}
        <div className="relative w-full md:w-40">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="border rounded-lg p-3 text-gray-700 w-full text-left bg-gray-50"
          >
            {startDate && endDate
              ? `${new Date(startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })} → ${new Date(endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}`
              : "Date"}
          </button>

          {showDatePicker && (
