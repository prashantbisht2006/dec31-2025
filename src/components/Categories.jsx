import React from "react";
import { fetcher } from "@/lib/coingecko.actions";
import Data_Table from "./Data_Table";
import Image from "next/image";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { headers } from "next/headers";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react"; 



const Categories = async () => {
  const categories = await fetcher("coins/categories");
  const columns = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: (category) => category.name,
    },
    {
      header: "Top-Gainer",
      cellClassName: "top-gainers-cell",
      cell: (category) =>
        category.top_3_coins.map((coin) => (
          <Image key={coin} src={coin} alt={coin} width={28} height={28} />
        )),
    },
    {
      header: "Market cap",
      cellClassName: "market-cap-cell",
      cell: (category) => formatCurrency(category.market_cap),
    },
    {
  header: "24h Change",
  cellClassName: "name-cell",
  cell: (category) => {
    const change = category.market_cap_change_24h ?? 0;
    const isTrendingUp = change > 0;

    return (
      <div
        className={cn(
          "change-cell000",
          isTrendingUp ? "text-green-500" : "text-red-500"
        )}
      >
        <p className="flex items-center">
          {formatPercentage(change)}
          {isTrendingUp ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
        </p>
      </div>
    );
  },
}
,
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: (category) => formatCurrency(category.volume_24h),
    },
  ];
  return (
    <div id="categories" className="custom-scrollbar">
      <h4>Top Categories</h4>
      <Data_Table
        columns={columns}
        data={categories?.slice(0, 10) || []}
        rowKey={(_, index) => index}
        tableClassName="mt-3"
      />
      ;
    </div>
  );
};

export default Categories;
