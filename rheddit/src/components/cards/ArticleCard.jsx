import React from "react";
import { Link } from "@reach/router";
import Votes from "../Votes";
import { capitaliseString } from "../../utils/utils";
import "./ArticleCard.css";
import DeleteButton from "../DeleteButton";

export default function ArticleCard(props) {
  const date = new Date(props.created_at);
  let synop = props.body;
  if (synop.length > 100) {
    synop = synop.slice(0, 100);
    synop += "...";
  }

  const isAuthor = props.author === "grumpy19";
  return (
    <li className="article-card">
      <Link to={`articles/topic/${props.topic}`} className="topic">
        {capitaliseString(props.topic)}
      </Link>
      <Link className="title" to={`/articles/${props.article_id}/false`}>
        <h3>{props.title}</h3>
      </Link>
      <p className="date">{date.toLocaleString()}</p>
      <Link className="synop" to={`/articles/${props.article_id}/false`}>
        <p>{synop}</p>
      </Link>
      <p className="author">
        by: <Link to={`/users/${props.author}/articles`}>{props.author}</Link>
      </p>
      {isAuthor ? (
        <DeleteButton
          id={props.article_id}
          type="articles"
          votes={props.votes}
          removeFunc={props.removeArticleFromLocal}
        />
      ) : (
        <Votes id={props.article_id} votes={props.votes} type="articles" />
      )}
      <Link
        className="article-card-comments"
        to={`/articles/${props.article_id}/true`}
      >
        {props.comment_count} Comments
      </Link>
    </li>
  );
}
