import React from "react";

export default function SortBy({
  handleChange,
  handleOrder,
  order,
  showCommentCount = true,
}) {
  return (
    <label className="sort-by">
      Sort By:
      <select onChange={handleChange} id="sort_by">
        <option value="created_at">Date</option>
        <option value="votes">Votes</option>
        {showCommentCount && <option value="comment_count">Comments</option>}
      </select>
      <button onClick={handleOrder}>
        {order === "desc" ? (
          <i className="fas fa-chevron-down"></i>
        ) : (
          <i className="fas fa-chevron-up"></i>
        )}
      </button>
    </label>
  );
}
