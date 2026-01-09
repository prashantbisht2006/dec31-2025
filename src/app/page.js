import React from "react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import CoinOverview from "@/components/Home/CoinOverview";
import Trendingcoin from "@/components/Home/Trendingcoin";
import Categories from "@/components/Categories";
import {
  CategoriesFallback,
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "@/components/home/Fallback";
const page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <Trendingcoin />
        </Suspense>
      </section>
      <section className="w-full mt-7 space-y-4">
        <Suspense fallback={<CategoriesFallback/>}>
          <Categories />
        </Suspense>
      </section>
    </main>
  );
};

export default page;
