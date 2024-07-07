import * as React from "react";
import { useState, useEffect } from "react";

const generateRandomHebrewChar = (): string => {
  const hebrewRange = { start: 0x05d0, end: 0x05ea };
  const randomCode = Math.floor(
    Math.random() * (hebrewRange.end - hebrewRange.start + 1) +
      hebrewRange.start
  );
  return String.fromCharCode(randomCode);
};

const generateInitialCharacters = (count: number): string[] => {
  return Array.from({ length: count }, generateRandomHebrewChar);
};

interface TickerProps {
  className?: string;
}

export const Ticker: React.FC<TickerProps> = ({ className, ...props }) => {
  const [characters, setCharacters] = useState<string[]>(() =>
    generateInitialCharacters(100)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCharacters((prev) => {
        const newChar = generateRandomHebrewChar();
        return [newChar, ...prev].slice(0, 100);
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`ticker ${className || ""}`} {...props}>
      {characters.map((char, index) => (
        <div key={index} className="ticker-item">
          {char}
        </div>
      ))}
    </div>
  );
};
