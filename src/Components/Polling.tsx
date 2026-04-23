import React, { useEffect, useState, useRef } from "react";

type Stock = {
  symbol: string;
  price: number;
};

async function fetchStocks(): Promise<Stock[]> {
  return [
    { symbol: "AAPL", price: Math.random() * 200 },
    { symbol: "GOOG", price: Math.random() * 3000 },
  ];
}

export default function PollingTicker() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const poll = async () => {
      const data = await fetchStocks();
      setStocks(data);
    };

    poll(); // initial call
    intervalRef.current = setInterval(poll, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <h3>Polling Ticker</h3>
      {stocks.map((s) => (
        <div key={s.symbol}>
          {s.symbol} - {s.price.toFixed(2)}
        </div>
      ))}
    </div>
  );
}
