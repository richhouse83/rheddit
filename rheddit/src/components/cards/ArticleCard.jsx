import React from "react";
import { Link } from "@reach/router";

export default function ArticleCard(props) {
  const date = new Date(props.created_at);
  let synop = props.body;
  if (synop.length > 50) {
    synop = synop.slice(0, 50);
    synop += "...";
  }
  return (
    <li>
      <p className="topic">{props.topic}</p>
      <h3 className="title">{props.title}</h3>
      <p>{date.toLocaleString()}</p>
      <p className="synop">{synop}</p>
      <p className="author">by: {props.author}</p>
      <button className="vote-button up">^</button>
      <button className="vote-button down">v</button>
      <p classname="votes">{props.votes}</p>
      <Link to={`/${props.article_id}/comments`}>Comments</Link>
    </li>
  );
}
