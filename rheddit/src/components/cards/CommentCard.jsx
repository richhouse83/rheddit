import React, { useState, useContext } from "react";
import Votes from "../Votes";
import "./CommentCard.css";
import DeleteButton from "../DeleteButton";
import { UserContext } from "../UserContext";

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

  const [user] = useContext(UserContext);

  const isAuthor = props.author === user;
  return (
    <li className="comment-card">
      <p className="comment" onClick={showComment}>
        {props.author}: {reveal ? props.body : synop}
      </p>
      {isAuthor ? (
        <DeleteButton
          id={props.comment_id}
          type="comments"
          votes={props.votes}
          removeFunc={props.removeCommentFromLocal}
        />
      ) : (
        <Votes id={props.comment_id} votes={props.votes} type="comments" />
      )}
      <p className="date">{date.toLocaleString()}</p>
    </li>
  );
}
