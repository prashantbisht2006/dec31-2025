import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import Data_Table from '@/components/Data_Table';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { TrendingUp,TrendingDown } from 'lucide-react';


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
  {
    item: {
      id: 'solana',
      name: 'Solana',
      large: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png',
      data: {
        price: 185,
      },
      data_price_change_percentage_24h: {
        usd: 4.87,
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
          <p>
            {
              isTrendingUp ? (<TrendingUp width={16} height={16}/>):
              (<TrendingDown width={16} height={16}/>)
            }
          </p>
        </div>
      );
    },
  },
  {
    header:'Price',
    cellClassName:'price-cell',
    cell:(coin)=>coin.item.data.price
  }
];


const page = () => {
  return (
    <main className='main-container'>
      <section className='home-grid'>
        <div id='coin-overview'>
          <div className='header'>
            <img
  src="https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
  alt="Bitcoin"
  width={32}
  height={32}
/>
<div className='info'>
  <p>Bitcoin / BTC</p>
  <h1>$80000</h1>

</div>



          </div>
        </div>
        <p>Coin Overview</p>

        <p>Trending Coins</p>
        <Data_Table 
  columns={columns}
  data={dummyData}
  rowKey={(coin) => coin.item.id}
  tableClassname='trending-coins-table'
/>

      </section>

      <section className='w-full mt-7 space-y-4'>
        <p>Categories</p>
      </section>
    </main>
  )
}

export default page