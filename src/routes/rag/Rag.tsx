import * as React from "react";
import { useRef } from "react";
import { SicpWizard } from "components/SicpWizard";
import { LoadingBar } from "components/LoadingBar";

const RagInput = () => {
  let ragInput = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    if (typeof ragInput != null) {
      ragInput.current!.style.height = "auto";
      ragInput.current!.style.height = ragInput.current!.scrollHeight + "px";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "1em",
        marginTop: "1em",
        border: "3px solid #0f0",
        flexFlow: "wrap",
      }}
    >
      <div
        style={{
          width: "100%",
          marginBottom: "0",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "100%",
            fontWeight: 900,
            overflowY: "scroll",
            maxHeight: "50vh",
            display: "flex",
          }}
        >
          <span
            style={{
              alignSelf: "center",
              paddingLeft: "0.5em",
              paddingRight: "0.5em",
            }}
          >
            &gt;
          </span>
          <textarea
            ref={ragInput}
            onChange={autoResize}
            rows={1}
            style={{
              background: "transparent",
              color: "#0f0",
              width: "100%",
              border: "none",
              fontSize: "1.2em",
              fontWeight: 900,
              height: 21,
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div
      className="container"
      style={{
        height: "calc(100vh - 4em)",
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          width: "calc(100vw - 6em)",
          border: "none",
          display: "flex",
          flex: "1 1 auto",
          maxHeight: "calc(100vh - 6em)",
          flexDirection: "column",
        }}
      >
        <SicpWizard />
        <div
          style={{
            display: "flex",
            width: "100%",
            flex: "1 1 auto",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              margin: "0 1em",
              border: "3px solid #0f0",
              width: "100%",
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                flexDirection: "column",
                justifyContent: "flex-end",
                textAlign: "left",
                paddingTop: 60,
              }}
            ></div>
          </div>
        </div>
        <RagInput />
      </div>
    </div>
  );
};

export const Rag = () => {
  return (
    <div className="App">
      <LoadingBar />
      <App />
      <div className="border-corners"></div>
      <div className="border-edges"></div>
    </div>
  );
};
