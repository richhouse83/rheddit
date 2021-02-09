import Title from "./components/Title";
import Navbar from "./components/Navbar";
import ArticlesList from "./components/ArticlesList";
import ArticlePage from "./components/ArticlePage";
import ErrorDisplay from "./components/ErrorDisplay";
import TopicsList from "./components/TopicsList";
import AddArticle from "./components/forms/AddArticle";
import { Router } from "@reach/router";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

const theme = {
  color: "black",
  bgColor: "white",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <Title />
        <Navbar />
        <Router>
          <ArticlesList path="/" />
          <ArticlesList path="/articles/topic/:topic" />
          <ArticlesList path="/users/:username/articles" />
          <AddArticle path="/add-article" />
          <ArticlePage path="/articles/:article_id/:loadComments" />
          <TopicsList path="/topics" />
          <ErrorDisplay default />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
