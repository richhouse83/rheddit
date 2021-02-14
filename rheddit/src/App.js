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
import { theme1, theme2, theme3, theme4 } from "./styles/themes";
import { UserProvider } from "./components/UserContext";

function App() {
  const [showNav, setShowNav] = useState(false);
  const [updateNav, setUpdateNav] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("rhedditTheme") || "theme1"
  );

  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };

  const themeObj = {
    theme1: theme1,
    theme2: theme2,
    theme3: theme3,
    theme4: theme4,
  };

  return (
    <UserProvider>
      <ThemeProvider theme={themeObj[theme]}>
        <GlobalStyle />
        <div className="App">
          <Title handleToggle={toggleNav} />
          <Navbar
            showNav={showNav}
            toggleNav={toggleNav}
            setTheme={setTheme}
            updateNav={updateNav}
          />
          <main>
            <Router>
              <ArticlesList path="/" />
              <ArticlesList path="/articles/topic/:topic" />
              <ArticlesList path="/users/:username/articles" />
              <AddArticle path="/add-article" />
              <ArticlePage path="/articles/:article_id" />
              <TopicsList path="/topics" setUpdateNav={setUpdateNav} />
              <ErrorDisplay default />
            </Router>
          </main>
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
