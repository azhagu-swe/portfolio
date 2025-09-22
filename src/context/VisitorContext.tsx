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

// Cache key for sessionStorage
const VISITOR_CACHE_KEY = "visitorCounts";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const VisitorProvider = ({ children }: { children: ReactNode }) => {
  const [counts, setCounts] = useState<VisitorCounts>({
    uniqueVisitors: null,
    totalVisits: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      // Server-side rendering
      setLoading(false);
      return;
    }

    if (isBot(navigator.userAgent)) {
      setError("Bot traffic is not tracked.");
      setLoading(false);
      return;
    }

    // Check if we have cached data that's still valid
    const cachedData = sessionStorage.getItem(VISITOR_CACHE_KEY);
    if (cachedData) {
      try {
        const { data, timestamp } = JSON.parse(cachedData);
        const now = Date.now();
        
        if (now - timestamp < CACHE_DURATION) {
          setCounts(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        // If parsing fails, we'll fetch fresh data
        console.warn("Failed to parse cached visitor data", e);
      }
    }

    const trackAndFetchCounts = async () => {
      try {
        const response = await fetch(API_URL, { 
          method: "POST",
          // Add a timeout to prevent hanging requests
          signal: AbortSignal.timeout(5000)
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to fetch visitor data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setCounts({
          uniqueVisitors: data.uniqueVisitors,
          totalVisits: data.totalVisits,
        });
        
        // Cache the data
        sessionStorage.setItem(
          VISITOR_CACHE_KEY, 
          JSON.stringify({
            data,
            timestamp: Date.now()
          })
        );
      } catch (err: any) {
        // If we have cached data, use it as fallback
        const cachedData = sessionStorage.getItem(VISITOR_CACHE_KEY);
        if (cachedData) {
          try {
            const { data } = JSON.parse(cachedData);
            setCounts(data);
          } catch (e) {
            // Ignore parsing errors
          }
        }
        
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
