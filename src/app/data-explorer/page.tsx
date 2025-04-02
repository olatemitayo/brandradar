"use client";

// import { TopicsTable } from "@/components/TopicsTable";

import { TopicsTable } from "@/components/TopicsTable";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { generateMockData } from "@/utils/mockData";
import { useState, useEffect } from "react";

type FilterType = "All Brands" | "All Topics" | "All Prompts";

interface Topic {
  id: number;
  name: string;
  brandsDiscovered: number;
  lastUpdated: string;
}

export default function DataExplorer() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All Topics");

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
    <div>
      <div className="bg-gradient-to-b from-[#1e1b4b] to-background py-6 sm:py-8 lg:py-9">
        <div className="container flex flex-col gap-6 mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <FiChevronRight className="h-4 w-4 flex-shrink-0" />
            <Link href="/data-explorer" className="hover:text-foreground">
              Data Explorer
            </Link>
            <FiChevronRight className="h-4 w-4 flex-shrink-0" />
            <span className="text-white">Brand Explorer</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Data Explorer
          </h1>
          <p className="text-muted-foreground ">
            Marketing copy to be inserted here.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => handleFilterClick("All Brands")}
              className={`${buttonClasses.base} ${
                activeFilter === "All Brands"
                  ? buttonClasses.active
                  : buttonClasses.inactive
              }`}
              aria-pressed={activeFilter === "All Brands"}
            >
              All Brands
            </button>
            <button
              type="button"
              onClick={() => handleFilterClick("All Topics")}
              className={`${buttonClasses.base} ${
                activeFilter === "All Topics"
                  ? buttonClasses.active
                  : buttonClasses.inactive
              }`}
              aria-pressed={activeFilter === "All Topics"}
            >
              All Topics
            </button>
            <button
              type="button"
              onClick={() => handleFilterClick("All Prompts")}
              className={`${buttonClasses.base} ${
                activeFilter === "All Prompts"
                  ? buttonClasses.active
                  : buttonClasses.inactive
              }`}
              aria-pressed={activeFilter === "All Prompts"}
            >
              All Prompts
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <TopicsTable topics={topics} activeFilter={activeFilter} />
      </div>
    </div>
  );
}
