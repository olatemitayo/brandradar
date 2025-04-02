import Image from "next/image";
import Link from "next/link";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[url(/footerbg.svg)] bg-no-repeat bg-cover  ">
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Image src="/bg.svg" alt="BrandRadar" width={32} height={32} />
              <span className="font-semibold text-xl">BrandRadar</span>
            </div>
            <p className="text-foreground text-sm text-center md:text-left">
              Track All Mentions of Your Brand & Competitors
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-sm">
            <div className="space-y-4">
              <h3 className=" font-semibold text-muted-foreground">
                Quick Links
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/data-explorer"
                  className="text-foreground hover:underline"
                >
                  Data Explorer
                </Link>
                <Link
                  href="/agent-analytics"
                  className="text-foreground hover:underline"
                >
                  Agent Analytics
                </Link>
                <Link
                  href="/optimizations"
                  className="text-foreground hover:underline"
                >
                  Optimizations
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className=" font-semibold text-muted-foreground">Socials</h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-foreground hover:underline"
                >
                  <IoLogoFacebook className="rounded-full" size={20} />
                  Facebook
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-foreground hover:underline"
                >
                  <FaInstagram size={20} />
                  Instagram
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-foreground hover:underline"
                >
                  <CiLinkedin size={20} />
                  LinkedIn
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-foreground hover:underline"
                >
                  <RiTwitterXFill size={20} />
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
