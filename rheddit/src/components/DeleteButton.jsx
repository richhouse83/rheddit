import React from "react";
import * as api from "../utils/api";
import * as utils from "../utils/utils";

export default function DeleteButton({ type, id, votes, removeFunc }) {
  const deleteItem = () => {
    api
      .deleteItem(type, id)
      .then(({ status }) => {
        if (status === 204) {
          console.log("deleted");
          removeFunc(id);
        }
      })
      .catch((err) => console.dir(err));
  };
  return (
    <section className="delete-button">
      <button onClick={deleteItem}>
        Delete {utils.capitaliseString(type.slice(0, -1))}
      </button>
      <p className="vote-count">
        {votes < 0 ? (
          <i className="fas fa-thumbs-down"></i>
        ) : (
          <i className="fas fa-thumbs-up"></i>
        )}{" "}
        {votes}
      </p>
    </section>
  );
}
