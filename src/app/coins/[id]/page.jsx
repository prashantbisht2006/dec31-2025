import React from "react";
import { fetcher } from "@/lib/coingecko.actions";
import { notFound } from "next/navigation";
import CandlestickCharts from "@/components/CandlestickCharts";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { timeAgo } from "@/lib/utils";
import Data_Table from "@/components/Data_Table";
import CoinDetailLoader from "@/components/CoinDetailLoader";


const Page = async ({ params }) => {
  const { id } = await params;

  const [coinData, ohlcData] = await Promise.all([
    await fetcher(`/coins/${id}`, {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
    }),
    await fetcher(`/coins/${id}/ohlc`, {
      vs_currency: "usd",
      days: 1,
    }),
  ]);

  // const selectedCurrency = coinData.
  const coinDetails = [
    {
      lable: "Market-Cap",
      value: formatCurrency(coinData.market_data.current_price.usd),
    },
    {
      lable: "Market Cap-Rank",
      value: `# ${coinData.market_cap_rank}`,
    },
    {
      lable: "Total Volume",
      value: formatCurrency(coinData.market_data.total_volume.usd),
    },
    {
      lable: "website",
      value: "-",
      link: coinData.links.homepage[0],
      linkText: "Homepage",
    },
    {
      lable: "Explorer",
      value: "-",
      link: coinData.links.blockchain_site[0],
      linkText: "Explorer",
    },
    {
      lable: "Community",
      value: "-",
      link: coinData.links.subreddit_url,
      linkText: "Community",
    },
  ];
  


  return (
    <main id= "coin-details-page">
      <section className="primary">
        <CoinDetailLoader coinId={id} coin={coinData} coinOHLCData={ohlcData}></CoinDetailLoader>
      </section>
    </main>
  );
};

export default Page;
