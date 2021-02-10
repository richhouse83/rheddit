import React from "react";

export default function ErrorDisplay(props) {
  return (
    <section className="error-display">
      <h2>{props.msg ? props.msg : "No Chance Mate - 404"}</h2>;
    </section>
  );
}
