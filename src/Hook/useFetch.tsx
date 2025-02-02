import React from "react";


export const useFetch = <T,>(url: RequestInfo | URL, options?: RequestInit) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      //setLoading(true);
      setData(null);

      try {
        const res = await fetch(url, {
          signal: signal,
          ...optionsRef.current,
        });

        if (!res.ok) throw new Error(`Error : ${res.status}`);

        const json = (await res.json()) as T;

        if (!signal.aborted) setData(json);
      } catch (error) {
        if (!signal.aborted && error instanceof Error) setError(error.message);
        //console.log(error);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};
