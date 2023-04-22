// TODO map matches
// TODO english or hebrew into total input searches
// TODO Palindromes
// TODO Primes
// TODO Count appearances of searched words
// TODO Show Gematria of searched word somehow
// TODO Search appearances
// TODO single asterisk in search box means any number
// TODO regex matching for words
// TODO sort Verses_Gematria

import * as React from "react";
import { useState, useEffect } from "react";
import { LoadingBar } from "components/LoadingBar";
import { toInteger } from "lodash";
import { Verse } from "./components/Verse";

const Tanakh_English = require("./Tanakh_English.json");
const Tanakh_Hebrew = require("./Tabakh_Hebrew.json");
const Tanakh_Gematria = require("./Tanakh_Gematria.json");
const Verses_Gematria = require("./Verses_Gematria.json");
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
  const [currentWords, setCurrentWords] = useState<
    { word: string; translation: string; value: number }[]
  >([]);
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [currentMatches, setCurrentMatches] = useState<any[]>([]);

  useEffect(() => {
    if (currentSidra != 0 && currentParsha != 0) {
      setCurrentValue(
        Tanakh_Gematria[currentSection][currentBook][currentParsha - 1][
          currentSidra - 1
        ]
      );
      setCurrentWords(
        Dictionary.filter(
          (x: any) =>
            x.value ==
            Tanakh_Gematria[currentSection][currentBook][currentParsha - 1][
              currentSidra - 1
            ]
        )
      );
    } else {
      setCurrentValue("");
    }
  }, [currentSection, currentBook, currentParsha, currentSidra]);

  useEffect(() => {
    setCurrentMatches(getMatches(currentValue));
  }, [currentValue]);

  useEffect(() => {
    setCurrentMatches(getMatches(currentValue));
  }, []);

  const handleSearch = (evt: any) => {
    if (evt.key == "Enter") {
      const term: string = evt.target.value;
      setCurrentValue(term);
      if (toInteger(term) != 0) {
        setSearchMode(true);
      } else {
        const matches = Dictionary.filter((x: any) => {
          const word: string = `${x.translation}`;
          return word.toLowerCase().includes(term.toLowerCase());
        });
        setCurrentWords(matches);
      }
    }
  };

  const getMatches = (term: string) => {
    if (term in Verses_Gematria) {
      const verses = Verses_Gematria[term];
      if (!searchMode) {
        return verses.filter(
          (x: any) =>
            !(
              x["section"] === currentSection &&
              x["book"] === currentBook &&
              x["parsha"] === currentParsha &&
              x["sidra"] === currentSidra
            )
        );
      } else {
        return verses;
      }
    } else return [];
  };

  const handleKeypress = (evt: KeyboardEvent) => {
    if (
      document.activeElement?.tagName.toLowerCase() !== "input" &&
      document.activeElement?.tagName.toLowerCase() !== "select"
    ) {
      let newVerse: any[] = [];
      if (["ArrowDown", "ArrowRight"].includes(evt.key)) {
        newVerse = nextVerse(
          currentSection,
          currentBook,
          currentParsha,
          currentSidra
        );
      }
      if (["ArrowUp", "ArrowLeft"].includes(evt.key)) {
        newVerse = previousVerse(
          currentSection,
          currentBook,
          currentParsha,
          currentSidra
        );
      }
      if (newVerse.length !== 0) {
        if (
          typeof newVerse[0] === "string" &&
          typeof newVerse[1] === "string"
        ) {
          setCurrentSection(newVerse[0]);
          setCurrentBook(newVerse[1]);
        }
      }
      if (typeof newVerse[2] === "number" && typeof newVerse[3] === "number") {
        setCurrentParsha(newVerse[2]);
        setCurrentSidra(newVerse[3]);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeypress);
    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, [currentSection, currentBook, currentParsha, currentSidra]);

  const nextVerse = (
    section: string,
    book: string,
    parsha: number,
    sidra: number
  ) => {
    const sectionNumber = Object.keys(sections).indexOf(section) + 1;
    const bookNumber = sections[section].indexOf(book) + 1;
    const maxBook = sections[section].length;
    const maxParsha = Tanakh_English[section][book].length;
    const maxSidra = Tanakh_English[section][book][parsha - 1].length;
    let nextSection: string = section;
    let nextBook: string = book;
    let nextParsha: number = parsha;
    let nextSidra: number = sidra;
    if (maxSidra === sidra) {
      nextSidra = 1;
      if (maxParsha === parsha) {
        nextParsha = 1;
        if (maxBook === bookNumber) {
          if (section === "Writings") {
            return [];
          } else {
            nextSection = Object.keys(sections)[sectionNumber];
            nextBook = sections[nextSection][0];
          }
        } else {
          nextBook = sections[section][bookNumber];
        }
      } else {
        nextParsha = parsha + 1;
      }
    } else {
      nextSidra = sidra + 1;
    }
    return [nextSection, nextBook, nextParsha, nextSidra];
  };

  const previousVerse = (
    section: string,
    book: string,
    parsha: number,
    sidra: number
  ) => {
    const sectionNumber = Object.keys(sections).indexOf(section) + 1;
    const bookNumber = sections[section].indexOf(book) + 1;
    let previousSection: string = section;
    let previousBook: string = book;
    let previousParsha: number = parsha;
    let previousSidra: number = sidra;

    if (sidra === 1) {
      if (parsha === 1) {
        if (bookNumber === 1) {
          if (section === "Torah") {
            return [];
          }
          previousSection = Object.keys(sections)[sectionNumber - 2];
          previousBook =
            sections[previousSection][sections[previousSection].length - 1];
        } else {
          previousBook = sections[section][bookNumber - 2];
        }
        previousParsha = Tanakh_English[previousSection][previousBook].length;
      } else {
        previousParsha = parsha - 1;
      }
      previousSidra =
        Tanakh_English[previousSection][previousBook][previousParsha - 1]
          .length;
    } else {
      previousSidra = sidra - 1;
    }

    return [previousSection, previousBook, previousParsha, previousSidra];
  };

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
              setCurrentParsha(1);
              setCurrentSidra(1);
            }}
          >
            {Object.keys(sections).map((section) => (
              <option value={section} key={section.toLowerCase()}>
                {section}
              </option>
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
              <option value={book} key={book.toLowerCase()}>
                {book}
              </option>
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
                setCurrentSidra(1);
              } else if (evt.target.value == "") {
                setCurrentParsha(0);
              }
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
            onChange={(evt) => {
              setCurrentValue(evt.target.value);
            }}
            onKeyDown={handleSearch}
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
            <div
              id="verses"
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                overflowY: "scroll",
              }}
            >
              {!searchMode ? (
                <div
                  id="current-verse"
                  style={{ border: "3px solid #0f0", marginBottom: "1.5em" }}
                >
                  <Verse
                    heb={
                      Tanakh_Hebrew[currentSection][currentBook][
                        currentParsha - 1
                      ][currentSidra - 1]
                    }
                    eng={
                      Tanakh_English[currentSection][currentBook][
                        currentParsha - 1
                      ][currentSidra - 1]
                    }
                    smalltext={""}
                  />
                </div>
              ) : (
                ""
              )}
              {currentMatches.map((verse: any) => {
                return (
                  <Verse
                    key={`${verse["section"]}-${verse["book"]}-${verse["parsha"]}:${verse["sidra"]}`}
                    heb={
                      Tanakh_Hebrew[verse["section"]][verse["book"]][
                        verse["parsha"] - 1
                      ][verse["sidra"] - 1]
                    }
                    eng={
                      Tanakh_English[verse["section"]][verse["book"]][
                        verse["parsha"] - 1
                      ][verse["sidra"] - 1]
                    }
                    smalltext={`${verse["section"]} ${verse["book"]} ${verse["parsha"]}:${verse["sidra"]}`}
                  />
                );
              })}
            </div>

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
                    {currentWords.map((x: any, i: number) => (
                      <li className="gematria-word" key={"word-" + i}>
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
