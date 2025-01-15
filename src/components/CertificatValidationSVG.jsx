import React from 'react';

const CertificateValidationSVG = () => {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Premium paper texture with darker theme */}
        <pattern id="premiumPaper" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#111827"/>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.1, 0 0 0 0 0.1, 0 0 0 0 0.1, 0 0 0 0.05 0"/>
          </filter>
          <rect width="100" height="100" filter="url(#noise)"/>
        </pattern>

        {/* Modern gradient with green accent */}
        <linearGradient id="elegantGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#064e3b"/>
          <stop offset="100%" stopColor="#10b981"/>
        </linearGradient>

        {/* Enhanced glow effect */}
        <filter id="subtleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feFlood floodColor="#10b981" floodOpacity="0.3"/>
          <feComposite in2="blur" operator="in"/>
          <feComposite in="SourceGraphic" operator="over"/>
        </filter>

        {/* Enhanced glass effect */}
        <filter id="glass">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
          <feOffset in="blur" dx="2" dy="2" result="offsetBlur"/>
          <feComponentTransfer in="offsetBlur" result="glow">
            <feFuncA type="linear" slope="0.4"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Metallic gradient with green tint */}
        <linearGradient id="metallicGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#064e3b"/>
          <stop offset="50%" stopColor="#059669"/>
          <stop offset="100%" stopColor="#064e3b"/>
        </linearGradient>

        {/* Shimmer effect */}
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(16, 185, 129, 0)">
            <animate attributeName="offset" values="0;1" dur="2s" repeatCount="indefinite"/>
          </stop>
          <stop offset="20%" stopColor="rgba(16, 185, 129, 0.2)">
            <animate attributeName="offset" values="0;1" dur="2s" repeatCount="indefinite"/>
          </stop>
          <stop offset="40%" stopColor="rgba(16, 185, 129, 0)">
            <animate attributeName="offset" values="0;1" dur="2s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
      </defs>

      {/* Dark elegant background */}
      <rect width="800" height="600" fill="#030712"/>

      {/* Main certificate container */}
      <g transform="translate(50, 30)">
        {/* Premium paper background with animation */}
        <rect
          x="0"
          y="0"
          width="700"
          height="540"
          rx="15"
          fill="url(#premiumPaper)"
          filter="url(#glass)"
        >
          <animate
            attributeName="opacity"
            values="0;1"
            dur="1s"
            fill="freeze"
          />
        </rect>

        {/* Animated decorative border */}
        <rect
          x="10"
          y="10"
          width="680"
          height="520"
          rx="10"
          fill="none"
          stroke="url(#metallicGradient)"
          strokeWidth="2"
          opacity="0.7"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0,2400;2400,0"
            dur="3s"
            fill="freeze"
          />
        </rect>

        {/* Header section with shimmer */}
        <g transform="translate(50, 40)">
          <rect
            x="0"
            y="0"
            width="600"
            height="100"
            rx="8"
            fill="#1f2937"
            filter="url(#glass)"
          />
          
          {/* Animated company logo */}
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="url(#elegantGradient)"
            filter="url(#subtleGlow)"
          >
            <animate
              attributeName="r"
              values="0;30"
              dur="1s"
              fill="freeze"
            />
          </circle>

          <text
            x="120"
            y="45"
            fontFamily="Arial"
            fontSize="24"
            fontWeight="bold"
            fill="#f9fafb"
          >
            Certificate of Authenticity
            <animate
              attributeName="opacity"
              values="0;1"
              dur="1.5s"
              fill="freeze"
            />
          </text>

          <text
            x="120"
            y="70"
            fontFamily="Arial"
            fontSize="14"
            fill="#9ca3af"
          >
            Digital Verification System
          </text>
        </g>

        {/* Enhanced QR Code section */}
        <g transform="translate(500, 170)">
          <rect
            width="150"
            height="150"
            rx="8"
            fill="#1f2937"
            filter="url(#glass)"
          />
          
          {/* Animated QR code */}
          <g transform="translate(15, 15)">
            {Array(10).fill().map((_, i) => (
              Array(10).fill().map((_, j) => (
                <rect
                  key={`${i}-${j}`}
                  x={i * 12}
                  y={j * 12}
                  width="10"
                  height="10"
                  fill={Math.random() > 0.5 ? "#10b981" : "none"}
                >
                  <animate
                    attributeName="opacity"
                    values="0;1"
                    dur="0.05s"
                    begin={`${(i + j) * 0.05}s`}
                    fill="freeze"
                  />
                </rect>
              ))
            ))}
            
            {/* Enhanced scanning effect */}
            <rect
              width="120"
              height="3"
              fill="url(#elegantGradient)"
              opacity="0.7"
            >
              <animate
                attributeName="y"
                values="0;120;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
          </g>
        </g>

        {/* Verification details with fade-in animation */}
        <g transform="translate(50, 170)">
          {["Document ID", "Issue Date", "Expiry Date", "Security Level"].map((label, i) => (
            <g key={label} transform={`translate(0, ${i * 70})`}>
              <rect
                width="400"
                height="60"
                rx="8"
                fill="#1f2937"
                filter="url(#glass)"
              >
                <animate
                  attributeName="opacity"
                  values="0;1"
                  dur="0.5s"
                  begin={`${i * 0.2}s`}
                  fill="freeze"
                />
              </rect>
              
              <text
                x="20"
                y="25"
                fontFamily="Arial"
                fontSize="14"
                fill="#9ca3af"
              >
                {label}
              </text>
              
              <text
                x="20"
                y="45"
                fontFamily="Arial"
                fontSize="16"
                fontWeight="bold"
                fill="#f9fafb"
              >
                {i === 0 && "DOC-2025-0492-8CV7"}
                {i === 1 && "January 15, 2025"}
                {i === 2 && "January 15, 2026"}
                {i === 3 && "Level A+ (Premium)"}
              </text>
            </g>
          ))}
        </g>

        {/* Enhanced validation progress */}
        <g transform="translate(50, 480)">
          <rect
            width="600"
            height="40"
            rx="20"
            fill="#1f2937"
            filter="url(#glass)"
          />
          
          <rect
            x="5"
            y="5"
            width="590"
            height="30"
            rx="15"
            fill="#374151"
          />
          
          <rect
            x="5"
            y="5"
            width="0"
            height="30"
            rx="15"
            fill="url(#elegantGradient)"
          >
            <animate
              attributeName="width"
              values="0;590"
              dur="2s"
              fill="freeze"
            />
          </rect>

          <text
            x="300"
            y="25"
            textAnchor="middle"
            fontFamily="Arial"
            fontSize="14"
            fontWeight="bold"
            fill="#f9fafb"
          >
            Verification Complete
          </text>
        </g>
      </g>

      {/* Enhanced verification seal */}
      <g transform="translate(650, 50)">
        <circle
          r="40"
          fill="#1f2937"
          filter="url(#glass)"
        >
          <animate
            attributeName="r"
            values="0;40"
            dur="1s"
            fill="freeze"
          />
        </circle>
        
        <circle
          r="35"
          fill="none"
          stroke="url(#elegantGradient)"
          strokeWidth="3"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0,220;220,0"
            dur="2s"
            fill="freeze"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
        
        <path
          d="M-15,0 L-5,10 L15,-10"
          stroke="url(#elegantGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0,50;50,0"
            dur="1s"
            fill="freeze"
          />
        </path>
      </g>
    </svg>
  );
};

export default CertificateValidationSVG;