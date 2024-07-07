import * as React from "react";
import { useState, useEffect } from "react";
import { LoadingBar } from "components/LoadingBar";
import Sigil from "components/Sigil.svg";
import { ActualHome } from "./ActualHome";

// Metadata for SEO
import { Helmet } from "react-helmet";

const App = ({ ...props }) => {
  const [distance, setDistance] = useState("0");

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      const { clientX, clientY } = event;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      const distanceFromCenter = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);

      const output = (distanceFromCenter / maxDistance) * 5;

      setDistance(output.toString());
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const abandonAllHope = () => {
    document.querySelector("#sigil")!.className = "bigzoom";
    document.querySelector("h2")!.className = "flydown";
    setTimeout(() => {
      props.setEntered(true);
    }, 1000);
  };

  return (
    <div className="container" style={{ placeContent: "center" }}>
      <div
        className="sigilbox"
        style={{ animation: `${distance}s shake infinite` }}
      >
        <img src={Sigil} id="sigil" onClick={abandonAllHope} />
      </div>
      <h2 className="abandon">Abandon all hope, ye who enter here.</h2>
      <Helmet>
        <title>sudothei</title>
        <meta
          name="description"
          content="sudothei is a freelance web developer and programmer specializing in web development, programming, and tech solutions. Contact for your next project."
        />
        <meta
          name="keywords"
          content="web developer, programmer, freelance, JavaScript, React, Node.js, HTML, CSS, Python, Django"
        />
      </Helmet>
    </div>
  );
};

export const Home = () => {
  const [entered, setEntered] = useState(false);

  return (
    <div>
      <LoadingBar />
      {entered ? <ActualHome /> : <App setEntered={setEntered} />}
    </div>
  );
};
