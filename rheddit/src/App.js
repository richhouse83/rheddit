import Title from "./components/Title";
import Navbar from "./components/Navbar";
import ArticlesList from "./components/ArticlesList";
import ArticlePage from "./components/ArticlePage";
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
          <ArticlePage path="/articles/:article_id" />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
