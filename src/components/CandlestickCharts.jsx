"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { getChartConfig, PERIOD_BUTTONS, PERIOD_CONFIG,getCandlestickConfig } from "../../Constant";
import { convertOHLCData } from "@/lib/utils";
import { fetcher } from "@/lib/coingecko.actions";
import { createChart } from "lightweight-charts";
import { CandlestickSeries } from "lightweight-charts";

const CandlestickCharts = ({
  children,
  data,
  coinId,
  height = 360,
  initialPeriod = "daily",
}) => {
  const chartContainerRef = useRef(null);
  const chartAPI = useRef < import("lightweight-charts").IChartApi > null;
  const candleSeriesRef =
    useRef < import("lightweight-charts").ISeriesApi > null;
  const [period, setPeriod] = useState(initialPeriod);
  const [loading, setLoading] = useState(false);
  const [ohlcData, setOhlcData] = useState(data ?? []);
  const [isPending, startTransition] = useTransition();

  const fetchOHLCData = async (coinId, selectedPeriod = "daily") => {
    try {
      // get config from your constant file
      const config = PERIOD_CONFIG[selectedPeriod];

      const days = config?.days || 1;
      const interval = config?.interval || "daily";

      const newData = await fetcher(`/coins/${coinId}/ohlc`, {
        vs_currency: "usd",
        days,
        interval,
        precision: "full",
      });
      setOhlcData(newData ?? []);
    } catch (e) {
      console.error("Failed to fetch OHLC data:", e);

      return [];
    }
  };

  const HandlePeriodChange = (newPeriod) => {
    if (newPeriod === period) return;

    startTransition(async () => {
      setPeriod(newPeriod);
      await fetchOHLCData(newPeriod);
    });

    /////////////
  };
  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;
    const showTime = ["daily", "weekly", "monthly"].includes(period);

    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientwidth,
    });
    const series = chart.addSeries(CandlestickSeries, getCandlestickConfig());

    series.setData(convertOHLCData(ohlcData));
    chart.timeScale().fitContent();
  }, [height]);

  return (
    <div id="candlestick-chart">
      <div className="chart-header">
        <div className="flex-1">{children}</div>

        <div className="button-group">
          <span className="text-sm mx-2 font-medium text-blue-100/60">
            Period:
          </span>
          {PERIOD_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              className={
                period === value ? "config-buttton-active" : "config-button"
              }
              onClick={() => HandlePeriodChange(value)}
              disabled={loading}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} className="chart" style={{ height }} />
    </div>
  );
};

export default CandlestickCharts;
