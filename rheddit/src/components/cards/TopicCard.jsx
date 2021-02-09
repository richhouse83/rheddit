import React from "react";
import { Link } from "@reach/router";
import { capitaliseString } from "../../utils/utils";

export default function TopicCard({ slug, description }) {
  return (
    <li className="topic-card">
      <Link to={`/articles/topic/${slug}`}>
        <h3>{capitaliseString(slug)}</h3>
        <p>{description}</p>
      </Link>
    </li>
  );
}
