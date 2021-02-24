import React, { useContext } from "react";
import { Link } from "@reach/router";
import Votes from "../Votes";
import { capitaliseString } from "../../utils/utils";
import "./ArticleCard.css";
import DeleteButton from "../DeleteButton";
import { UserContext } from "../UserContext";

export default function ArticleCard({
  author,
  created_at,
  topic,
  body,
  comment_count,
  article_id,
  title,
  votes,
  removeArticleFromLocal,
}) {
  const date = new Date(created_at);
  let synop = body;
  if (synop.length > 100) {
    synop = synop.slice(0, 100);
    synop += "...";
  }

  const [user] = useContext(UserContext);

  const isAuthor = author === user;
  return (
    <li className="article-card">
      <Link
        to={`/articles/topic/${topic}`}
        className="topic"
        state={{ loadComments: false }}
      >
        {capitaliseString(topic)}
      </Link>
      <Link
        className="title"
        to={`/articles/${article_id}`}
        state={{ loadComments: false }}
      >
        <h3>{title}</h3>
      </Link>
      <p className="date">{date.toLocaleString()}</p>
      <Link
        className="synop"
        to={`/articles/${article_id}`}
        state={{ loadComments: false }}
      >
        <p>{synop}</p>
      </Link>
      <p className="author">
        by: <Link to={`/users/${author}/articles`}>{author}</Link>
      </p>
      {isAuthor ? (
        <DeleteButton
          id={article_id}
          type="articles"
          votes={votes}
          removeFunc={removeArticleFromLocal}
        />
      ) : (
        <Votes id={article_id} votes={votes} type="articles" />
      )}
      <Link
        className="article-card-comments"
        to={`/articles/${article_id}`}
        state={{ loadComments: true }}
      >
        {comment_count} Comments
      </Link>
    </li>
  );
}
