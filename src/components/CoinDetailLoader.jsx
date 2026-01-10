'use client';
 import  { useState } from 'react'
 import CandlestickCharts from './CandlestickCharts';
 import { Separator } from './ui/separator';
 import Data_Table from './Data_Table';
 import { formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Tradecolumn from './Tradecolumn';

 
const CoinDetailLoader = ({coinId, coin,coinOHLCData}) => {
  const [liveInterval, setLiveInterval] = useState('1s');
  // const trades = coin?.market_data
  // ? [
  //     {
  //       price: coin.market_data.current_price.usd,
  //       amount: coin.market_data.total_volume.usd / coin.market_data.current_price.usd,
  //       market_cap: coin.market_data.market_cap.usd,
  //       price_change_24h: coin.market_data.price_change_percentage_24h,
  //       price_change_7d: coin.market_data.price_change_percentage_7d,
  //     },
  //   ]
  // : [];

  
   


   return(
    <section id="live-data-wrapper">
{/* <CoinHeader
        name={coin.name}
        image={coin.image.large}
        livePrice={price?.usd ?? coin.market_data.current_price.usd}
        livePriceChangePercentage24h={
          price?.change24h ?? coin.market_data.price_change_percentage_24h_in_currency.usd
        }
        priceChangePercentage30d={coin.market_data.price_change_percentage_30d_in_currency.usd}
        priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
      />
      <Separator className="divider" /> */}

      <div className="trend">
        <CandlestickCharts
          coinId={coinId}
            data={coinOHLCData} 
            height={360}
            initialPeriod="daily"
          
        >
          <h4>Trend Overview</h4>
        </CandlestickCharts>
      </div>
      



       <Separator className="divider" />
       {coin && <Tradecolumn coin={coin} />}

      
    </section>
   )
 }
 

 export default CoinDetailLoader;