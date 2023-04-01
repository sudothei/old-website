import * as React from "react";
import { useState } from "react";
import { LoadingBar } from "components/LoadingBar";
import { toInteger } from "lodash";

const Tanakh_English = require("./Tanakh_English.json");
const Tanakh_Hebrew = require("./Tabakh_Hebrew.json");
//const Tanakh_Gematria = require("./Tanakh_Gematria.json");
//const Words_Gematria = require("./Words_Gematria.json");
const sections: any = {
  Torah: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"],
  Prophets: [
    "Joshua",
    "Judges",
    "I Samuel",
    "II Samuel",
    "I Kings",
    "II Kings",
    "Isiah",
    "Jeremiah",
    "Ezekiel",
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakkuk",
    "Zephaniah",
    "Haggai",
    "Zechariah",
    "Malachi",
  ],
  Writings: [
    "Psalms",
    "Proverbs",
    "Job",
    "Song of Songs",
    "Ruth",
    "Lamentations",
    "Ecclesiastes",
    "Esther",
    "Daniel",
    "Ezra",
    "Nehemiah",
    "I Chronicles",
    "II Chronicles",
  ],
};

const App = () => {
  const [currentSection, setCurrentSection] = useState<string>("Torah");
  const [currentBook, setCurrentBook] = useState<string>("Genesis");
  const [currentParsha, setCurrentParsha] = useState<number>(1);
  const [currentSidra, setCurrentSidra] = useState<number>(1);

  return (
    <div className="container">
      <div>
        <select
          value={currentSection}
          className="tanakh-filter"
          onChange={(evt) => {
            setCurrentSection(evt.target.value);
            setCurrentBook(sections[evt.target.value][0]);
            setCurrentParsha(1);
            setCurrentSidra(1);
          }}
        >
          {Object.keys(sections).map((section) => (
            <option value={section}>{section}</option>
          ))}
        </select>

        <select
          className="tanakh-filter"
          value={currentBook}
          onChange={(evt) => {
            setCurrentBook(evt.target.value);
            setCurrentParsha(1);
            setCurrentSidra(1);
          }}
        >
          {sections[currentSection].map((book: string) => (
            <option value={book}>{book}</option>
          ))}
        </select>

        <input
          className="tanakh-filter"
          value={currentParsha}
          type="number"
          onChange={(evt) => setCurrentParsha(toInteger(evt.target.value))}
          min="1"
          max={Tanakh_English[currentSection][currentBook].length}
        ></input>
        <input
          className="tanakh-filter"
          value={currentSidra}
          type="number"
          onChange={(evt) => setCurrentSidra(toInteger(evt.target.value))}
          min="1"
          max={
            Tanakh_English[currentSection][currentBook][currentParsha - 1]
              .length
          }
        ></input>
      </div>

      <div>
        <p>
          {
            Tanakh_Hebrew[currentSection][currentBook][currentParsha - 1][
              currentSidra - 1
            ]
          }
          {
            Tanakh_English[currentSection][currentBook][currentParsha - 1][
              currentSidra - 1
            ]
          }
        </p>
      </div>
    </div>
  );
};

export const Gematria = () => {
  return (
    <div className="App">
      <LoadingBar />
      <App />
      <div className="border-corners"></div>
      <div className="border-edges"></div>
    </div>
  );
};
