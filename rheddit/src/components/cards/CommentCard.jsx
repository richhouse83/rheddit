import React, { useState, useContext } from "react";
import Votes from "../Votes";
import "./CommentCard.css";
import DeleteButton from "../DeleteButton";
import { UserContext } from "../UserContext";

export default function CommentCard({
  author,
  body,
  created_at,
  comment_id,
  votes,
  removeCommentFromLocal,
}) {
  const [reveal, setReveal] = useState(false);
  const date = new Date(created_at);
  let synop = body;
  if (synop.length > 50) {
    synop = synop.slice(0, 50);
    synop += "...";
  }
  const showComment = () => {
    setReveal((prev) => !prev);
  };

  const [user] = useContext(UserContext);

  const isAuthor = author === user;
  return (
    <li className="comment-card">
      <p className="comment" onClick={showComment}>
        {author}: {reveal ? body : synop}
      </p>
      {isAuthor ? (
        <DeleteButton
          id={comment_id}
          type="comments"
          votes={votes}
          removeFunc={removeCommentFromLocal}
        />
      ) : (
        <Votes id={comment_id} votes={votes} type="comments" />
      )}
      <p className="date">{date.toLocaleString()}</p>
    </li>
  );
}
