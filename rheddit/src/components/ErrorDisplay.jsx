import React from "react";

export default function ErrorDisplay(props) {
  return <h2>{props.msg ? props.msg : "No Chance Mate - 404"}</h2>;
}
