import * as React from "react";
import { useState, useEffect } from "react";

export const LoadingBar = () => {
  const [loading, setLoading] = useState(true);

  const handleLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("load", handleLoading);
    return () => window.removeEventListener("load", handleLoading);
  }, []);

  const incrementLoadingBar = () => {
    const loadingProgress = document.querySelector("#loading-progress");
    if (loadingProgress != null) {
      if (loadingProgress.innerHTML.length < 50) {
        loadingProgress.innerHTML = loadingProgress.innerHTML + "#";
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.querySelector("#loading-progress")) {
        incrementLoadingBar();
      }
    }, 1);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="container"
      style={{
        zIndex: 1000,
        position: "absolute",
        background: "#000",
        display: loading ? "flex" : "none",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="ui-box"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1em",
          textAlign: "left",
        }}
      >
        <code style={{ color: "red", fontWeight: "bold" }}>
          -------------------- LOADING% --------------------
        </code>
        <code
          style={{ color: "red", fontWeight: "bold" }}
          id="loading-progress"
        ></code>
        <code style={{ color: "red", fontWeight: "bold" }}>
          --------------------------------------------------
        </code>
      </div>
    </div>
  );
};
