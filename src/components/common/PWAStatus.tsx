import { useState, useEffect } from 'react';

const PWAStatus = () => {
  const [isPWA, setIsPWA] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check if running as installed PWA
    const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                  (window.navigator as any).standalone === true;
    setIsPWA(isPWA);

    // Check online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-white/80 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-lg shadow-md z-50 text-sm">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span>{isOnline ? 'Online' : 'Offline'}</span>
        {isPWA && (
          <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
            PWA
          </span>
        )}
      </div>
    </div>
  );
};

export default PWAStatus;