import React, { useState } from "react";
import ReactDom from "react-dom";

export default function FAQ(props) {
  const [toggle, setToggle] = useState(false);
  const { q, a } = props.faq;
  const { id } = props;
  return (
    <div className="wpfy-faq">
      <div onClick={() => setToggle(!toggle)} className="question-pan">
        <h4>{q}</h4>
        <button onClick={() => setToggle(!toggle)}>{toggle ? "-" : "+"}</button>
      </div>

      <div
        style={
          toggle
            ? { display: "block", animation: "fadeMe 1s" }
            : { display: "none" }
        }
        className="ans-pan"
      >
        <p>{a}</p>
      </div>
    </div>
  );
}
