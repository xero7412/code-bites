import React, { useEffect, useState, useRef } from "react";

type Stock = {
  symbol: string;
  price: number;
};

type StockMap = Record<string, Stock>;

export default function WebSocketTicker() {
  const [stocks, setStocks] = useState<StockMap>({});
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/stocks");
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("Connected");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "PRICE_UPDATE") {
        const stock: Stock = msg.payload;

        setStocks((prev) => ({
          ...prev,
          [stock.symbol]: stock,
        }));
      }
    };

    ws.onclose = () => {
      console.log("Disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h3>WebSocket Ticker</h3>
      {Object.values(stocks).map((s) => (
        <div key={s.symbol}>
          {s.symbol} - {s.price.toFixed(2)}
        </div>
      ))}
    </div>
  );
}
