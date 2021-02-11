import * as styled from "styled-components";
import bgimg from "./images/distressed-yellow-wall-texture-background.jpg";

const GlobalStyle = styled.createGlobalStyle`
  .App {
    text-align: center;
    height: 100%;
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
    background-size: cover;
    background-blend-mode: color;
    padding-bottom: 5%;
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
  .loading,
  .error-display {
    padding: 5%;
    margin: 5% 0;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-items: flex-end;
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
  .add-article {
    margin-top: 10px;
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
  .vote-buttons, .delete-button button {
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
  .signed-in {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }
  .avatar-pic {
     width: 50px;
     height: 50px;
     border-radius: 50px;
     object-fit: contain;
     background-color: snow;
     display: block;
    }
  }
  @media only screen and (min-width: 768px) {
    main {
      grid-area: content;
    }
    .App {
      display: grid;
      grid-template: 3rem 1fr/ 1fr 2fr;
      grid-template-areas:
        "title title"
        "navbar content";
      min-height: 100vh;
    }
    .fa-bars {
      visibility: hidden;
      position: fixed;
    }
    
`;

export default GlobalStyle;
