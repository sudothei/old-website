// TODO map matches !//>
// TODO english or hebrew into total input searches
// TODO Search / Browse
// TODO Search Verse / Search Value
// TODO Palindromes
// TODO Primes
// TODO Count appearances of searched words
// TODO Show Gematria of searched word somehow
// TODO Search appearances
// TODO single asterisk in search box means any number
// TODO regex matching for words

import * as React from "react";
import { useState, useEffect } from "react";
import { LoadingBar } from "components/LoadingBar";
import { toInteger } from "lodash";
import { Verse } from "./components/Verse";

const Tanakh_English = require("./Tanakh_English.json");
const Tanakh_Hebrew = require("./Tabakh_Hebrew.json");
const Tanakh_Gematria = require("./Tanakh_Gematria.json");
const Dictionary = require("./Dictionary.json");

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
  const [currentValue, setCurrentValue] = useState<string>("2701");

  useEffect(() => {
    setCurrentBook(sections[currentSection][0]);
  }, [currentSection]);

  useEffect(() => {
    setCurrentParsha(1);
  }, [currentBook]);

  useEffect(() => {
    setCurrentSidra(1);
  }, [currentParsha]);

  useEffect(() => {
    if (currentSidra != 0 && currentParsha != 0) {
      setCurrentValue(
        Tanakh_Gematria[currentSection][currentBook][currentParsha - 1][
          currentSidra - 1
        ]
      );
    } else {
      setCurrentValue("");
    }
  }, [currentSection, currentBook, currentParsha, currentSidra]);

  return (
    <div
      className="container"
      style={{ justifyContent: "start", height: "calc(100vh - 4em)" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "1em",
          height: "calc(100% - 4em)",
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
            }}
          >
            {sections[currentSection].map((book: string) => (
              <option value={book}>{book}</option>
            ))}
          </select>
          <input
            className="tanakh-filter"
            id="parsha"
            value={currentParsha}
            type="number"
            onChange={(evt) => {
              if (
                evt.target.value != "" &&
                evt.target.value <=
                  Tanakh_English[currentSection][currentBook].length
              ) {
                setCurrentParsha(toInteger(evt.target.value));
              } else if (evt.target.value == "") {
                setCurrentParsha(0);
              }
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
            onChange={(evt) => {
              if (
                evt.target.value != "" &&
                evt.target.value <=
                  Tanakh_English[currentSection][currentBook].length
              ) {
                setCurrentSidra(toInteger(evt.target.value));
              } else if (evt.target.value == "") {
                setCurrentSidra(0);
              }
            }}
            min="1"
            max={
              currentParsha != 0
                ? Tanakh_English[currentSection][currentBook][currentParsha - 1]
                    .length
                : 2
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
            value={currentValue}
            placeholder="Search"
            title="Try regex or an asterisk!"
          ></input>
          <div
            style={{ cursor: "pointer" }}
            className="tanakh-filter"
            onClick={() => setCurrentSidra(0)}
          >
            Help
          </div>
        </div>

        {currentParsha != 0 && currentSidra != 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              minHeight: "100%",
            }}
          >
            {currentSidra != 0 && currentParsha != 0 ? (
              <Verse
                heb={
                  Tanakh_Hebrew[currentSection][currentBook][currentParsha - 1][
                    currentSidra - 1
                  ]
                }
                eng={
                  Tanakh_English[currentSection][currentBook][
                    currentParsha - 1
                  ][currentSidra - 1]
                }
                smalltext={`${currentSidra}`}
              />
            ) : (
              ""
            )}
            {
              // TODO map matches !//>
            }

            <div
              style={{
                width: "33%",
                fontFamily: "Syne Mono",
                border: "3px solid #0f0",
                margin: "0.5em",
                overflowY: "scroll",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    wordWrap: "break-word",
                  }}
                >
                  <ul>
                    {Dictionary.filter(
                      (x: { word: string; value: number }) =>
                        x.value ==
                        Tanakh_Gematria[currentSection][currentBook][
                          currentParsha - 1
                        ][currentSidra - 1]
                    ).map((x: any) => (
                      <li className="gematria-word">
                        <span
                          style={{
                            direction: "rtl",
                            textAlign: "right",
                            unicodeBidi: "bidi-override",
                          }}
                        >
                          {x.word}
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
        ) : (
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <p style={{ fontSize: "3em" }}>Help Menu</p>
          </div>
        )}
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
