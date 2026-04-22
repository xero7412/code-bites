import React, { useState, useRef, useCallback } from 'react';

const ITEM_HEIGHT = 20;
const CONTAINER_HEIGHT = 500;
const BUFFER = 5;
const INITIAL_COUNT = 10;

type Item = {
    id: number;
    title: string;
}

const generateItems = (start: number, count: number): Item[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: start + i,
        title: `Item ${start + i}`
    }));
}

const VirtualizedListV2 = () => {
    const [items, setItems] = useState<Item[]>(generateItems(0, INITIAL_COUNT));
    const [scrollTop, setScrollTop] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const isLoadingRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // ---- virtualization calculations ----
    const totalHeight = items.length * ITEM_HEIGHT;
    const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
    const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);
    const endIndex = Math.min(items.length - 1, startIndex + visibleCount + BUFFER);
    const visibleItems = items.slice(startIndex, endIndex + 1);

    // ---- fetch more ----
    const fetchMore = useCallback(async () => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);

        // simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const newItems = generateItems(items.length, 10);
        setItems(prev => [...prev, ...newItems]);

        isLoadingRef.current = false;
        setIsLoading(false);
    }, [items.length]);

    // ---- scroll handler ----
    const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        setScrollTop(scrollTop);

        // detect scroll end
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            fetchMore();
        }
    }, [fetchMore]);

    return (
        <div style={{ padding: 24 }}>
            <h2>Virtualized List ({items.length} items)</h2>
            <p>Rendering: items {startIndex} to {endIndex} of {items.length}</p>

            {/* scroll container */}
            <div
                ref={containerRef}
                onScroll={onScroll}
                style={{
                    height: CONTAINER_HEIGHT,
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: 8,
                    position: 'relative'
                }}
            >
                {/* inner div — full height so scrollbar is accurate */}
                <div style={{ height: totalHeight, position: 'relative' }}>
                    {visibleItems.map((item, i) => {
                        const actualIndex = startIndex + i;
                        return (
                            <div
                                key={item.id}
                                style={{
                                    position: 'absolute',
                                    top: actualIndex * ITEM_HEIGHT,
                                    height: ITEM_HEIGHT,
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0 16px',
                                    borderBottom: '1px solid #eee',
                                    backgroundColor: actualIndex % 2 === 0 ? '#fff' : '#f9f9f9',
                                    boxSizing: 'border-box'
                                }}
                            >
                                <span style={{ fontWeight: 'bold', marginRight: 12, color: '#999' }}>
                                    #{item.id}
                                </span>
                                {item.title}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* loading indicator */}
            {isLoading && (
                <div style={{
                    textAlign: 'center',
                    padding: 16,
                    color: '#666'
                }}>
                    Loading more items...
                </div>
            )}

            {/* debug info — useful during interview to show you know what's happening */}
            <div style={{ marginTop: 12, fontSize: 12, color: '#999' }}>
                scrollTop: {Math.round(scrollTop)}px |
                totalHeight: {totalHeight}px |
                rendering {endIndex - startIndex + 1} of {items.length} items
            </div>
        </div>
    )
}

export default VirtualizedListV2;