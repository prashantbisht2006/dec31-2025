'use client';

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/coins/${query.toLowerCase()}`);
      setQuery("");
    }
  };

  return (
    <header>
      <div className="main-container inner">
        {/* LEFT: LOGO */}
        <Link href="/">
          <Image
            src="/assets/icons/logo.PNG"
            alt="crypto-up logo"
            width={132}
            height={40}
            priority
          />
        </Link>

        

        {/* RIGHT: NAV */}
        <nav>
          <Link
            href="/"
            className={cn("nav-link", {
              "is-active": pathname === "/",
            })}
          >
            Home
          </Link>
          <div className="search-nav">
          <Input
            type="text"
            placeholder="Search coin (e.g. bitcoin, ethereum)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
        </div>

          <Link
            href="/coins"
            className={cn("nav-link", {
              "is-active": pathname === "/coins",
            })}
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
