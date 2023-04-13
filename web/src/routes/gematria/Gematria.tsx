import * as React from "react";
import { useState } from "react";
import { LoadingBar } from "components/LoadingBar";
import { toInteger } from "lodash";
import { Verse } from "./components/Verse";

const Tanakh_English = require("./Tanakh_English.json");
const Tanakh_Hebrew = require("./Tabakh_Hebrew.json");
const Tanakh_Gematria = require("./Tanakh_Gematria.json");
//const Words_Gematria = require("./Words_Gematria.json");
const dict = require("./dict-he-en.json");

//const translate = (word: string) => {
//const eng_arr = dict.find((x: any) => x["translated"] == word);
//if (eng_arr) {
//return eng_arr.translation.join(", ") + "";
//} else {
//return "";
//}
//};

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
    <div className="container" style={{ justifyContent: "start" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "1em",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
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
            onChange={(evt) => {
              setCurrentParsha(toInteger(evt.target.value));
              setCurrentSidra(1);
            }}
            min="1"
            max={Tanakh_English[currentSection][currentBook].length}
          ></input>
          <span
            className="tanakh-filter"
            style={{ border: "none", margin: "auto 0", padding: 0 }}
          >
            :
          </span>
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
          <span
            className="tanakh-filter"
            style={{ border: "none", margin: "auto 0", padding: 0 }}
          >
            ==
          </span>
          <input
            className="tanakh-filter"
            value={
              Tanakh_Gematria[currentSection][currentBook][currentParsha - 1][
                currentSidra - 1
              ]
            }
            type="number"
          ></input>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <Verse
            heb={
              Tanakh_Hebrew[currentSection][currentBook][currentParsha - 1][
                currentSidra - 1
              ]
            }
            eng={
              Tanakh_English[currentSection][currentBook][currentParsha - 1][
                currentSidra - 1
              ]
            }
            sidra={currentSidra}
          />
          <div
            style={{
              width: "33%",
              fontFamily: "Syne Mono",
              border: "3px solid #0f0",
              margin: "0.5em",
            }}
          >
            <p style={{ marginBottom: 0, fontSize: "2em", margin: 0 }}>
              Matching Words:
            </p>
            <div
              style={{
                boxSizing: "border-box",
              }}
            >
              <ul>
                {dict
                  .filter(
                    (x: { translated: string; value: number }) =>
                      x.value ==
                      Tanakh_Gematria[currentSection][currentBook][
                        currentParsha - 1
                      ][currentSidra - 1]
                  )
                  .map((x: any) => (
                    <li
                      style={{
                        marginRight: "1.5em",
                        fontSize: "2em",
                      }}
                    >
                      <span
                        style={{
                          direction: "rtl",
                          textAlign: "right",
                          unicodeBidi: "bidi-override",
                        }}
                      >
                        {x.translated}
                      </span>
                      <span
                        style={{
                          direction: "ltr",
                          textAlign: "left",
                        }}
                      >
                        {" = " + x.translation}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
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
