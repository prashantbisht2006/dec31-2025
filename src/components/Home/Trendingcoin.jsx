import React from "react";
import Image from "next/image";
import Data_Table from "@/components/Data_Table";

import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { fetcher } from "@/lib/coingecko.actions";
import { TrendingCoinsFallback } from "./Fallback";
import Link from "next/link";

const Trendingcoin = async () => {
  let trendingcoin;
  try{ trendingcoin = await fetcher("search/trending", undefined, 300);}
  catch (error) {
      console.error('Error fetching trending coins:', error);
      return <TrendingCoinsFallback />;
    }
  const columns = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: (coin) => {
        const items = coin.item;
        return (
          <Link href={`/coins/${items.id}`}>
            <Image src={items.large} alt={items.name} width={36} height={36} />
            <p>{items.name}</p>
          </Link>
        );
      },
    },

    {
      header: "24h Change",
      cellClassName: "name-cell",
      cell: (coin) => {
        const item = coin.item;

        const isTrendingUp = item.data.price_change_percentage_24h?.usd > 0;

        return (
          <div
            className={cn(
              "price-change",
              isTrendingUp ? "text-green-500" : "text-red-500"
            )}
          >
            <p className="flex items-center">
              {formatPercentage(
                item.data.price_change_percentage_24h?.usd || 0
              )}
              {isTrendingUp ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
            </p>
          </div>
        );
      },
    },

    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => formatCurrency(coin.item.data.price),
    },
  ];

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>

      <Data_Table
        columns={columns}
        data={trendingcoin.coins.slice(0, 6) || []}
        rowKey={(coin) => coin.item.id}
        tableClassname="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};

export default Trendingcoin;
