import React from 'react';
import { useOnlineStatus } from '../src/hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div 
      className="fixed bottom-20 left-4 z-50 flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-amber-200 bg-amber-950/80 border border-amber-500/40 backdrop-blur-md shadow-lg transition-all animate-bounce"
      role="status"
      aria-live="polite"
    >
      <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
      <span>Offline Mode — Cached for quick browsing</span>
    </div>
  );
};
