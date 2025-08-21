import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const API_URL = "https://portfolio-util-ntv3.vercel.app/api/visitors";

const isBot = (userAgent: string): boolean => {
  return /bot|crawl|spider|slurp|googlebot|bingbot/i.test(userAgent);
};

interface VisitorCounts {
  uniqueVisitors: number | null;
  totalVisits: number | null;
}

interface VisitorContextType extends VisitorCounts {
  loading: boolean;
  error: string | null;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export const VisitorProvider = ({ children }: { children: ReactNode }) => {
  const [counts, setCounts] = useState<VisitorCounts>({
    uniqueVisitors: null,
    totalVisits: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && isBot(navigator.userAgent)) {
      setError("Bot traffic is not tracked.");
      setLoading(false);
      return;
    }

    const trackAndFetchCounts = async () => {
      try {
        const response = await fetch(API_URL, { method: "POST" });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch visitor data");
        }
        const data = await response.json();
        setCounts({
          uniqueVisitors: data.uniqueVisitors,
          totalVisits: data.totalVisits,
        });
      } catch (err: any) {
        setError("Could not load visitor stats.");
        console.error("API Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    trackAndFetchCounts();
  }, []);

  const value = { ...counts, loading, error };

  return (
    <VisitorContext.Provider value={value}>{children}</VisitorContext.Provider>
  );
};

export const useVisitorCounts = () => {
  const context = useContext(VisitorContext);
  if (context === undefined) {
    throw new Error("useVisitorCounts must be used within a VisitorProvider");
  }
  return context;
};
