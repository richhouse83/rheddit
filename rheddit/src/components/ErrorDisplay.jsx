import React from "react";
import { Link } from "@reach/router";

export default function ErrorDisplay({ msg }) {
  return (
    <section className="error-display">
      <h2>{msg ? msg : "No Chance Mate - 404"}</h2>
      <Link to="/">Return to Main Page</Link>
    </section>
  );
}
