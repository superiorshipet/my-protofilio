import React from 'react';

interface BotRobotIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  glow?: boolean;
}

export function BotRobotIcon({ className = 'w-6 h-6', glow = false, ...props }: BotRobotIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Top Antenna Beacon */}
      <circle cx="16" cy="3.5" r="1.6" fill="currentColor" />
      <path
        d="M16 5.1V8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Left Robot Ear */}
      <path
        d="M6 12.5C3.3 12.5 3.3 18.5 6 18.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Right Robot Ear */}
      <path
        d="M26 12.5C28.7 12.5 28.7 18.5 26 18.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Speech Bubble Head & Tail */}
      <path
        d="M10 8h12a4 4 0 0 1 4 4v6.5a4 4 0 0 1-4 4h-8.5L6 27V12a4 4 0 0 1 4-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Eyes */}
      <circle cx="11.5" cy="14.5" r="1.5" fill="currentColor" />
      <circle cx="20.5" cy="14.5" r="1.5" fill="currentColor" />

      {/* Smile */}
      <path
        d="M12 18c1.3 2 6.7 2 8 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
