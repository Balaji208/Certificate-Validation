import React from 'react';

const CertificateValidationSVG = () => {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Enhanced matrix rain effect */}
        <pattern id="matrixBg" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="#000000"/>
          <g fill="#00ff00" opacity="0.15">
            <text x="5" y="20" fontSize="10">
              <animate
                attributeName="opacity"
                values="0.05;0.15;0.05"
                dur="3s"
                repeatCount="indefinite"
              />
              01
            </text>
            <text x="25" y="35" fontSize="14">
              <animate
                attributeName="opacity"
                values="0.15;0.05;0.15"
                dur="2s"
                repeatCount="indefinite"
              />
              CTF
            </text>
            <text x="10" y="45" fontSize="12">
              <animate
                attributeName="opacity"
                values="0.1;0.2;0.1"
                dur="4s"
                repeatCount="indefinite"
              />
              10
            </text>
          </g>
        </pattern>

        {/* Advanced circuit board pattern */}
        <pattern id="circuitPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="none"/>
          <path
            d="M10 10 H90 M10 50 H90 M10 90 H90 M10 10 V90 M50 10 V90 M90 10 V90"
            stroke="#00ff00"
            strokeWidth="0.5"
            opacity="0.1"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,200;200,0"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
          {/* Circuit nodes */}
          <circle cx="10" cy="10" r="2" fill="#00ff00" opacity="0.2">
            <animate
              attributeName="r"
              values="2;3;2"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="90" cy="10" r="2" fill="#00ff00" opacity="0.2"/>
          <circle cx="10" cy="90" r="2" fill="#00ff00" opacity="0.2"/>
          <circle cx="90" cy="90" r="2" fill="#00ff00" opacity="0.2"/>
        </pattern>

        {/* Enhanced cyber glow filter */}
        <filter id="cyberGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feFlood floodColor="#00ff00" floodOpacity="0.5"/>
          <feComposite in2="blur" operator="in"/>
          <feComposite in="SourceGraphic" operator="over"/>
          <feMorphology operator="dilate" radius="1"/>
        </filter>

        {/* Advanced scan line effect */}
        <linearGradient id="scanline" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 255, 0, 0)"/>
          <stop offset="50%" stopColor="rgba(0, 255, 0, 0.2)"/>
          <stop offset="100%" stopColor="rgba(0, 255, 0, 0)"/>
          <animate
            attributeName="y1"
            values="0%;100%;0%"
            dur="3s"
            repeatCount="indefinite"
          />
        </linearGradient>

        {/* Holographic effect */}
        <linearGradient id="holographic" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 255, 0, 0)">
            <animate
              attributeName="offset"
              values="0;1;0"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="20%" stopColor="rgba(0, 255, 0, 0.3)">
            <animate
              attributeName="offset"
              values="0;1;0"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="40%" stopColor="rgba(0, 255, 0, 0)">
            <animate
              attributeName="offset"
              values="0;1;0"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>

      {/* Main background with animated matrix effect */}
      <rect width="800" height="600" fill="url(#matrixBg)">
        <animate
          attributeName="opacity"
          values="0.8;1;0.8"
          dur="5s"
          repeatCount="indefinite"
        />
      </rect>

      {/* Main certificate container */}
      <g transform="translate(40, 30)">
        {/* Background frame with animated border */}
        <rect
          x="0"
          y="0"
          width="720"
          height="540"
          rx="15"
          fill="#000000"
          stroke="#00ff00"
          strokeWidth="2"
          filter="url(#cyberGlow)"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0,2000;2000,0"
            dur="10s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Animated circuit overlay */}
        <rect
          x="0"
          y="0"
          width="720"
          height="540"
          rx="15"
          fill="url(#circuitPattern)"
          opacity="0.1"
        >
          <animate
            attributeName="opacity"
            values="0.05;0.15;0.05"
            dur="5s"
            repeatCount="indefinite"
          />
        </rect>

        {/* CTF Logo and Header */}
        <g transform="translate(50, 40)">
          {/* Animated CTF Logo */}
          <g>
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="#00ff00"
              strokeWidth="3"
              filter="url(#cyberGlow)"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,220;220,0"
                dur="3s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 40 40"
                to="360 40 40"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
            <text
              x="40"
              y="50"
              textAnchor="middle"
              fontFamily="Monaco, monospace"
              fontSize="24"
              fontWeight="bold"
              fill="#00ff00"
              filter="url(#cyberGlow)"
            >
              CTF
            </text>
          </g>

          {/* Animated Title */}
          <g transform="translate(100, 0)">
            <text
              x="0"
              y="35"
              fontFamily="Arial"
              fontSize="28"
              fontWeight="bold"
              fill="#ffffff"
              filter="url(#cyberGlow)"
            >
              <tspan>DIGITAL CERTIFICATE</tspan>
            </text>
            <text
              x="0"
              y="60"
              fontFamily="Monaco, monospace"
              fontSize="16"
              fill="#00ff00"
            >
              SECURE VERIFICATION SYSTEM
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="2s"
                repeatCount="indefinite"
              />
            </text>
          </g>
        </g>

        {/* Advanced QR Code Section */}
        <g transform="translate(500, 150)">
          <rect
            width="170"
            height="170"
            rx="10"
            fill="#000000"
            stroke="#00ff00"
            strokeWidth="2"
            filter="url(#cyberGlow)"
          />
          
          {/* Scanning animation */}
          <rect
            width="170"
            height="4"
            fill="url(#scanline)"
          >
            <animate
              attributeName="y"
              values="0;170;0"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>

          {/* Dynamic QR Code elements */}
          <g transform="translate(20, 20)">
            {/* This would be replaced with actual QR code in production */}
            {Array(8).fill().map((_, i) => (
              Array(8).fill().map((_, j) => (
                <rect
                  key={`${i}-${j}`}
                  x={i * 16}
                  y={j * 16}
                  width="14"
                  height="14"
                  fill={Math.random() > 0.5 ? "#00ff00" : "none"}
                  opacity={Math.random() > 0.5 ? "1" : "0.5"}
                >
                  <animate
                    attributeName="opacity"
                    values="0.5;1;0.5"
                    dur={`${1 + Math.random() * 2}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))
            ))}
          </g>
        </g>

        {/* Certificate Details with Enhanced Animation */}
        <g transform="translate(50, 150)">
          {[
            {label: "CERTIFICATE ID", value: "CTF-2025-0492-8CV7"},
            {label: "ISSUE DATE", value: "January 16, 2025"},
            {label: "VALID UNTIL", value: "January 16, 2026"},
            {label: "SECURITY LEVEL", value: "MAXIMUM"}
          ].map((item, i) => (
            <g key={item.label} transform={`translate(0, ${i * 80})`}>
              <rect
                width="400"
                height="65"
                rx="8"
                fill="#0a0a0a"
                stroke="#00ff00"
                strokeWidth="1"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0,1000;1000,0"
                  dur="3s"
                  begin={`${i * 0.2}s`}
                  fill="freeze"
                />
              </rect>
              
              <text
                x="20"
                y="30"
                fontFamily="Monaco, monospace"
                fontSize="14"
                fill="#00ff00"
              >
                {item.label}
              </text>
              
              <text
                x="20"
                y="50"
                fontFamily="Monaco, monospace"
                fontSize="16"
                fill="#ffffff"
                filter="url(#cyberGlow)"
              >
                {item.value}
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </text>
            </g>
          ))}
        </g>

        {/* Advanced Verification Status Bar */}
        <g transform="translate(50, 480)">
          <rect
            width="620"
            height="40"
            rx="20"
            fill="#0a0a0a"
            stroke="#00ff00"
            strokeWidth="1"
            filter="url(#cyberGlow)"
          />
          
          <rect
            x="5"
            y="5"
            width="0"
            height="30"
            rx="15"
            fill="#00ff00"
            opacity="0.3"
          >
            <animate
              attributeName="width"
              values="0;610"
              dur="2s"
              fill="freeze"
            />
          </rect>

          <text
            x="310"
            y="25"
            textAnchor="middle"
            fontFamily="Monaco, monospace"
            fontSize="14"
            fill="#00ff00"
            filter="url(#cyberGlow)"
          >
            VERIFICATION COMPLETE • AUTHENTIC
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="2s"
              repeatCount="indefinite"
            />
          </text>
        </g>
      </g>

      {/* Enhanced Security Seal */}
      <g transform="translate(700, 40)">
        <circle
          r="35"
          fill="none"
          stroke="#00ff00"
          strokeWidth="2"
          filter="url(#cyberGlow)"
        >
          <animate
            attributeName="r"
            values="0;35"
            dur="1s"
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
          stroke="#00ff00"
          strokeWidth="3"
          fill="none"
          filter="url(#cyberGlow)"
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