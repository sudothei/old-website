import * as React from "react";
import { AnimatedPfp } from "./components/AnimatedPfp";
import { SocialButtons } from "./components/SocialButtons";
import { Services } from "./components/Services";

export const ActualHome = () => {
  return (
    <div className="container">
      <div className="ui-box">
        <AnimatedPfp />
      </div>
      <Services />
      <div className="ui-box">
        <SocialButtons />
      </div>
    </div>
  );
};
