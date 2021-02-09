import * as styled from "styled-components";

const GlobalStyle = styled.createGlobalStyle`
  .App {
    text-align: center;
    color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.bgColor};
    border: solid 2px red;
    height: 100vh;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    margin: 10px;
  }
  ul {
    padding: 0;
    margin: 10px 5%;
  }
  li {
    margin-bottom: 10px;
  }
  .article-card {
    border: solid 1px pink;
    display: grid;
    grid-template: 1fr 1fr 1fr 1fr / 1fr 2fr 1fr;
    grid-template-areas:
      "topic null author"
      "title title title"
      "synop synop synop"
      "article-votes article-comments date";
  }
  .topic {
    grid-area: topic;
  }
  .author {
    grid-area: author;
  }
  .title {
    grid-area: title;
  }
  .date {
    grid-area: date;
  }
  .article-votes {
    grid-area: article-votes;
  }
  .synop {
    grid-area: synop;
  }
  .article-card-comments {
    grid-area: article-comments;
  }
`;

export default GlobalStyle;
