import React from "react";

export default function CommentCard(props) {
  const date = new Date(props.created_at);
  let synop = props.body;
  if (synop.length > 50) {
    synop = synop.slice(0, 50);
    synop += "...";
  }
  return (
    <li>
      <p className="author">
        {props.author}: {synop}
      </p>
      <button className="vote-button up">^</button>
      <button className="vote-button down">v</button>
      <p className="votes">{props.votes}</p>
      <p>{date.toLocaleString()}</p>
    </li>
  );
}
