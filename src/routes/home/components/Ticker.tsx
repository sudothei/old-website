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
      setCharacters((prevCharacters) => {
        // Create a copy of the characters array
        const newCharacters = [...prevCharacters];

        // Determine how many characters to change (half of them)
        const charactersToChange = Math.ceil(prevCharacters.length / 2);

        // Generate random indices to change
        const indicesToChange = new Set();
        while (indicesToChange.size < charactersToChange) {
          indicesToChange.add(
            Math.floor(Math.random() * prevCharacters.length)
          );
        }

        // Change characters at random indices
        indicesToChange.forEach((index: number) => {
          newCharacters[index] = generateRandomHebrewChar();
        });

        return newCharacters;
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
