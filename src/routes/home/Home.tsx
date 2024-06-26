import * as React from "react";
import { SocialButtons } from "components/SocialButtons";
import { AnimatedPfp } from "components/AnimatedPfp";
import { LoadingBar } from "components/LoadingBar";

const App = () => {
  return (
    <div className="container">
      <div className="ui-box">
        <AnimatedPfp />
      </div>

      <div className="ui-box">
        <SocialButtons />
      </div>
    </div>
  );
};

export const Home = () => {
  return (
    <div className="App">
      <LoadingBar />
      <App />
    </div>
  );
};
