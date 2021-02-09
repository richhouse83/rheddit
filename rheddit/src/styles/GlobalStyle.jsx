import * as styled from "styled-components";

const GlobalStyle = styled.createGlobalStyle`
  .App {
    text-align: center;
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
    color: ${({ theme }) => theme.color};
  }
  h1 {
    margin: 0;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .add-comment input {
    margin: 10px 0;
    width: 100%;
    height: 2rem;
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
  .article-card {
    padding: 5%;
    border: solid 1px ${({ theme }) => theme.color};
    border-radius: 4px;
    display: grid;
    grid-template: 1fr 1fr 1fr 1fr / 1fr 2fr 1fr;
    grid-template-areas:
      "topic null author"
      "title title title"
      "synop synop synop"
      "votes article-comments date";
    align-items: center;
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
  .topic,
  .author,
  .date,
  .vote-count {
    font-size: 0.8rem;
    text-align: left;
    color: ${({ theme }) => theme.accent};
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
  .votes {
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
  .comment-buttons {
    display: flex;
    justify-content: space-between;
  }
`;

export default GlobalStyle;
