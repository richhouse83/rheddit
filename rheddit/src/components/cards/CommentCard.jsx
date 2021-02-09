import React, { useState } from "react";
import Votes from "../Votes";

export default function CommentCard(props) {
  const [reveal, setReveal] = useState(false);
  const date = new Date(props.created_at);
  let synop = props.body;
  if (synop.length > 50) {
    synop = synop.slice(0, 50);
    synop += "...";
  }
  const showComment = () => {
    setReveal((prev) => !prev);
  };
  return (
    <li className="comment-card">
      <p className="author" onClick={showComment}>
        {props.author}: {reveal ? props.body : synop}
      </p>
      <Votes id={props.comment_id} votes={props.votes} type="comments" />
      <p>{date.toLocaleString()}</p>
    </li>
  );
}
