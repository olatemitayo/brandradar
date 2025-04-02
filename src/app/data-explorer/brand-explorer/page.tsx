import { Suspense } from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import BrandExplorerClient from "./BrandExplorerClient";

export default async function BrandExplorer() {
  return (
    <div>
      <div className="bg-gradient-to-b from-[#1e1b4b] to-background py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 overflow-x-auto whitespace-nowrap pb-2">
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

          <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-foreground">
            Brand Explorer
          </h1>
          <p className="text-muted-foreground mb-6">
            Marketing copy to be inserted here.
          </p>

          <Suspense fallback={<div>Loading...</div>}>
            <BrandExplorerClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
