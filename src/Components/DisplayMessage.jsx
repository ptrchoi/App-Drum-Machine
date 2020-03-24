import React from "react";

function DisplayMessage(props) {
  return (
    <div className="displayWindow">
      <p id="display" className="displayText">
        {props.message}
      </p>
    </div>
  );
}

export default DisplayMessage;
