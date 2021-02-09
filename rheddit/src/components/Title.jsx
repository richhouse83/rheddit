import React from "react";
import { StyledHeader } from "../styles/TitleStyle";

export default function Title({ handleToggle }) {
  return (
    <StyledHeader className="title">
      <h1>RHeddit</h1>
      <i className="fas fa-bars" onClick={handleToggle}></i>
    </StyledHeader>
  );
}
