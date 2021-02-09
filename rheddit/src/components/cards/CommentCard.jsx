import React, { useState } from "react";
import Votes from "../Votes";
import * as api from "../../utils/api";

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

  const deleteComment = () => {
    api.deleteComment(props.comment_id).then(({ status }) => {
      if (status === 204) {
        console.log("deleted");
        props.removeCommentFromLocal(props.comment_id);
      }
    });
  };

  const isAuthor = props.author === "grumpy19";
  return (
    <li className="comment-card">
      <p className="author" onClick={showComment}>
        {props.author}: {reveal ? props.body : synop}
      </p>
      {isAuthor ? (
        <>
          <p>{props.votes}</p>
          <button onClick={deleteComment}>Delete Comment</button>
        </>
      ) : (
        <Votes id={props.comment_id} votes={props.votes} type="comments" />
      )}
      <p>{date.toLocaleString()}</p>
    </li>
  );
}
