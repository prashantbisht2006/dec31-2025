'use client';

import React from 'react';
import Data_Table from './Data_Table';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const Tradecolumn = ({ coin }) => {
  if (!coin) return <p>No data available</p>;

  // Map coin object to trades array
  const trades = [
    {
      price: coin.market_data.current_price.usd,
      amount: coin.market_data.total_volume.usd / coin.market_data.current_price.usd,
      market_cap: coin.market_data.market_cap.usd,
      price_change_24h: coin.market_data.price_change_percentage_24h,
      price_change_7d: coin.market_data.price_change_percentage_7d,
    },
  ];

  const tradeColumns = [
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (row) => formatCurrency(row.price, 'usd'),
    },
    {
      header: 'Amount',
      cellClassName: 'amount-cell',
      cell: (row) => row.amount?.toFixed(4) ?? '-',
    },
    {
      header: 'Market-Cap',
      cellClassName: 'market-cap',
      cell: (row) => formatCurrency(row.market_cap, 'usd'),
    },
    {
      header: '24h Status',
      cellClassName: '24h-status',
      cell: (row) => {
        if (row.price_change_24h == null) return '—';
        const isUp = row.price_change_24h >= 0;
        return (
          <span className={`flex items-center gap-1 font-medium ${isUp ? 'text-green-500' : 'text-red-500'}`}>
            {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {Math.abs(row.price_change_24h).toFixed(2)}%
          </span>
        );
      },
    },
    {
      header: '7D Status',
      cellClassName: '7d-status',
      cell: (row) => {
        if (row.price_change_7d == null) return '—';
        const isUp = row.price_change_7d >= 0;
        return (
          <span className={`flex items-center gap-1 font-medium ${isUp ? 'text-green-500' : 'text-red-500'}`}>
            {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {Math.abs(row.price_change_7d).toFixed(2)}%
          </span>
        );
      },
    },
  ];

  return (
    <div className="trades">
      <h4>Recent Trades</h4>
      <Data_Table
        columns={tradeColumns}
        data={trades} // ✅ Pass the array
        rowKey={(_, index) => index}
        tableClassName="trades-table"
      />
    </div>
  );
};

export default Tradecolumn;
