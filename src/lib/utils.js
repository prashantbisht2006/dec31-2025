import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}
export function formatPercentage(change) {
  if (change === null || change === undefined || isNaN(change)) {
    return "0.0%";
  }
  const formattedChange = change.toFixed(1);
  return `${formattedChange}%`;
}

// Trending up / down helper
export function trendingClasses(value) {
  const isTrendingUp = value > 0;

  return {
    textClass: isTrendingUp ? 'text-green-400' : 'text-red-400',
    bgClass: isTrendingUp ? 'bg-green-500/10' : 'bg-red-500/10',
    iconClass: isTrendingUp ? 'icon-up' : 'icon-down',
  };
}

// Time ago formatter
export function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} min`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''}`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''}`;

  // YYYY-MM-DD
  return past.toISOString().split('T')[0];
}

// Convert CoinGecko OHLC → lightweight-charts format
export function convertOHLCData(data = []) {
  return data
    .map((d) => ({
      time: d[0], // CoinGecko already provides UNIX seconds
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4],
    }))
    .filter(
      (item, index, arr) =>
        index === 0 || item.time !== arr[index - 1].time
    );
}

// Pagination helpers
export const ELLIPSIS = 'ellipsis';

export function buildPageNumbers(currentPage, totalPages) {
  const MAX_VISIBLE_PAGES = 5;
  const pages = [];

  if (totalPages <= MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) pages.push(ELLIPSIS);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) pages.push(ELLIPSIS);

  pages.push(totalPages);

  return pages;
}
