import * as React from "react";

export const Modal = ({ ...props }) => {
  return (
    <div id="modal">
      <div
        style={{
          width: "100%",
          contain: "content",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ display: "flex" }}>{props.header}</h2>
        <p
          className="ui-box"
          style={{
            margin: 0,
            lineHeight: "1em",
            padding: "1em",
            display: "flex",
            cursor: "pointer",
          }}
          onClick={() => props.closeModal()}
        >
          X
        </p>
      </div>
      {props.content}
    </div>
  );
};
