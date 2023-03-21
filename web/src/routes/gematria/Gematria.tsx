import * as React from "react";
import { useState } from "react";
import { LoadingBar } from "components/LoadingBar";

const Tanakh_English = require("./Tanakh_English.json");
const Tanakh_Hebrew = require("./Tabakh_Hebrew.json");
const Tanakh_Gematria = require("./Tanakh_Gematria.json");

const App = () => {
  const [currentSection, setCurrentSection] = useState<string>("Torah");
  const [currentBook, setCurrentBook] = useState<string>("Genesis");
  const [currentParsha, setCurrentParsha] = useState<number>(1);
  const [currentSidra, setCurrentSidra] = useState<number>(1);

  return (
    <div className="container">
      <div></div>
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
