import React from 'react';

interface OwlIconProps {
  size?: number;
  className?: string;
}

export default function OwlIcon({ size = 48, className = "" }: OwlIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Owl Body */}
      <ellipse
        cx="50"
        cy="65"
        rx="28"
        ry="26"
        fill="#1D9BF0"
        stroke="#0F7BC7"
        strokeWidth="2"
      />
      
      {/* Owl Head */}
      <circle
        cx="50"
        cy="40"
        r="24"
        fill="#1D9BF0"
        stroke="#0F7BC7"
        strokeWidth="2"
      />
      
      {/* Graduation Cap Base */}
      <ellipse
        cx="50"
        cy="20"
        rx="28"
        ry="6"
        fill="#1D9BF0"
        stroke="#0F7BC7"
        strokeWidth="1.5"
      />
      
      {/* Graduation Cap Top */}
      <rect
        x="35"
        y="15"
        width="30"
        height="8"
        fill="#1D9BF0"
        stroke="#0F7BC7"
        strokeWidth="1.5"
        rx="2"
      />
      
      {/* Graduation Cap Tassel */}
      <circle cx="62" cy="17" r="2" fill="#FFD34E"/>
      <path d="M62 19 L64 25 M60 19 L62 25 M64 19 L66 25" stroke="#FFD34E" strokeWidth="1.5" strokeLinecap="round"/>
      
      {/* Large Eyes - White Background */}
      <circle cx="42" cy="38" r="10" fill="white" stroke="#0F7BC7" strokeWidth="1.5"/>
      <circle cx="58" cy="38" r="10" fill="white" stroke="#0F7BC7" strokeWidth="1.5"/>
      
      {/* Eye Pupils - Large Blue Circles */}
      <circle cx="42" cy="38" r="7" fill="#1D9BF0"/>
      <circle cx="58" cy="38" r="7" fill="#1D9BF0"/>
      
      {/* Inner Pupils - Dark Centers */}
      <circle cx="42" cy="38" r="4" fill="#0F7BC7"/>
      <circle cx="58" cy="38" r="4" fill="#0F7BC7"/>
      
      {/* Eye Highlights */}
      <circle cx="44" cy="36" r="2" fill="white"/>
      <circle cx="60" cy="36" r="2" fill="white"/>
      
      {/* Small Eye Shine */}
      <circle cx="43" cy="39" r="1" fill="white" opacity="0.8"/>
      <circle cx="59" cy="39" r="1" fill="white" opacity="0.8"/>
      
      {/* Beak - Yellow Triangle */}
      <path
        d="M50 46 L46 52 L54 52 Z"
        fill="#FFD34E"
        stroke="#E6B800"
        strokeWidth="1"
      />
      
      {/* Chest/Belly - Light Blue */}
      <ellipse
        cx="50"
        cy="68"
        rx="18"
        ry="16"
        fill="#E8F4FD"
        opacity="0.9"
      />
      
      {/* Wings */}
      <ellipse
        cx="32"
        cy="58"
        rx="8"
        ry="16"
        fill="#0F7BC7"
        transform="rotate(-10 32 58)"
      />
      <ellipse
        cx="68"
        cy="58"
        rx="8"
        ry="16"
        fill="#0F7BC7"
        transform="rotate(10 68 58)"
      />
      
      {/* Wing Details */}
      <ellipse
        cx="32"
        cy="58"
        rx="5"
        ry="12"
        fill="#1D9BF0"
        transform="rotate(-10 32 58)"
      />
      <ellipse
        cx="68"
        cy="58"
        rx="5"
        ry="12"
        fill="#1D9BF0"
        transform="rotate(10 68 58)"
      />
      
      {/* Feet - Yellow Ovals */}
      <ellipse cx="44" cy="87" rx="6" ry="4" fill="#FFD34E" stroke="#E6B800" strokeWidth="1"/>
      <ellipse cx="56" cy="87" rx="6" ry="4" fill="#FFD34E" stroke="#E6B800" strokeWidth="1"/>
      
      {/* Cute Blush */}
      <ellipse cx="26" cy="44" r="3" fill="#FF9999" opacity="0.5"/>
      <ellipse cx="74" cy="44" r="3" fill="#FF9999" opacity="0.5"/>
    </svg>
  );
}