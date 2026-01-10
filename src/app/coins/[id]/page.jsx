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
import Converter from "@/components/Converter";
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Tradecolumn from '@/components/Tradecolumn';

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
   const tradeColumns = [
      {
        header: "Price",
        cellClassName: "price-cell",
        cell: (coinData) =>
          formatCurrency(coinData.market_data.current_price.usd, "usd"),
      },
      {
        header: "Amount",
        cellClassName: "amount-cell",
        cell: (coinData) => coinData.amount?.toFixed(4) ?? "-",
      },
      {
        header: "Market-Cap",
        cellClassName: "market-cap",
        cell: (coinData) =>
          formatCurrency(coinData.market_data.market_cap.usd, "usd"),
      },
      {
        header: "24h Status",
        cellClassName: "24h-status",
        cell: (coinData) => {
          const value = coinData?.price_change_percentage_24h;
  
          if (value == null) return "—";
  
          const isUp = value >= 0;
  
          return (
            <span
              className={`flex items-center gap-1 font-medium ${
                isUp ? "text-green-500" : "text-red-500"
              }`}
            >
              {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {Math.abs(value).toFixed(2)}%
            </span>
          );
        },
      },
      {
        header: "7D Status",
        cellClassName: "7d-status",
        cell: (coinData) => {
          const value = coinData?.price_change_percentage_7d;
  
  
          if (value == null) return "—";
  
          const isUp = value >= 0;
  
          return (
            <span
              className={`flex items-center gap-1 font-medium ${
                isUp ? "text-green-500" : "text-red-500"
              }`}
            >
              {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {Math.abs(value).toFixed(2)}%
            </span>
          );
        },
      },
    ];
  
    
 

  return (
    
<div>
  {/* <section id="live-data-wrapper">

  <Tradecolumn coin={coinData} />
    </section> */}


    <main id="coin-details-page">
      <section className="primary">
        <CoinDetailLoader
          coinId={id}
          coin={coinData}
          coinOHLCData={ohlcData}
        ></CoinDetailLoader>
      </section>

      <section className="secondary">
        <Converter
          symbol={coinData.symbol}
          icon={coinData.image.small}
          priceList={coinData.market_data.current_price.usd}
        />
         <div className="details">
          <h4>Coin Details</h4>

          <ul className="details-grid">
            {coinDetails.map(({ lable, value, link, linkText }, index) => (
              <li key={index}>
                <p className={lable}>{lable}</p>

                {link ? (
                  <div className="link">
                    <Link href={link} target="_blank">
                      {linkText || lable}
                    </Link>
                    <ArrowUpRight size={16} />
                  </div>
                ) : (
                  <p className="text-base font-medium">{value}</p>
                )}
              </li>
            ))}
          </ul>
    

        </div>
      </section>
      <Separator className="divider" />
      
    </main>
    </div>
  );
};

export default Page;
