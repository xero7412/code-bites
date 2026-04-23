// FULL IMPLEMENTATION: LIVE STOCK TICKER (Polling + WebSocket + User Controls)
// React + TypeScript | Senior-level patterns

import React, { useEffect, useRef, useState, useCallback, memo } from 'react';

// ================= TYPES =================
type Stock = {
  symbol: string;
  price: number;
};

// {
//   "type": "PRICE_UPDATE",
//   "payload": {
//     "symbol": "AAPL",
//     "price": 182.10
//   }
// }

type StockMap = Record<string, Stock & { prevPrice?: number }>;

type Mode = 'polling' | 'socket' | 'stopped';

// ================= MOCK API =================
async function fetchStocks(): Promise<Stock[]> {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        { symbol: 'AAPL', price: Math.random() * 200 },
        { symbol: 'GOOG', price: Math.random() * 3000 },
        { symbol: 'MSFT', price: Math.random() * 400 }
      ]);
    }, 400);
  });
}

// ================= ROW COMPONENT =================
const StockRow = memo(function StockRow({ stock }: { stock: Stock & { prevPrice?: number } }) {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (stock.prevPrice !== undefined && stock.prevPrice !== stock.price) {
      setHighlight(true);
      const t = setTimeout(() => setHighlight(false), 1000);
      return () => clearTimeout(t);
    }
  }, [stock.price]);

  const direction =
    stock.prevPrice !== undefined
      ? stock.price > stock.prevPrice
        ? '🔼'
        : stock.price < stock.prevPrice
        ? '🔽'
        : ''
      : '';

  return (
    <div style={{ padding: 8, background: highlight ? '#e6fffa' : 'white' }}>
      {stock.symbol} - {stock.price.toFixed(2)} {direction}
    </div>
  );
});

// ================= MAIN COMPONENT =================
export default function StockTicker() {
  const [stocks, setStocks] = useState<StockMap>({});
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [mode, setMode] = useState<Mode>('polling');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // ================= UPDATE HELPER =================
  const upsertStocks = useCallback((incoming: Stock[]) => {
    setStocks((prev) => {
      const next = { ...prev };

      incoming.forEach((s) => {
        const existing = prev[s.symbol];
        next[s.symbol] = {
          ...s,
          prevPrice: existing?.price
        };
      });

      return next;
    });
  }, []);

  // ================= POLLING =================
  const startPolling = useCallback(() => {
    if (intervalRef.current) return;

    const poll = async () => {
      const data = await fetchStocks();
      upsertStocks(data);
    };

    poll();
    intervalRef.current = setInterval(poll, 3000);
  }, [upsertStocks]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // ================= WEBSOCKET =================
  const connectSocket = useCallback(() => {
    if (socketRef.current) return; // avoid duplicate connections

    const ws = new WebSocket('ws://localhost:3000/stocks');
    socketRef.current = ws;

    ws.onopen = () => {
      setIsSocketConnected(true);
      stopPolling();
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === 'PRICE_UPDATE') {
        upsertStocks([msg.payload]);
      }
    };

    ws.onclose = () => {
      socketRef.current = null;
      setIsSocketConnected(false);

      // only fallback if mode still wants socket
      if (mode === 'socket') {
        setTimeout(connectSocket, 3000);
      }
    };

    ws.onerror = () => {
      ws.close();
    };
  }, [upsertStocks, stopPolling, mode]);

  const stopSocket = useCallback(() => {
    socketRef.current?.close();
    socketRef.current = null;
    setIsSocketConnected(false);
  }, []);

  // ================= MODE EFFECT =================
  useEffect(() => {
    if (mode === 'polling') {
      stopSocket();
      startPolling();
    }

    if (mode === 'socket') {
      stopPolling();
      connectSocket();
    }

    if (mode === 'stopped') {
      stopPolling();
      stopSocket();
    }

    return () => {
      stopPolling();
      stopSocket();
    };
  }, [mode, startPolling, stopPolling, connectSocket, stopSocket]);

  // ================= RENDER =================
  const stockList = Object.values(stocks);

  return (
    <div>
      <h2>
        Stock Ticker ({mode.toUpperCase()} {isSocketConnected ? '- LIVE' : ''})
      </h2>

      {/* CONTROLS */}
      <div style={{ marginBottom: 12 }}>
        <button disabled={mode === 'polling'} onClick={() => setMode('polling')}>
          Start Polling
        </button>
        <button disabled={mode === 'socket'} onClick={() => setMode('socket')}>
          Start WebSocket
        </button>
        <button disabled={mode === 'stopped'} onClick={() => setMode('stopped')}>
          Stop All
        </button>
      </div>

      {/* LIST */}
      <div>
        {stockList.map((stock) => (
          <StockRow key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
}
