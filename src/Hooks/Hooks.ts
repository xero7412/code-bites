import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {

  const getStoredValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(getStoredValue);

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.error("Error saving to localStorage", err);
    }
  };

  return [value, setStoredValue];
}

// const [theme, setTheme] = useLocalStorage("theme", "light");

// <button onClick={() => setTheme("dark")}>Dark Mode</button>

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer); // cleanup on change
    };
  }, [value, delay]);

  return debouncedValue;
}

// const [search, setSearch] = useState("");

// const debouncedSearch = useDebounce(search, 500);

// useEffect(() => {
//   if (debouncedSearch) {
//     fetch(`/api?q=${debouncedSearch}`);
//   }
// }, [debouncedSearch]);

import { useEffect } from "react";

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}

// const ref = useRef<HTMLDivElement>(null);

// useClickOutside(ref, () => setOpen(false));

// return <div ref={ref}>Dropdown</div>;

import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// const prevCount = usePrevious(count);

import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // cleanup
  }, [url]);

  return { data, loading, error };
}

// const { data, loading } = useFetch<User[]>("/api/users");

useEffect(() => {
    const controller = new AbortController();
  
    fetch(url, { signal: controller.signal });
  
    return () => {
      controller.abort(); // cleanup
    };
  }, []);


  import { useRef } from "react";

  export default function App() {
    const controllerRef = useRef<AbortController | null>(null);
  
    const handleFetch = async () => {
      // cancel previous request (if any)
      controllerRef.current?.abort();
  
      // create new controller
      const controller = new AbortController();
      controllerRef.current = controller;
  
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1",
          { signal: controller.signal }
        );
  
        const data = await res.json();
        console.log("Data:", data);
  
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Request aborted");
        } else {
          console.error(err);
        }
      }
    };
  
    // return (
    //   <div>
    //     <button onClick={handleFetch}>Fetch Data</button>
    //   </div>
    // );
  }

    // <div
    //     onDragOver={(e) => e.preventDefault()}
    //         onDrop={() => console.log("dropped")}>
    //         Drop here
    // </div>
