import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

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
      </section>

      <section className='w-full mt-7 space-y-4'>
        <p>Categories</p>
      </section>
    </main>
  )
}

export default page