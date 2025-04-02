"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { FiSearch, FiMenu, FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/data-explorer", label: "Data Explorer" },
    { href: "/agent-analytics", label: "Agent Analytics" },
    { href: "/optimizations", label: "Optimizations" },
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/bg.svg" alt="BrandRadar" width={32} height={32} />
          <span className="font-semibold text-xl">BrandRadar</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                pathname.startsWith(item.href)
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent md:flex hidden border"
          >
            <FiSearch className="h-5 w-5" />
          </Button>
          <Button variant="default" className="hidden md:flex">
            + Topic
          </Button>

          <div className="flex items-center gap-2 ml-2 cursor-pointer">
            <div className="  flex flex-col items-center ">
              <span className="text-sm font-medium">Mustafa</span>
              <div className="text-sm">
                Credits:
                <span className="text-xs text-emerald-500"> 186</span>
              </div>
            </div>
            <FiChevronDown className="h-4 w-4" />
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <FiMenu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2 py-1.5 rounded-md hover:bg-accent transition-colors ${
                      pathname.startsWith(item.href)
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <hr className="border-border my-2" />
                <Button variant="default" className="w-full cursor-pointer">
                  + Topic
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FiSearch className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
