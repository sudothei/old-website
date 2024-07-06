import * as React from "react";

export const ActualHome = ({ ...props }) => {
  return (
    <div style={{ display: props.entered ? "unset" : "none" }}>
      <h1>sudothei</h1>
      <p>{props.entered}</p>
    </div>
  );
};
