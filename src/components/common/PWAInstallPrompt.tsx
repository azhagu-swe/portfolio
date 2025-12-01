import { useState, useEffect } from 'react';

declare global {
  interface WindowEventMap {
    'beforeinstallprompt': Event & {
      readonly platforms: string[];
      readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
      }>;
      prompt: () => Promise<void>;
    };
  }
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<WindowEventMap['beforeinstallprompt'] | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: WindowEventMap['beforeinstallprompt']) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Update UI to notify the user they can install the PWA
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Optionally, send analytics event with outcome of user choice
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Reset the deferred prompt
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  // Check if the app is already installed
  useEffect(() => {
    // Check if the app is already installed
    // Cast the navigator to any to access non-standard properties
    const isStandalone = (window.navigator as any).standalone || false;
    if (window.matchMedia('(display-mode: standalone)').matches || isStandalone) {
      setShowInstallButton(false);
    }
  }, []);

  if (!showInstallButton) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 hover:bg-blue-700 transition-colors"
      aria-label="Install PWA"
    >
      Install App
    </button>
  );
};

export default PWAInstallPrompt;