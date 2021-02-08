import React from "react";
import CommentCard from "./cards/CommentCard";

export default function CommentsList({ comments }) {
  return (
    <ul>
      {comments.map((comment) => {
        console.log(comment);
        return <CommentCard key={comment.comment_id} {...comment} />;
      })}
    </ul>
  );
}
