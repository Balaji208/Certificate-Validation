import React from 'react';

const CertificateValidationSVG = () => {
  // Helper function to generate matrix text
  const getMatrixText = () => Math.random() > 0.5 ? "CTF" : Math.random() > 0.5 ? "01" : "10";
  
  // Helper function to get random duration
  const getRandomDuration = () => 2 + Math.random() * 3;
  
  // Helper function to get random opacity
  const getRandomOpacity = () => 0.1 + Math.random() * 0.2;

  // Certificate details data
  const certificateDetails = [
    {label: "CERTIFICATE ID", value: "CTF-2025-0492-8CV7", icon: "🔒"},
    {label: "ISSUE DATE", value: "January 16, 2025", icon: "📅"},
    {label: "VALID UNTIL", value: "January 16, 2026", icon: "⏳"},
    {label: "SECURITY LEVEL", value: "MAXIMUM [A+]", icon: "🛡️"}
  ];

  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Enhanced 3D matrix background with depth */}
        <pattern id="matrixBg" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect width="60" height="60" fill="#050505"/>
          {Array(6).fill().map((_, i) => (
            Array(4).fill().map((_, j) => (
              <text
                key={`matrix-${i}-${j}`}
                x={i * 10}
                y={15 + j * 15}
                fontSize={8 + Math.random() * 4}
                fill="#00ff00"
                opacity={getRandomOpacity()}
                filter="url(#matrixGlow)"
              >
                {getMatrixText()}
                <animate
                  attributeName="opacity"
                  values={`${getRandomOpacity()};${0.3 + Math.random() * 0.2};${getRandomOpacity()}`}
                  dur={`${getRandomDuration()}s`}
                  repeatCount="indefinite"
                />
              </text>
            ))
          ))}
        </pattern>

        {/* Ultra-realistic circuit board pattern */}
        <pattern id="circuitPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <rect width="120" height="120" fill="none"/>
          <path
            d="M10 10 Q60 10 60 60 T110 110 M10 110 Q10 60 60 60 T110 10"
            stroke="#0f0"
            strokeWidth="0.7"
            fill="none"
            opacity="0.15"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,500;500,0"
              dur="15s"
              repeatCount="indefinite"
            />
          </path>
          {Array(4).fill().map((_, i) => (
            Array(4).fill().map((_, j) => (
              <circle
                key={`node-${i}-${j}`}
                cx={10 + i * 35}
                cy={10 + j * 35}
                r="1.5"
                fill="#0f0"
                opacity="0.2"
              >
                <animate
                  attributeName="r"
                  values="1.5;2.5;1.5"
                  dur={`${2 + Math.random() * 2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.2;0.4;0.2"
                  dur={`${1 + Math.random() * 2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))
          ))}
        </pattern>

        {/* Enhanced cyber glow with depth */}
        <filter id="cyberGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur1"/>
          <feGaussianBlur stdDeviation="4" result="blur2"/>
          <feFlood floodColor="#00ff00" floodOpacity="0.5" result="color1"/>
          <feFlood floodColor="#00cc00" floodOpacity="0.3" result="color2"/>
          <feComposite in="color1" in2="blur1" operator="in" result="glow1"/>
          <feComposite in="color2" in2="blur2" operator="in" result="glow2"/>
          <feMerge>
            <feMergeNode in="glow2"/>
            <feMergeNode in="glow1"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Matrix-style text glow */}
        <filter id="matrixGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur"/>
          <feFlood floodColor="#00ff00" floodOpacity="0.3"/>
          <feComposite in2="blur" operator="in"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Advanced holographic effect */}
        <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 255, 0, 0)">
            <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite"/>
          </stop>
          <stop offset="10%" stopColor="rgba(0, 255, 0, 0.3)">
            <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite"/>
          </stop>
          <stop offset="20%" stopColor="rgba(0, 255, 0, 0)">
            <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>

        {/* Realistic scan line with noise */}
        <filter id="scanlineNoise">
          <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0, 0 1 0 0 0, 0 0 0 0 0, 0 0 0 0.3 0"/>
        </filter>
      </defs>

      {/* Main background */}
      <rect width="800" height="600" fill="#020202"/>
      <rect width="800" height="600" fill="url(#matrixBg)" opacity="0.8">
        <animate attributeName="opacity" values="0.7;0.9;0.7" dur="7s" repeatCount="indefinite"/>
      </rect>

      {/* Main certificate container */}
      <g transform="translate(40, 30)">
        {/* Layered background */}
        <rect x="5" y="5" width="720" height="540" rx="15" fill="#0a0a0a" opacity="0.7"/>
        <rect
          x="0"
          y="0"
          width="720"
          height="540"
          rx="15"
          fill="#000000"
          stroke="url(#holoGradient)"
          strokeWidth="2"
          filter="url(#cyberGlow)"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0,2500;2500,0"
            dur="15s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Circuit overlay */}
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
            values="0.08;0.12;0.08"
            dur="7s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Logo and Header */}
        <g transform="translate(50, 40)">
          {/* CTF Logo */}
          <g>
            <circle cx="40" cy="40" r="38" fill="none" stroke="#004400" strokeWidth="1"/>
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="#00ff00"
              strokeWidth="2"
              filter="url(#cyberGlow)"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,220;220,0"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <path
              d="M40 10 L70 40 L40 70 L10 40 Z"
              fill="none"
              stroke="#00ff00"
              strokeWidth="1"
              opacity="0.3"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 40 40"
                to="360 40 40"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
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
              <animate
                attributeName="opacity"
                values="0.8;1;0.8"
                dur="2s"
                repeatCount="indefinite"
              />
            </text>
          </g>

          {/* Title Section */}
          <g transform="translate(100, 0)">
            <text
              x="0"
              y="35"
              fontFamily="Arial"
              fontSize="32"
              fontWeight="bold"
              fill="#ffffff"
              filter="url(#cyberGlow)"
            >
              <tspan>DIGITAL CERTIFICATE</tspan>
              <animate
                attributeName="opacity"
                values="0.9;1;0.9"
                dur="3s"
                repeatCount="indefinite"
              />
            </text>
            <text
              x="0"
              y="60"
              fontFamily="Monaco, monospace"
              fontSize="16"
              fill="#00ff00"
              letterSpacing="1"
            >
              BLOCKCHAIN VERIFIED • QUANTUM SECURED
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="2s"
                repeatCount="indefinite"
              />
            </text>
          </g>
        </g>

        {/* QR Code Section */}
        <g transform="translate(500, 150)">
          <rect width="170" height="170" rx="10" fill="#0a0a0a"/>
          <rect
            width="170"
            height="170"
            rx="10"
            fill="#000000"
            stroke="#00ff00"
            strokeWidth="2"
            filter="url(#cyberGlow)"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,680;680,0"
              dur="10s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            width="170"
            height="4"
            fill="#00ff00"
            opacity="0.3"
            filter="url(#scanlineNoise)"
          >
            <animate
              attributeName="y"
              values="0;170;0"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>
          <g transform="translate(20, 20)">
            {Array(8).fill().map((_, i) => (
              Array(8).fill().map((_, j) => (
                <g key={`qr-${i}-${j}`}>
                  <rect
                    x={i * 16}
                    y={j * 16}
                    width="14"
                    height="14"
                    fill={Math.random() > 0.5 ? "#00ff00" : "none"}
                    opacity={Math.random() > 0.5 ? "1" : "0.5"}
                    filter="url(#cyberGlow)"
                  >
                    <animate
                      attributeName="opacity"
                      values={`${0.5 + Math.random() * 0.5};1;${0.5 + Math.random() * 0.5}`}
                      dur={`${1 + Math.random() * 2}s`}
                      repeatCount="indefinite"
                    />
                  </rect>
                  {Math.random() > 0.7 && (
                    <circle
                      cx={i * 16 + 7}
                      cy={j * 16 + 7}
                      r="1"
                      fill="#ffffff"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        values="1;2;1"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              ))
            ))}
          </g>
        </g>

        {/* Certificate Details */}
        <g transform="translate(50, 150)">
          {certificateDetails.map((item, i) => (
            <g key={item.label} transform={`translate(0, ${i * 80})`}>
              <rect
                width="400"
                height="65"
                rx="8"
                fill="#0a0a0a"
                stroke="#001100"
                strokeWidth="1"
              >
                <animate
                  attributeName="fill"
                  values="#0a0a0a;#0c0c0c;#0a0a0a"
                  dur="3s"
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </rect>
              <rect
                width="400"
                height="65"
                rx="8"
                fill="none"
                stroke="#00ff00"
                strokeWidth="1"
                filter="url(#cyberGlow)"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0,1000;1000,0"
                  dur="3s"
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </rect>
              <text
                x="20"
                y="25"
                fontFamily="Monaco, monospace"
                fontSize="12"
                fill="#007700"
              >
                {item.label}
              </text>
              <text
                x="20"
                y="50"
                fontFamily="Monaco, monospace"
                fontSize="18"
                fill="#00ff00"
                filter="url(#cyberGlow)"
              >
                {item.value}
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="2s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </text>
              <text x="360" y="40" fontSize="24" opacity="0.5">
                {item.icon}
                <animate
                  attributeName="opacity"
                  values="0.3;0.7;0.3"
                  dur="2s"
                  begin={`${i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </text>
            </g>
          ))}
        </g>

        {/* Verification Seal */}
        <g transform="translate(500, 350)">
          <circle cx="85" cy="85" r="80" fill="none" stroke="#004400" strokeWidth="2"/>
          <circle
            cx="85"
            cy="85"
            r="75"
            fill="none"
            stroke="#00ff00"
            strokeWidth="1"
            filter="url(#cyberGlow)"
          >
            <animate
              attributeName="r"
              values="75;77;75"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Rotating inner elements */}
          <g transform="translate(85, 85)">
            {Array(12).fill().map((_, i) => (
              <line
                key={`seal-line-${i}`}
                x1="0"
                y1="-60"
                x2="0"
                y2="-70"
                stroke="#00ff00"
                strokeWidth="2"
                transform={`rotate(${i * 30})`}
                opacity="0.5"
              >
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="2s"
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </line>
            ))}
          </g>

          <text
            x="85"
            y="80"
            textAnchor="middle"
            fontFamily="Monaco, monospace"
            fontSize="16"
            fill="#00ff00"
            filter="url(#cyberGlow)"
          >
            VERIFIED
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="2s"
              repeatCount="indefinite"
            />
          </text>
          <text
            x="85"
            y="100"
            textAnchor="middle"
            fontFamily="Monaco, monospace"
            fontSize="12"
            fill="#00aa00"
          >
            BLOCKCHAIN SECURED
          </text>
        </g>

        {/* Holographic Strip */}
        <g transform="translate(40, 500)">
          <rect
            width="720"
            height="40"
            fill="url(#holoGradient)"
            opacity="0.3"
            filter="url(#cyberGlow)"
          >
            <animate
              attributeName="opacity"
              values="0.2;0.4;0.2"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>
          {Array(18).fill().map((_, i) => (
            <text
              key={`holo-text-${i}`}
              x={40 * i}
              y="25"
              fontFamily="Monaco, monospace"
              fontSize="10"
              fill="#00ff00"
              opacity="0.3"
              transform={`rotate(-30 ${40 * i} 25)`}
            >
              CTF
              <animate
                attributeName="opacity"
                values="0.2;0.5;0.2"
                dur="2s"
                begin={`${i * 0.1}s`}
                repeatCount="indefinite"
              />
            </text>
          ))}
        </g>
      </g>
    </svg>
  );
};

export default CertificateValidationSVG;