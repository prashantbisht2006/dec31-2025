import { fetcher } from '@/lib/coingecko.actions';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingDown,TrendingUp } from 'lucide-react';

import { cn, formatPercentage, formatCurrency } from '@/lib/utils';
import Data_Table from '@/components/Data_Table';
import Coinpagination from '@/components/Coinpagination';
const Coins = async ({ searchParams }) => {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;
  const perPage = 10;

  const coinsData = await fetcher('/coins/markets', {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: perPage,
    page: currentPage,
    sparkline: 'false',
    price_change_percentage: '24h',
  });

  const columns= [
    {
      header: 'Rank',
      cellClassName: 'rank-cell',
      cell: (coin) => (
        <>
          #{coin.market_cap_rank}
          <Link href={`/coins/${coin.id}`} aria-label="View coin" />
        </>
      ),
    },
    {
      header: 'Token',
      cellClassName: 'token-cell',
      cell: (coin) => (
        <div className="token-info">
          <Image src={coin.image} alt={coin.name} width={36} height={36} />
          <p>
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
        </div>
      ),
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (coin) => formatCurrency(coin.current_price),
    },
    {
  header: '24h Change',
  cellClassName: 'change-cell',
  cell: (coin) => {
    // ✅ Determine trend direction
    const isTrendingUp = coin.price_change_percentage_24h > 0;

    return (
      <span
        className={cn(
          'change-value flex items-center gap-1', // ✅ align icon + text
          isTrendingUp ? 'text-green-600' : 'text-red-500'
        )}
      >
        {/* Show + sign for positive values */}
        {isTrendingUp && '+'}

        {/* Percentage value */}
        {formatPercentage(coin.price_change_percentage_24h)}

        {/* Trend icon */}
        {isTrendingUp ? (
          <TrendingUp size={16} />
        ) : (
          <TrendingDown size={16} />
        )}
      </span>
    );
  },
},

  ];

  const hasMorePages = coinsData.length === perPage;

  const estimatedTotalPages = currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;

  return (
    <main id="coins-page">
      <div className="content">
        <h4>All Coins</h4>

        <Data_Table
          tableClassName="coins-table"
          columns={columns}
          data={coinsData}
          rowKey={(coin) => coin.id}
        />

        <Coinpagination
  currentPage={currentPage}
  totalPages={estimatedTotalPages} // ✅ IMPORTANT
  hasMorePages={hasMorePages}
/>

      </div>
    </main>
  );
};

export default Coins;