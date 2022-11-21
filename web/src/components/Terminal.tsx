import * as React from "react";
import { useState, useEffect, useRef } from "react";
import init, { Repl } from "../helpers/sudothei-lisp/pkg/sudothei_lisp.js";

const TerminalOutput = (props: { output: string }) => {
  const { output } = props;
  return (
    <pre
      style={{
        textAlign: "left",
        paddingLeft: "1em",
        paddingRight: "1em",
        fontWeight: 900,
        width: "100%",
        margin: 0,
      }}
    >
      {output}
    </pre>
  );
};

const TerminalInput = (props: { onSubmit: (input: string) => void }) => {
  const { onSubmit } = props;
  let terminalInput = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    if (typeof terminalInput != null) {
      terminalInput.current!.style.height = "auto";
      terminalInput.current!.style.height =
        terminalInput.current!.scrollHeight + "px";
    }
  };

  useEffect(() => {
    terminalInput.current!.style.height = "auto";
    terminalInput.current!.style.height =
      terminalInput.current!.scrollHeight + "px";
    const handleEnter = (e: KeyboardEvent) => {
      if (!e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        onSubmit(terminalInput.current!.value);
        terminalInput.current!.value = "";
        terminalInput.current!.style.height = "auto";
        terminalInput.current!.style.height =
          terminalInput.current!.scrollHeight + "px";
      }
    };

    terminalInput.current!.addEventListener("keydown", handleEnter);
    return () =>
      terminalInput.current!.removeEventListener("keydown", handleEnter);
  }, []);

  return (
    <div className="ui-box" style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          fontWeight: 900,
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
          ref={terminalInput}
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
  );
};

export const Terminal = () => {
  const titleArt =
    window.innerWidth < 700
      ? "Sudothei Lisp Interpreter"
      : `
  ██████  █    ██ ▓█████▄  ▒█████  ▄▄▄█████▓ ██░ ██ ▓█████  ██▓
▒██    ▒  ██  ▓██▒▒██▀ ██▌▒██▒  ██▒▓  ██▒ ▓▒▓██░ ██▒▓█   ▀ ▓██▒
░ ▓██▄   ▓██  ▒██░░██   █▌▒██░  ██▒▒ ▓██░ ▒░▒██▀▀██░▒███   ▒██▒
  ▒   ██▒▓▓█  ░██░░▓█▄   ▌▒██   ██░░ ▓██▓ ░ ░▓█ ░██ ▒▓█  ▄ ░██░
▒██████▒▒▒▒█████▓ ░▒████▓ ░ ████▓▒░  ▒██▒ ░ ░▓█▒░██▓░▒████▒░██░
▒ ▒▓▒ ▒ ░░▒▓▒ ▒ ▒  ▒▒▓  ▒ ░ ▒░▒░▒░   ▒ ░░    ▒ ░░▒░▒░░ ▒░ ░░▓  
░ ░▒  ░ ░░░▒░ ░ ░  ░ ▒  ▒   ░ ▒ ▒░     ░     ▒ ░▒░ ░ ░ ░  ░ ▒ ░
░  ░  ░   ░░░ ░ ░  ░ ░  ░ ░ ░ ░ ▒    ░       ░  ░░ ░   ░    ▒ ░
      ░     ░        ░        ░ ░            ░  ░  ░   ░  ░ ░  
┬  ┬┌─┐┌─┐  ┬┌┐┌┌┬┐┌─┐┬─┐┌─┐┬─┐┌─┐┌┬┐┌─┐┬─┐
│  │└─┐├─┘  ││││ │ ├┤ ├┬┘├─┘├┬┘├┤  │ ├┤ ├┬┘
┴─┘┴└─┘┴    ┴┘└┘ ┴ └─┘┴└─┴  ┴└─└─┘ ┴ └─┘┴└─
`;
  const [history, setHistory] = useState<(string | number)[]>([titleArt]);

  let repl: any;

  (async () => {
    await init(await fetch("sudothei_lisp_bg.wasm"));
    repl = Repl.new();
  })();

  const onTerminalSubmit = (input: string) => {
    const output = repl.eval(input);
    console.log(repl);
    setHistory((history) => [...history, output]);
  };

  return (
    <div
      style={{
        margin: "1em",
        border: "3px solid #0f0",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        height: "fit-content",
        width: "fit-content",
        flexFlow: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: 400,
          maxWidth: 600,
          flexDirection: "column",
          justifyContent: "flex-end",
          overflowY: "scroll",
          marginTop: "1em",
        }}
      >
        {history.map((output: string, idx: number) => {
          return <TerminalOutput output={output} key={idx} />;
        })}
      </div>
      <TerminalInput onSubmit={onTerminalSubmit} />
    </div>
  );
};
