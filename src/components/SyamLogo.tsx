import { motion } from 'motion/react';
import { useState } from 'react';

interface SyamLogoProps {
  className?: string;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  size?: number | string;
  animate?: boolean;
}

export default function SyamLogo({
  className = '',
  fillColor = 'currentColor',
  strokeColor = 'none',
  strokeWidth,
  size = 40,
  animate = false,
}: SyamLogoProps) {
  // Exact path from official SVG representing "Syam" / "شام"
  const pathD = "m259.36 304.65c-9.89-2.05-18.47-6.85-24.89-13.94-9.44-10.42-14.49-23.27-16.45-41.84-1.32-12.58-1.36-224.19-0.04-228.8 0.54-1.88 2.23-4.73 3.75-6.33 8-8.42 19.79-7.72 26.68 1.58 2.08 2.82 2.09 3.12 2.64 118.5 0.48 99.86 0.77 116.45 2.1 121.32 3.04 11.14 7.76 16.19 15.13 16.19 5.07 0 9.78-2.47 12.06-6.33 4.18-7.07 4.94-13.41 5.38-44.5l0.43-30 2.6-3.8c5.25-7.69 17.29-9.99 24.09-4.61 6.23 4.94 6.6 6.75 7.29 35.91 0.67 28.07 1.66 35.36 6.08 44.56 2.85 5.91 6.4 8.64 11.25 8.64 5.38 0 8.66-3.61 11.8-12.98 3.78-11.27 3.79-11.32 4.55-40.8l0.69-27.08 2.81-3.68c8.06-10.56 22.94-9.94 28.62 1.2 1.71 3.36 2 6.75 2.51 29.22 0.45 20.51 0.95 27.02 2.56 33.71 3.88 16.17 9.67 22.79 17.63 20.17 9.44-3.12 14.24-23.33 14.33-60.31 0.05-21.31 0.64-23.71 6.89-28.04 9.77-6.78 21.48-3.17 25.71 7.91 1.48 3.87 1.62 7.39 1.15 27.71-0.54 23.13-1.99 36.33-5.19 47.35-6.55 22.53-20.14 36.16-39.44 39.56-11.47 2.02-25.69-2.19-34.47-10.21-2.96-2.71-5.71-4.93-6.1-4.93-0.4 0-2.9 1.96-5.57 4.36-9.84 8.85-22.59 12.72-34.98 10.63-8.09-1.36-18.64-6.34-23.59-11.12l-3.12-3.02-7.08 5.17c-11.32 8.25-24.79 11.33-37.81 8.63zm-230.13-3.23c-2.91-1.74-5.05-4.11-6.75-7.45-2.39-4.72-2.48-5.63-2.48-24.21 0-39.64 4.45-55.27 20.17-70.93 12.82-12.76 27.32-18.57 52.01-20.85 18.23-1.68 42.86 0.36 56.32 4.67 15.62 4.99 29.48 16.4 35.92 29.56 4.7 9.61 6.58 19.26 6.58 33.74 0 9.72-0.46 13.41-2.56 20.69-1.41 4.87-3.65 10.73-4.99 13.01-3.57 6.13-12.08 15.05-17.21 18.06-10.05 5.89-24.95 7.81-36.78 4.75-9.15-2.37-14.22-5.24-20.98-11.88-13.22-12.97-19.48-33.19-19.48-62.91v-14.94l-4.36 0.6c-10.73 1.47-20.15 6.91-24.7 14.27-4.37 7.07-5.15 12.52-5.67 39.66-0.56 29.39-0.78 30.22-9.24 34.49-5.82 2.94-10.51 2.84-15.8-0.33zm119.79-33.27c5.51-2.94 7.92-9.98 7.92-23.15 0-13.36-2.27-19.76-8.76-24.7-4.09-3.11-13.21-6.42-21.43-7.77l-3.75-0.62v13.93c0 22.07 3.76 36.83 10.71 42.02 3.58 2.66 10.59 2.8 15.31 0.29zm146.98-114.27c-3.19-1.27-7.78-5.61-9.59-9.08-3.82-7.31 0.06-18.96 7.59-22.8 8.27-4.22 19.64-1.55 24.09 5.64 2.91 4.72 3.56 12.19 1.41 16.43-2.22 4.39-5.29 7.75-8.7 9.53-3.08 1.6-11.09 1.75-14.8 0.28zm67.5-0.55c-6.55-3.46-10.5-9.5-10.5-16.06 0-5.42 3.97-12.32 8.63-15 5.46-3.15 14.77-3.15 19.45 0 7.84 5.29 10.3 15.15 5.92 23.73-3.95 7.75-15.75 11.43-23.5 7.33zm-69.04-65.19c-3.89-2.37-8.28-7.58-9.08-10.77-1.08-4.31 0.19-11.96 2.55-15.26 3.55-4.99 9.27-7.39 16.49-6.93 10.46 0.67 16.03 6.7 16.06 17.4 0.02 5.16-0.41 6.64-2.85 9.83-1.57 2.07-4.27 4.62-6 5.67-4.19 2.56-13.03 2.59-17.17 0.06z";

  const normalizedWidth = typeof size === 'number' ? size : parseFloat(size as string) || 40;
  const height = (normalizedWidth * 324) / 476;

  const gradId = `logo-grad-svg-loader`;
  const maskId = `logo-mask-svg-loader`;

  const [glowReady, setGlowReady] = useState(false);
  return (
    <motion.svg
      width={normalizedWidth}
      height={height}
      viewBox="0 0 476 324"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      initial={animate ? { filter: 'drop-shadow(0 0 0px rgba(243, 19, 101, 0))' } : undefined}
      animate={animate
        ? glowReady
          ? { filter: ['drop-shadow(0 0 50px rgba(243, 19, 101, 1))', 'drop-shadow(0 0 72px rgba(243, 19, 101, 1))'] }
          : { filter: 'drop-shadow(0 0 50px rgba(243, 19, 101, 1))' }
        : undefined}
      transition={animate
        ? glowReady
          ? { duration: 2.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
          : { delay: 2.8, duration: 1.2, ease: 'easeOut' }
        : undefined}
      onAnimationComplete={() => { if (animate && !glowReady) setGlowReady(true); }}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {animate && (
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            {/* Draw slower and smoother right-to-left */}
            <motion.stop
              offset={1}
              animate={{ offset: 0 }}
              transition={{
                duration: 2.8,
                ease: [0.25, 1, 0.5, 1],
              }}
              stopColor="black"
            />
            <motion.stop
              offset={1}
              animate={{ offset: 0 }}
              transition={{
                duration: 2.8,
                ease: [0.25, 1, 0.5, 1],
                delay: 0.25,
              }}
              stopColor="white"
            />
          </linearGradient>
        )}
        {animate && (
          <mask id={maskId}>
            <rect x="-300" y="-300" width="1076" height="924" fill={`url(#${gradId})`} />
          </mask>
        )}
      </defs>

      {animate ? (
        <g mask={`url(#${maskId})`} style={{ overflow: 'visible' }}>
          <motion.path
            d={pathD}
            stroke={strokeColor !== 'none' ? strokeColor : fillColor}
            strokeWidth={strokeWidth !== undefined ? strokeWidth : 4}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{
              pathLength: 0,
              fill: 'rgba(243, 19, 101, 0)',
            }}
            animate={{
              pathLength: 1,
              fill: fillColor,
            }}
            transition={{
              pathLength: { duration: 2.8, ease: [0.16, 1, 0.3, 1] },
              fill: { delay: 2.4, duration: 0.8, ease: 'easeOut' },
            }}
          />
        </g>
      ) : (
        <path
          d={pathD}
          fill={fillColor}
          stroke={strokeColor !== 'none' ? strokeColor : undefined}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          style={{ transition: 'fill 0.4s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      )}
    </motion.svg>
  );
}
