'use client';
 import  { useState } from 'react'
 import CandlestickCharts from './CandlestickCharts';
 import { Separator } from './ui/separator';
 
const CoinDetailLoader = ({coinId, coin,coinOHLCData}) => {
  const [liveInterval, setLiveInterval] = useState('1s');


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
      /> */}
      <Separator className="divider" />

      <div className="trend">
        <CandlestickCharts
          coinId={coinId}
            data={coinOHLCData} // 👈 RAW OHLC DATA
            height={360}
            initialPeriod="daily"
          
        >
          <h4>Trend Overview</h4>
        </CandlestickCharts>
      </div>
    </section>
   )
 }
 

 export default CoinDetailLoader;