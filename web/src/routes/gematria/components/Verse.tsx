import * as React from "react";

export const Verse = (props: { heb: string; eng: string; sidra: number }) => {
  return (
    <div
      className="ui-box"
      style={{
        display: "flex",
        width: "66%",
        flexDirection: "column",
        flexFlow: "nowrap",
        padding: ".5em",
        justifyContent: "right",
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
            fontSize: "3em",
            display: "flex",
            direction: "rtl",
            textAlign: "right",
            unicodeBidi: "bidi-override",
          }}
        >
          {props.heb}
        </div>
        <div
          style={{
            fontSize: "1.5em",
            display: "flex",
            alignSelf: "end",
            textAlign: "end",
          }}
        >
          {props.eng}
        </div>
      </div>
      <div style={{ width: "3em", display: "flex", justifyContent: "center" }}>
        {props.sidra}
      </div>
    </div>
  );
};
