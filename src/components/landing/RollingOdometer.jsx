import React from 'react';

/**
 * Single mechanical digit reel (0-9).
 * Uses CSS transform with cubic-bezier easing to simulate an authentic mechanical split-flap/odometer wheel.
 */
function DigitReel({ digit }) {
  const num = parseInt(digit, 10);
  if (isNaN(num)) {
    return <span className="inline-block">{digit}</span>;
  }

  return (
    <span
      className="inline-block relative overflow-hidden select-none"
      style={{
        height: '1.2em',
        width: '1ch',
        verticalAlign: 'bottom',
      }}
    >
      <span
        className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `translateY(-${num * 10}%)`,
        }}
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span
            key={n}
            className="flex items-center justify-center font-mono"
            style={{ height: '1.2em', lineHeight: '1.2em' }}
          >
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * Mechanical Rolling Odometer display.
 * Formats numbers or strings with animated mechanical reels per digit.
 */
export default function RollingOdometer({ value, prefix = '', suffix = '', className = '' }) {
  const str = String(value);
  const chars = str.split('');

  return (
    <span
      className={`inline-flex items-baseline font-mono tracking-tight ${className}`}
      aria-label={`${prefix}${str}${suffix}`}
    >
      {prefix && <span className="select-none">{prefix}</span>}
      <span className="inline-flex items-baseline" aria-hidden="true">
        {chars.map((char, i) => {
          const isNum = !isNaN(parseInt(char, 10));
          const placeFromRight = chars.length - 1 - i;
          const key = isNum ? `digit-${placeFromRight}` : `char-${i}-${char}`;
          return <DigitReel key={key} digit={char} />;
        })}
      </span>
      {suffix && <span className="select-none">{suffix}</span>}
    </span>
  );
}
