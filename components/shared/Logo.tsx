
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full"></div>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
      >
        <path 
          d="M50 5L89.4019 27.5V72.5L50 95L10.5981 72.5V27.5L50 5Z" 
          fill="#000" 
          stroke="#0099ff" 
          strokeWidth="6"
        />
        <line x1="25" y1="45" x2="35" y2="45" stroke="#0099ff" strokeWidth="2" />
        <line x1="65" y1="45" x2="75" y2="45" stroke="#0099ff" strokeWidth="2" />
        <circle cx="30" cy="40" r="2" fill="#0099ff" />
        <circle cx="70" cy="40" r="2" fill="#0099ff" />
        <text 
          x="50" 
          y="58" 
          textAnchor="middle" 
          fill="#0099ff" 
          style={{ 
            fontFamily: 'monospace', 
            fontWeight: '900', 
            fontSize: '32px',
            letterSpacing: '-1px'
          }}
        >
          FA
        </text>
      </svg>
    </div>
  );
};

export default Logo;
