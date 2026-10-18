/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface WavesLogoProps {
  size?: number;
  className?: string;
  showBox?: boolean;
}

/**
 * Proper Waves Logo Vector & Logo Box.
 * Features 3 fluid, harmonic wave crests (representing ocean swells, digital frequency, and AI velocity),
 * rendered with luminous gradients, glowing highlights, and precise hydrodynamic curves.
 */
export const WavesLogo: React.FC<WavesLogoProps> = ({ 
  size = 24, 
  className = '',
  showBox = true 
}) => {
  const icon = (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 28 28" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={!showBox ? className : ''}
    >
      <defs>
        {/* Luminous cyan-to-white wave gradient */}
        <linearGradient id="wv-crest-primary" x1="2" y1="9" x2="26" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#C4E4FF" />
          <stop offset="100%" stopColor="#7CC0FF" />
        </linearGradient>

        {/* Deep sky secondary wave gradient */}
        <linearGradient id="wv-crest-secondary" x1="2" y1="16" x2="26" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7CC0FF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#2F7BFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9BD1FF" stopOpacity="0.95" />
        </linearGradient>

        {/* Ambient bottom ripple gradient */}
        <linearGradient id="wv-crest-tertiary" x1="4" y1="21" x2="24" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9CD0FF" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#2F7BFF" stopOpacity="0.5" />
        </linearGradient>

        {/* Subtle drop glow for wave crests */}
        <filter id="wv-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#04122E" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Top Cresting Wave: Dynamic flowing sweep with crest peak */}
      <path
        d="M2.5 10 C 6 5.5, 9.5 5.5, 13.5 10 C 17.5 14.5, 21 14.5, 25.5 10"
        stroke="url(#wv-crest-primary)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#wv-glow)"
      />

      {/* Middle Harmonic Wave: Rich undulating swell echoing the top crest */}
      <path
        d="M2.5 16 C 6 11.8, 9.5 11.8, 13.5 16 C 17.5 20.2, 21 20.2, 25.5 16"
        stroke="url(#wv-crest-secondary)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom Supportive Ripple: Delicate grounding wave rhythm */}
      <path
        d="M5 21.5 C 8 18.5, 10.5 18.5, 13.5 21.5 C 16.5 24.5, 19 24.5, 23 21.5"
        stroke="url(#wv-crest-tertiary)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Leading Crest Droplet Accent (Apex highlight) */}
      <circle cx="13.5" cy="10" r="1.1" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );

  if (!showBox) {
    return icon;
  }

  return (
    <div className={`logo-box ${className}`} aria-hidden="true">
      {icon}
    </div>
  );
};

export default WavesLogo;
