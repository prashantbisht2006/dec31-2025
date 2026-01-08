"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  getCandlestickConfig,
  getChartConfig,
  PERIOD_BUTTONS,
  PERIOD_CONFIG,
} from "../../Constant";
import { createChart, CandlestickSeries } from "lightweight-charts";
import { fetcher } from "@/lib/coingecko.actions";
import { convertOHLCData } from "@/lib/utils";

const CandlestickCharts = ({
  children,
  data,
  coinId,
  height = 360,
  initialPeriod = "daily", // 🔧 FIX 1: must match PERIOD_CONFIG keys
}) => {
  /* ===================== REFS ===================== */
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const prevOhlcLengthRef = useRef(data?.length || 0);

  /* ===================== STATE ===================== */
  const [period, setPeriod] = useState(initialPeriod);
  const [ohlcData, setOhlcData] = useState(data ?? []);
  const [isPending, startTransition] = useTransition();

  /* ===================== FETCH OHLC DATA ===================== */
  const fetchOHLCData = async (selectedPeriod) => {
    try {
      const config = PERIOD_CONFIG[selectedPeriod];
      if (!config) return;

      console.log("Selected period:", selectedPeriod);
      console.log("Days:", config.days);

      // ✅ CoinGecko OHLC supports ONLY days
      const newData = await fetcher(`/coins/${coinId}/ohlc`, {
        vs_currency: "usd",
        days: config.days,
      });

      startTransition(() => {
        setOhlcData(newData ?? []);
      });
    } catch (e) {
      console.error("Failed to fetch OHLC data:", e);
    }
  };

  /* ===================== PERIOD CHANGE ===================== */
  const handlePeriodChange = (newPeriod) => {
    if (newPeriod === period) return;
    setPeriod(newPeriod);
    fetchOHLCData(newPeriod);
  };

  /* ===================== CREATE CHART (ONCE) ===================== */
  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const showTime = ["daily", "weekly", "monthly"].includes(period);

    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
    });

    const series = chart.addSeries(
      CandlestickSeries,
      getCandlestickConfig()
    );

    chartRef.current = chart;
    candleSeriesRef.current = series;

    if (ohlcData.length) {
      const converted = convertOHLCData(
        ohlcData.map((d) => [
          Math.floor(d[0] / 1000),
          d[1],
          d[2],
          d[3],
          d[4],
        ])
      );
      series.setData(converted);
      chart.timeScale().fitContent();
    }

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      chart.applyOptions({ width: entries[0].contentRect.width });
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      chart.remove();
    };
  }, [height]);

  /* ===================== UPDATE DATA ===================== */
  useEffect(() => {
    if (!candleSeriesRef.current || !ohlcData.length) return;

    const converted = convertOHLCData(
      ohlcData.map((d) => [
        Math.floor(d[0] / 1000),
        d[1],
        d[2],
        d[3],
        d[4],
      ])
    );

    candleSeriesRef.current.setData(converted);

    if (prevOhlcLengthRef.current !== ohlcData.length) {
      chartRef.current?.timeScale().fitContent();
      prevOhlcLengthRef.current = ohlcData.length;
    }
  }, [ohlcData]);

  /* ===================== UPDATE TIME SCALE ===================== */
  useEffect(() => {
    if (!chartRef.current) return;

    const showTime = ["daily", "weekly", "monthly"].includes(period);

    chartRef.current.applyOptions({
      timeScale: {
        timeVisible: showTime,
        secondsVisible: period === "daily",
      },
    });
  }, [period]);

  /* ===================== RENDER ===================== */
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
                period === value
                  ? "config-button-active"
                  : "config-button"
              }
              onClick={() => handlePeriodChange(value)}
              disabled={isPending}
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
