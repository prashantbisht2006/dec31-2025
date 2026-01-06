import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Data_Table from '@/components/Data_Table';

import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { fetcher } from '@/lib/coingecko.actions';
import Link from 'next/link';

const dummyData = [
  {
    item: {
      id: 'bitcoin',
      name: 'Bitcoin',
      large: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png',
      data: {
        price: 80000,
      },
      data_price_change_percentage_24h: {
        usd: 2.45,
      },
    },
  },
  {
    item: {
      id: 'ethereum',
      name: 'Ethereum',
      large: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png',
      data: {
        price: 4200,
      },
      data_price_change_percentage_24h: {
        usd: -1.12,
      },
    },
  },
];

const columns = [
  {
    header: 'Name',
    cellClassName: 'name-cell',
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
    header: '24h Change',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;

      const isTrendingUp =
        item.data_price_change_percentage_24h.usd > 0;

      return (
        <div
          className={cn(
            'price-change',
            isTrendingUp ? 'text-green-500' : 'text-red-500'
          )}
        >
          {isTrendingUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        </div>
      );
    },
  },

  {
    header: 'Price',
    cellClassName: 'price-cell',
    cell: (coin) => coin.item.data.price,
  },
];

const page = async () => {

  // 👉 NO LEADING SLASH
  const coin = await fetcher('coins/bitcoin', {
    dex_pair_format: 'symbol'
  });

  console.log(coin);

  return (
    <main className='main-container'>
      <section className='home-grid'>
        <Data_Table
          columns={columns}
          data={dummyData}
          rowKey={(coin) => coin.item.id}
          tableClassname='trending-coins-table'
        />
      </section>
    </main>
  );
};

export default page;
