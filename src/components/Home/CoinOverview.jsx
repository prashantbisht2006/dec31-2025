import React from "react";
import { fetcher } from "@/lib/coingecko.actions";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { CoinOverviewFallback } from "./Fallback";
import CandlestickCharts from "../CandlestickCharts";

const CoinOverview = async () => {
  try {
    const [coin, coinOHLCdata] = await Promise.all([
      await fetcher("coins/bitcoin", {
        dex_pair_format: "symbol",
      }),

      await fetcher("coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 1,
        
        precision: "full",
      }),
    ]);

    return (
      <div id="coin-overview">
        <CandlestickCharts data={coinOHLCdata} coinId="bitcoin">
          <div className="header pt-2">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={32}
              height={32}
            />

            <div className="info">
              <p>
                {coin.name} / {coin.symbol.toUpperCase()}
              </p>

              <h1>
                {formatCurrency(coin.market_data.current_price.usd)}
              </h1>
            </div>
          </div>
        </CandlestickCharts>
      </div>
    );
  } catch (error) {
    console.error("Error fetching coin overview:", error);
    return <CoinOverviewFallback />;
  }
};

export default CoinOverview;
