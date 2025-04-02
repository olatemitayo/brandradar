"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiLoader,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface Topic {
  id: number;
  name: string;
  brandsDiscovered: number;
  lastUpdated: string;
}

interface TopicsTableProps {
  topics: Topic[];
  activeFilter: string;
}

type SortField = "name" | "brandsDiscovered" | "lastUpdated";
type SortDirection = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

// Custom hook for debounced value
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function TopicsTable({
  topics: initialTopics,
  activeFilter,
}: TopicsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredTopics = useMemo(() => {
    if (!debouncedSearchQuery) return initialTopics;

    const query = debouncedSearchQuery.toLowerCase();
    const numericQuery = parseInt(query);

    return initialTopics.filter((topic) => {
      // Check topic name
      if (topic.name.toLowerCase().includes(query)) {
        return true;
      }

      // Check brands discovered (exact match or includes)
      if (!isNaN(numericQuery)) {
        if (
          topic.brandsDiscovered === numericQuery ||
          topic.brandsDiscovered.toString().includes(query)
        ) {
          return true;
        }
      }

      // Check last updated date
      if (topic.lastUpdated.toLowerCase().includes(query)) {
        return true;
      }

      return false;
    });
  }, [initialTopics, debouncedSearchQuery]);

  const sortedTopics = useMemo(() => {
    return [...filteredTopics].sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === "brandsDiscovered") {
        return sortDirection === "asc"
          ? a.brandsDiscovered - b.brandsDiscovered
          : b.brandsDiscovered - a.brandsDiscovered;
      } else {
        return sortDirection === "asc"
          ? new Date(a.lastUpdated).getTime() -
              new Date(b.lastUpdated).getTime()
          : new Date(b.lastUpdated).getTime() -
              new Date(a.lastUpdated).getTime();
      }
    });
  }, [filteredTopics, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedTopics.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, sortedTopics.length);
  const currentTopics = sortedTopics.slice(startIndex, endIndex);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  // Show loading state when search is in progress
  useEffect(() => {
    if (searchQuery !== debouncedSearchQuery) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [searchQuery, debouncedSearchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
  };

  const buttonClasses = {
    base: "rounded-md transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20 focus-visible:ring-2 focus-visible:ring-white/20",
    icon: "h-8 w-8 flex items-center justify-center",
    ghost: "hover:bg-muted/50 text-muted-foreground",
    disabled: "opacity-50 cursor-not-allowed",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">{activeFilter}</h2>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm w-full">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search topics, brands, or dates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-[4.5rem] bg-muted/50 border-muted w-full"
          />
          {isLoading ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-7 ${buttonClasses.base}`}
              disabled
              aria-label="Loading"
            >
              <FiLoader className="h-4 w-4 animate-spin" />
            </Button>
          ) : searchQuery ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-7 ${buttonClasses.base}`}
              aria-label="Clear search"
            >
              <FiX className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-7 ${buttonClasses.base}`}
              disabled={!searchQuery}
              aria-label="Search"
            >
              <FiSearch className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[60px]">
                Index
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                <button
                  type="button"
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 hover:text-foreground"
                >
                  Topic Name
                  {sortField === "name" &&
                    (sortDirection === "asc" ? (
                      <FiChevronUp className="h-4 w-4" />
                    ) : (
                      <FiChevronDown className="h-4 w-4" />
                    ))}
                </button>
              </th>
              <th className="h-12 px-4 text-right whitespace-nowrap align-middle font-medium text-muted-foreground w-[150px]">
                <button
                  type="button"
                  onClick={() => handleSort("brandsDiscovered")}
                  className="flex items-center gap-1 ml-auto hover:text-foreground"
                >
                  Brands Discovered
                  {sortField === "brandsDiscovered" &&
                    (sortDirection === "asc" ? (
                      <FiChevronUp className="h-4 w-4" />
                    ) : (
                      <FiChevronDown className="h-4 w-4" />
                    ))}
                </button>
              </th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground w-[150px]">
                <button
                  type="button"
                  onClick={() => handleSort("lastUpdated")}
                  className="flex items-center gap-1 ml-auto hover:text-foreground"
                >
                  Last Updated
                  {sortField === "lastUpdated" &&
                    (sortDirection === "asc" ? (
                      <FiChevronUp className="h-4 w-4" />
                    ) : (
                      <FiChevronDown className="h-4 w-4" />
                    ))}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {currentTopics.map((topic) => (
              <tr
                key={topic.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td className="p-4 align-middle w-[60px] bg-muted">
                  {topic.id}
                </td>
                <td className="p-4 align-middle">{topic.name}</td>
                <td className="p-4 align-middle text-center w-[150px]">
                  {topic.brandsDiscovered}
                </td>
                <td className="p-4 align-middle text-end w-[150px]">
                  {topic.lastUpdated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground order-2 sm:order-1">
          {isLoading
            ? "Loading results..."
            : `Showing ${startIndex + 1} to ${endIndex} of ${
                sortedTopics.length
              } results`}
        </div>
        <div className="flex flex-wrap items-center gap-4 order-1 sm:order-2 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Rows per page:
            </span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="w-[70px] h-8">
                <SelectValue placeholder={rowsPerPage} />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1 ml-auto sm:ml-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || isLoading}
              className={`${buttonClasses.base} ${buttonClasses.icon} ${
                buttonClasses.ghost
              } ${(currentPage === 1 || isLoading) && buttonClasses.disabled}`}
              aria-label="First page"
            >
              <FiChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className={`${buttonClasses.base} ${buttonClasses.icon} ${
                buttonClasses.ghost
              } ${(currentPage === 1 || isLoading) && buttonClasses.disabled}`}
              aria-label="Previous page"
            >
              <FiChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className={`${buttonClasses.base} ${buttonClasses.icon} ${
                buttonClasses.ghost
              } ${
                (currentPage === totalPages || isLoading) &&
                buttonClasses.disabled
              }`}
              aria-label="Next page"
            >
              <FiChevronRight className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || isLoading}
              className={`${buttonClasses.base} ${buttonClasses.icon} ${
                buttonClasses.ghost
              } ${
                (currentPage === totalPages || isLoading) &&
                buttonClasses.disabled
              }`}
              aria-label="Last page"
            >
              <FiChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
