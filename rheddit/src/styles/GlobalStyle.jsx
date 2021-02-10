import * as styled from "styled-components";
import bgimg from "./images/distressed-yellow-wall-texture-background.jpg";

const GlobalStyle = styled.createGlobalStyle`
  html {
    background-image: url(${bgimg});
    background-repeat: no-repeat;
    background-size: cover;
  }
  .App {
    text-align: center;
    overflow: scroll;
    height: 100vh;
  }
  body,
  input,
  select,
  textarea {
    font-family: "Lato", sans-serif;
    font-weight: 700;
  }
  main {
    position: relative;
    top: 3rem;
    margin: 0 5%;
  }
  body {
    color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.bgColor};
    background-image: url(${bgimg});
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: color;
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: "Montserrat", sans-serif;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.accent};
  }
  a:hover {
    color: ${({ theme }) => theme.buttonHover};
  }
  h1 {
    margin: 0;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input,
  textarea {
    margin: 10px 0;
    width: 100%;
    height: 2rem;
  }
  .add-article-body {
    height: 10rem;
  }
  .add-comment form {
    align-items: flex-end;
  }
  ul {
    padding: 0;
    margin: 10px 0;
  }
  li {
    margin-bottom: 10px;
  }

  button {
    background-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.color};
    border: none;
    padding: 5px;
    margin: 2px;
    min-width: 1.5rem;
    cursor: pointer;
  }
  button:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
  button:focus {
    outline: none;
  }
  button:disabled {
    opacity: 0.5;
  }
  .topic,
  .author,
  .date,
  .vote-count {
    font-size: 0.8rem;
    text-align: left;
    color: ${({ theme }) => theme.accent};
  }
  .comment {
    color: ${({ theme }) => theme.accent};
  }
  .comment:hover {
    color: ${({ theme }) => theme.buttonHover};
  }
  .topic {
    grid-area: topic;
  }
  .author {
    grid-area: author;
  }
  .title {
    grid-area: title;
    font-size: 1.3rem;
  }
  .date {
    grid-area: date;
  }
  .votes,
  .delete-button {
    grid-area: votes;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .vote-buttons {
    margin-right: 10px;
  }
  .synop {
    grid-area: synop;
  }
  .article-card-comments {
    grid-area: article-comments;
  }
  .sort-by {
    display: flex;
    margin-left: 5%;
    font-size: 0.8rem;
    align-items: center;
  }
  select {
    margin: 0 5px;
  }
  .fa-bars {
    font-size: 2rem;
    cursor: pointer;
  }
  .comment-buttons,
  .article-buttons {
    display: flex;
    justify-content: space-between;
  }
`;

export default GlobalStyle;
