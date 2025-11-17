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
      
      const contentType = res.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      let json: any = {};
      if (isJson) {
        try {
          const text = await res.text();
          json = text ? JSON.parse(text) : {};
        } catch (parseError) {
          throw new Error('Invalid JSON response from server');
        }
      } else {
        const text = await res.text();
        json = { message: text || 'Request failed' };
      }
      
      if (!res.ok) {
        throw new Error(json?.message || json?.error || "Request failed");
      }
      return json as T;
    } catch (e) {
      // Error is handled by caller, just return null
      return null;
    } finally {
      setLoading(false);
    }
  }
  return { request, loading };
}