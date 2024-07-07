import * as React from "react";

export const Modal = ({ ...props }) => {
  return (
    <div>
      {props.modalOpen ? "" : <div className="ui-box">{props.content}</div>}
    </div>
  );
};
