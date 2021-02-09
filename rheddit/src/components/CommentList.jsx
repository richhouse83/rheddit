import React from "react";
import CommentCard from "./cards/CommentCard";
import AddComment from "./forms/AddComment";

export default function CommentsList({
  comments,
  article_id,
  addCommentToLocal,
}) {
  return (
    <section className="comments-box">
      <AddComment
        article_id={article_id}
        addCommentToLocal={addCommentToLocal}
      />
      <ul className="comments-list">
        {comments.map((comment) => {
          console.log(comment);
          return <CommentCard key={comment.comment_id} {...comment} />;
        })}
      </ul>
    </section>
  );
}
