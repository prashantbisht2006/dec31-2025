"use client";
import React, { useState } from "react";
import { PERIOD_BUTTONS } from "../../Constant";

const CandlestickCharts = ({
  children,
  data,
  coinId,
  height = 360,
  initialPeriod = "daily",
}) => {
  const [period, setPeriod] = useState(initialPeriod);
  const [loading, setLoading] = useState(false);
  const HandlePeriodChange = (newPeriod) => {
    if (newPeriod === period) return;

    setPeriod(newPeriod);

    /////////////
  };

  return (
    <div id="candlestick-chart">
      <div className="chart-header">
        <div className="flex-1">{children}</div>

        <div className="butto-group">
          <span className="text-sm mx-2 font-medium text-blue-100/50">
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
    </div>
  );
};

export default CandlestickCharts;
