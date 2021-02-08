import React, { Component } from "react";
import ArticleCard from "./cards/ArticleCard";

export default class ArticlesList extends Component {
  render() {
    return (
      <main>
        <h2>Articles Section goes here</h2>
        <ul>
          <ArticleCard />
        </ul>
      </main>
    );
  }
}
