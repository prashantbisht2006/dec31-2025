import React from 'react';
import { fetcher } from '@/lib/coingecko.actions';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { CoinOverviewFallback } from './Fallback';
const CoinOverview = async () => {
  try {
    const coin = await fetcher("coins/bitcoin", {
      dex_pair_format: "symbol",
    });

    return (
      <div id="coin-overview">
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

        {/* <div className="chart">
          <CandlestickChart coinId={coin.id} />
        </div> */}
      </div>
    );

  } catch (error) {
    console.error('Error fetching coin overview:', error);
    return <CoinOverviewFallback />;
  }
};

export default CoinOverview;
