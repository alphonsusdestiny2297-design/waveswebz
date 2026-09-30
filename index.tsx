/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Global guard against browser extension unhandled rejections (e.g. MetaMask, Web3 wallet injectors)
if (typeof window !== 'undefined') {
  const isExtensionError = (msg?: string, src?: string): boolean => {
    const text = (msg || '').toLowerCase();
    const source = (src || '').toLowerCase();
    return (
      text.includes('metamask') ||
      text.includes('ethereum') ||
      text.includes('wallet') ||
      text.includes('failed to connect') ||
      source.includes('chrome-extension') ||
      source.includes('moz-extension')
    );
  };

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const reason = event?.reason;
      const msg = reason?.message || reason?.stack || String(reason || '');
      if (isExtensionError(msg)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'error',
    (event) => {
      const msg = event?.message || '';
      const src = event?.filename || '';
      if (isExtensionError(msg, src)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class RootErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = { hasError: false, errorMessage: '' };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message || 'An unexpected error occurred' };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('RootErrorBoundary caught error:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#040914] text-[#F2F7FF] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-2xl border border-[rgba(34,228,255,0.3)] bg-[rgba(255,255,255,0.03)] backdrop-blur-xl shadow-2xl">
            <div className="text-3xl font-display font-black text-[#22E4FF] mb-2 uppercase tracking-wider">
              Waves
            </div>
            <p className="text-sm text-[#CBD7EC] mb-6">
              Application recovered safely. Please refresh to continue.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="cta w-full"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>
);