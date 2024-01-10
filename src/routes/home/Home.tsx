import * as React from "react";
import { SocialButtons } from "./components/SocialButtons";
import { Terminal } from "./components/Terminal";
import { AnimatedPfp } from "./components/AnimatedPfp";
import { Enochian } from "./components/Enochian";
import { LoadingBar } from "components/LoadingBar";

const App = () => {
  return (
    <div className="container">
      {/*
       *<SicpWizard />
       */}
      <Terminal />

      <div className="ui-box">
        <AnimatedPfp />
      </div>

      <div className="ui-box">
        <SocialButtons />
      </div>

      <div className="ui-box">
        <Enochian />
      </div>
      <a href="gematria">
        <div className="ui-box">
          <span
            style={{
              fontSize: "5rem",
              lineHeight: "6rem",
              padding: "1rem",
            }}
          >
            גמטריא כלי
          </span>
        </div>
      </a>
    </div>
  );
};

export const Home = () => {
  return (
    <div className="App">
      <LoadingBar />
      <App />
      <div className="border-corners"></div>
      <div className="border-edges"></div>
    </div>
  );
};
