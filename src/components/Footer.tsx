import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card ">
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Image src="/bg.svg" alt="BrandRadar" width={32} height={32} />
              <span className="font-semibold text-xl">BrandRadar</span>
            </div>
            <p className="text-muted-foreground text-center md:text-left">
              Track All Mentions of Your Brand & Competitors
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                Quick Links
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/data-explorer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Data Explorer
                </Link>
                <Link
                  href="/agent-analytics"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Agent Analytics
                </Link>
                <Link
                  href="/optimizations"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Optimizations
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Socials</h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Facebook
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Instagram
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  LinkedIn
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Twitter
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground border-t pt-8">
          Built by Roar Global | © 2025 BrandRadar. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
