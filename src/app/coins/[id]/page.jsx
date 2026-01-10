import React from "react";
import { fetcher } from "@/lib/coingecko.actions";
import { notFound } from "next/navigation";
import CandlestickCharts from "@/components/CandlestickCharts";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

const Page = async ({ params }) => {
  const { id } = await params;

  let coinData;
  let ohlcData;

  try {
    coinData = await fetcher(`/coins/${id}`, {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
    });
  } catch (error) {
    notFound();
  }
  console.log("Coin ID from route:", id);

  // market data
  try {
    ohlcData = await fetcher(`/coins/${id}/ohlc`, {
      vs_currency: "usd",
      days: 1,
    });
  } catch (e) {
    const errorBody = await response.json().catch(() => ({}));

    throw new Error(
      `API Error: ${response.status}: ${errorBody.error || response.statusText}`
    );
  }

  return (
    <main id="coin-detail-page">
      <section className="primary">
        <div id="coin-overview">
          <CandlestickCharts
            coinId={id}
            data={ohlcData} // 👈 RAW OHLC DATA
            height={360}
            initialPeriod="daily"
          >
            <div className="header pt-2">
              <Image
                src={coinData.image.large}
                alt={coinData.name}
                width={32}
                height={32}
              />

              <div className="info">
                <p>
                  {coinData.name} / {coinData.symbol.toUpperCase()}
                </p>

                <h1>
                  {formatCurrency(coinData.market_data.current_price.usd)}
                </h1>
              </div>
            </div>
          </CandlestickCharts>
        </div>
      </section>

      <section className="secondary">
        <h4>Coin details</h4>
      </section>
    </main>
  );
};

export default Page;
