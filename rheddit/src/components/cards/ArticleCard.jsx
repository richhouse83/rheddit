import React from "react";
import { Link } from "@reach/router";
import Votes from "../Votes";

export default function ArticleCard(props) {
  const date = new Date(props.created_at);
  let synop = props.body;
  if (synop.length > 50) {
    synop = synop.slice(0, 50);
    synop += "...";
  }

  return (
    <li className="article-card">
      <p className="topic">{props.topic}</p>
      <Link className="title" to={`/articles/${props.article_id}/false`}>
        <h3>{props.title}</h3>
      </Link>
      <p className="date">{date.toLocaleString()}</p>
      <Link className="synop" to={`/articles/${props.article_id}/false`}>
        <p>{synop}</p>
      </Link>
      <p>
        by:
        <Link to={`/users/${props.author}/articles`} className="author">
          {props.author}
        </Link>
      </p>
      <Votes
        className="article-votes"
        id={props.article_id}
        votes={props.votes}
        type="articles"
      />
      <Link
        className="article-card-comments"
        to={`/articles/${props.article_id}/true`}
      >
        {props.comment_count} Comments
      </Link>
    </li>
  );
}
