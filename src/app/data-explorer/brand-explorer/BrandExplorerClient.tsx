"use client";

import { TopicsTable } from "@/components/TopicsTable";
import { generateMockData } from "@/utils/mockData";
import { useState, useEffect } from "react";

type FilterType = "All Brands" | "All Topics" | "All Prompts";

const FILTER_OPTIONS: FilterType[] = [
  "All Brands",
  "All Topics",
  "All Prompts",
];

interface Topic {
  id: number;
  name: string;
  brandsDiscovered: number;
  lastUpdated: string;
}

export default function BrandExplorerClient() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All Brands");

  useEffect(() => {
    setTopics(generateMockData(500));
  }, []);

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const buttonClasses = {
    base: "px-4 py-2 rounded-md transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20 focus-visible:ring-2 focus-visible:ring-white/20",
    active: "bg-white text-background",
    inactive: "bg-[#1e1e1e]/50 hover:bg-[#1e1e1e]/70 text-muted-foreground",
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {FILTER_OPTIONS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleFilterClick(filter)}
            className={`${buttonClasses.base} ${
              activeFilter === filter
                ? buttonClasses.active
                : buttonClasses.inactive
            }`}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <TopicsTable topics={topics} activeFilter={activeFilter} />
      </div>
    </>
  );
}
