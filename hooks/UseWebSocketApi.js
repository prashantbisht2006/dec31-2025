import { useEffect, useRef, useState } from "react"




const WS_BASE = `${process.env.PUBLIC_WEBSOCKET_URL}?x-cg-demo-api-key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`;
export const UseWebSocketApi = (coinId , poolId, liveInterval) => {
    const wsRef = useRef(null);
    const subscribed = useRef(new Set()); 
    const [price, setPrice] = useState(null);
  const [trades, settrades] = useState([]);
  const [ohlcv, setOhlcv] = useState(null);
  const [isWsReady,setIsWsReady] = useState(false);

  useEffect(()=>{

  },[])
}
