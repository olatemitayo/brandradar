"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiLoader,
  FiX,
} from "react-icons/fi";

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

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

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

  const totalPages = Math.ceil(filteredTopics.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredTopics.length);
  const currentTopics = filteredTopics.slice(startIndex, endIndex);

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

      <div className="border border-muted rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50">
              <TableHead className="w-[60px] sm:w-20 text-muted-foreground">
                Index
              </TableHead>
              <TableHead className="text-muted-foreground min-w-[200px]">
                Topic Name
              </TableHead>
              <TableHead className="text-right text-muted-foreground min-w-[120px]">
                Brand Discovered
              </TableHead>
              <TableHead className="text-right text-muted-foreground min-w-[120px]">
                Last Updated
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <FiLoader className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : currentTopics.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              currentTopics.map((topic) => (
                <TableRow key={topic.id} className="hover:bg-muted/50">
                  <TableCell className="text-muted-foreground">
                    {topic.id}
                  </TableCell>
                  <TableCell className="font-medium">{topic.name}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {topic.brandsDiscovered}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {topic.lastUpdated}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground order-2 sm:order-1">
          {isLoading
            ? "Loading results..."
            : `Showing ${startIndex + 1} to ${endIndex} of ${
                filteredTopics.length
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
