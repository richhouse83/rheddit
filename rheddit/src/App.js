import { useState } from "react";
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
import SignIn from "./components/forms/SignIn";

const theme = {
  color: "snow",
  bgColor: "#FDAC53",
  accent: "#7e3e91",
  buttonHover: "#915ca0",
  //purple #7e3e91  yellow #FDAC53
};

function App() {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <Title handleToggle={toggleNav} />
        <Navbar showNav={showNav} toggleNav={toggleNav} />
        <main>
          <Router>
            <ArticlesList path="/" />
            <ArticlesList path="/articles/topic/:topic" />
            <ArticlesList path="/users/:username/articles" />
            <AddArticle path="/add-article" />
            <ArticlePage path="/articles/:article_id" />
            <TopicsList path="/topics" />
            <SignIn path="/sign-in" />
            <ErrorDisplay default />
          </Router>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
