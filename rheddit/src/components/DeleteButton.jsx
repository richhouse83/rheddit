import React from "react";
import { useState } from "react";
import * as api from "../utils/api";
import * as utils from "../utils/utils";

export default function DeleteButton({ type, id, votes, removeFunc }) {
  const [errMessage, setErrMessage] = useState("");
  const deleteItem = () => {
    api
      .deleteItem(type, id)
      .then(({ status }) => {
        if (status === 204) {
          removeFunc(id);
          setErrMessage("");
        }
      })
      .catch((err) => setErrMessage("cannot vote, try again"));
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
        {errMessage}
      </p>
    </section>
  );
}
