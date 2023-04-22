import * as React from "react";

export const Verse = (props: {
  heb: string;
  eng: string;
  smalltext: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexFlow: "column",
        padding: ".5em",
        justifyContent: "right",
        marginBottom: "1.5em",
      }}
    >
      <div
        style={{
          fontSize: "1em",
          display: "flex",
          justifyContent: "right",
        }}
      >
        {props.smalltext}
      </div>
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
  );
};
