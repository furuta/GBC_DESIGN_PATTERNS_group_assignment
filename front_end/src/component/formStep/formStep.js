import React from "react";
import "./formStep.scss";
function formStep(props) {
  return (
    <div
      className={`step ${props.active && "step-active"}`}
      onClick={() => props.click(props.id)}
    >
      <div className="step_number">{props.id}</div>
      <div className="step_content">{props.content}</div>
    </div>
  );
}

export default formStep;
