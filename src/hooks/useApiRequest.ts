import { useState } from "react";

type Opts = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

export default function useApiRequest() {
  const [loading, setLoading] = useState(false);

  async function request<T = any>({ url, method = "GET", body, headers = {} }: Opts): Promise<T | null> {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include",
      });
      const text = await res.text();
      const json = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error((json as any)?.message || (json as any)?.error || "Request failed");
      return json as T;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setLoading(false);
    }
  }
  return { request, loading };
}